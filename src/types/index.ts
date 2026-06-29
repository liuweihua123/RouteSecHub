export type ResourceType = "Dataset" | "API" | "Tool" | "Visualization" | "Monitor";

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  type: ResourceType;
  website?: string;
  github?: string;
  hasApi: boolean;
  supportsHistoricalData: boolean;
  supportsRealtimeData: boolean;
  recommendedFor: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  useCase: string;
  installation?: string;
  website?: string;
  github?: string;
  tags: string[];
  rating: number;
  audience: string[];
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  type: ResourceType;
  hasApi: boolean;
  supportsHistoricalData: boolean;
  supportsRealtimeData: boolean;
  useCases: string[];
  website?: string;
  github?: string;
  tags: string[];
}

export type IncidentType =
  | "Route Hijack"
  | "Route Leak"
  | "RPKI Invalid"
  | "Misconfiguration"
  | "Outage"
  | "Prefix Leak"
  | "AS Path Manipulation";

export interface TimelineEvent {
  time: string;
  event: string;
}

export interface Incident {
  id: string;
  name: string;
  type: IncidentType;
  startTimeUtc: string;
  endTimeUtc?: string;
  description: string;
  involvedASNs: string[];
  affectedPrefixes: string[];
  recommendedDataSources: string[];
  recommendedWindow: string;
  researchUseCases: string[];
  links: string[];
  tags: string[];
  timeline?: TimelineEvent[];
  analysisSteps?: string[];
  relatedPapers?: string[];
}

export interface Paper {
  id: string;
  title: string;
  year: number;
  authors: string;
  direction: string;
  summary: string;
  dataSources: string[];
  hasCode: boolean;
  hasPublicData: boolean;
  reproducibility: "Low" | "Medium" | "High";
  link?: string;
  tags: string[];
}

export interface Standard {
  id: string;
  name: string;
  rfcNumber: string;
  category: string;
  summary: string;
  solvesProblem: string;
  audience: string;
  relatedTools: string[];
  link: string;
  tags: string[];
}

export interface LearningLevel {
  level: number;
  title: string;
  description: string;
  objectives: string[];
  resources: { name: string; link: string }[];
  experiment: string;
  paperDirections: string[];
}

export interface ResearchTask {
  id: string;
  name: string;
  description: string;
  dataSources: string[];
  tools: string[];
  paperDirections: string[];
  icon: string;
}

export interface Validator {
  id: string;
  name: string;
  language: string;
  maintainer: string;
  isActive: boolean;
  productionReady: boolean;
  researchFriendly: boolean;
  supportsRTR: boolean;
  features: string;
  recommendedFor: string;
  link: string;
  isLegacy?: boolean;
}
