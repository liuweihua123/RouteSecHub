export interface ScriptConfig {
  eventName?: string;
  startTimeUtc: string;
  endTimeUtc: string;
  includeBeforeHours: number;
  includeAfterHours: number;
  dataSource: 'routeviews' | 'riperis' | 'both';
  collectors: string[];
  dataType: 'updates' | 'ribs';
  outputMethod: 'pybgpstream' | 'bgpkit' | 'wget';
}

export interface GeneratedScript {
  title: string;
  code: string;
  description: string;
  analysisSteps: string[];
  timeWindowNote: string;
}

export const ROUTEVIEWS_COLLECTORS = [
  'route-views2', 'route-views3', 'route-views4', 'route-views5',
  'route-views6', 'route-views.eqix', 'route-views.isc', 'route-views.kixp',
  'route-views.linx', 'route-views.wide', 'route-views.saopaulo',
  'route-views.sg', 'route-views.sydney', 'route-views.chicago',
];

export const RIPE_RIS_COLLECTORS = [
  'rrc00', 'rrc01', 'rrc03', 'rrc04', 'rrc05', 'rrc06',
  'rrc07', 'rrc10', 'rrc11', 'rrc12', 'rrc13', 'rrc14',
  'rrc15', 'rrc16', 'rrc18', 'rrc19', 'rrc20', 'rrc21', 'rrc22', 'rrc23', 'rrc24', 'rrc25',
];

function adjustTime(time: string, hoursOffset: number): string {
  const date = new Date(time.replace(' ', 'T') + 'Z');
  date.setUTCHours(date.getUTCHours() + hoursOffset);
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function generateScript(config: ScriptConfig): GeneratedScript {
  const fromTime = adjustTime(config.startTimeUtc, -config.includeBeforeHours);
  const untilTime = adjustTime(config.endTimeUtc, config.includeAfterHours);

  const collectors = config.collectors.length > 0 ? config.collectors : ['route-views2', 'rrc00'];

  if (config.outputMethod === 'pybgpstream') {
    const collectorsStr = collectors.map(c => `"${c}"`).join(', ');
    const code = `from _pybgpstream import BGPStream

# Event: ${config.eventName || 'BGP Event Analysis'}
# Time window: ${fromTime} to ${untilTime} UTC
# Data type: ${config.dataType}

stream = BGPStream(
    from_time="${fromTime}",
    until_time="${untilTime}",
    collectors=[${collectorsStr}],
    record_type="${config.dataType}"
)

for elem in stream:
    # Filter for specific fields as needed
    print(f"{elem.record_project} | {elem.record_collector} | "
          f"{elem.type} | {elem.fields['prefix']} | "
          f"{elem.fields['as-path']} | {elem.fields['next-hop']}")
`;

    return {
      title: 'PyBGPStream Script',
      code,
      description: 'Python script using PyBGPStream to fetch and analyze BGP data from RouteViews and RIPE RIS.',
      analysisSteps: [
        'Install PyBGPStream: pip install pybgpstream',
        'Run the script to fetch BGP data for the event window',
        'Filter output for specific prefixes or ASNs of interest',
        'Analyze AS path changes to detect routing anomalies',
        'Use additional tools (e.g., matplotlib) for visualization',
      ],
      timeWindowNote: `Time window adjusted: ${config.includeBeforeHours}h before event start, ${config.includeAfterHours}h after event end. Original event: ${config.startTimeUtc} to ${config.endTimeUtc} UTC.`,
    };
  }

  if (config.outputMethod === 'bgpkit') {
    const collectorsStr = collectors.map(c => `"${c}"`).join(', ');
    const code = `# Using BGPKIT Broker and Parser
# Event: ${config.eventName || 'BGP Event Analysis'}

import bgpkit_broker

# Step 1: Find MRT files for the time window
broker = bgpkit_broker.Broker()
files = broker.query(
    start_time="${fromTime}",
    end_time="${untilTime}",
    collector_ids=[${collectorsStr}],
    data_type="${config.dataType}"
)

for f in files:
    print(f.url)

# Step 2: Parse MRT files using bgpkit_parser
import bgpkit_parser

for mrt_url in [f.url for f in files]:
    print(f"\\nParsing: {mrt_url}")
    parser = bgpkit_parser.Parser(mrt_url)
    for elem in parser:
        print(elem)
`;

    return {
      title: 'BGPKIT Broker & Parser Script',
      code,
      description: 'Python script using BGPKIT Broker to discover MRT files and BGPKIT Parser to process them.',
      analysisSteps: [
        'Install BGPKIT packages: pip install bgpkit-broker bgpkit-parser',
        'Run the script to discover and download MRT files',
        'Parse the MRT data and filter for events of interest',
        'Analyze routing changes across the time window',
        'Cross-reference with AS relationship data for context',
      ],
      timeWindowNote: `Time window adjusted: ${config.includeBeforeHours}h before event start, ${config.includeAfterHours}h after event end.`,
    };
  }

  // wget method
  const year = config.startTimeUtc.substring(0, 4);
  const month = config.startTimeUtc.substring(5, 7);
  const date = config.startTimeUtc.substring(8, 10);

  const rvCollectors = collectors.filter(c => c.startsWith('route-views'));
  const risCollectors = collectors.filter(c => c.startsWith('rrc'));

  let code = `#!/bin/bash
# Event: ${config.eventName || 'BGP Event Analysis'}
# Download MRT files from RouteViews and RIPE RIS archives
# Time window: ${fromTime} to ${untilTime} UTC
`;

  if (rvCollectors.length > 0 || config.dataSource !== 'riperis') {
    code += `
# RouteViews MRT files
mkdir -p routeviews_data
cd routeviews_data
`;
    for (const collector of (rvCollectors.length > 0 ? rvCollectors : ['route-views2'])) {
      code += `# ${collector}
wget "https://archive.routeviews.org/${collector}/bgpdata/${year}.${month}/UPDATES/updates.${year}${month}${date}.*.gz" -P ${collector}/
`;
    }
  }

  if (risCollectors.length > 0 || config.dataSource !== 'routeviews') {
    code += `
# RIPE RIS MRT files
mkdir -p ris_data
cd ris_data
`;
    for (const collector of (risCollectors.length > 0 ? risCollectors : ['rrc00'])) {
      code += `# ${collector}
wget "https://data.ris.ripe.net/${collector}/${year}.${month}/updates.${year}${month}${date}.*.gz" -P ${collector}/
`;
    }
  }

  return {
    title: 'Wget MRT Download Script',
    code,
    description: 'Shell script to download MRT dump files directly from RouteViews and RIPE RIS archives.',
    analysisSteps: [
      'Run the download script to fetch MRT files',
      'Decompress the downloaded .gz files',
      'Use BGPKIT Parser or PyBGPStream to parse the MRT files',
      'Filter for specific prefixes, ASNs, or event patterns',
      'Analyze the data for routing anomalies',
    ],
    timeWindowNote: `Downloading RIB/data for the event date. Time window adjusted: ${config.includeBeforeHours}h before, ${config.includeAfterHours}h after.`,
  };
}
