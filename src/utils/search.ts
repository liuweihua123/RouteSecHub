import { resources } from "../data/resources";
import { tools } from "../data/tools";
import { datasets } from "../data/datasets";
import { incidents } from "../data/incidents";
import { papers } from "../data/papers";
import { standards } from "../data/standards";
import { researchers } from "../data/researchers";

export interface SearchResult {
  type: "resource" | "tool" | "dataset" | "incident" | "paper" | "standard" | "researcher";
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
}

export function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const r of resources) {
    if (matchItem(r, q)) {
      results.push({
        type: "resource", id: r.id, name: r.name, description: r.description,
        category: r.category, tags: r.tags, link: "/datasets",
      });
    }
  }

  for (const t of tools) {
    if (matchItem(t, q)) {
      results.push({
        type: "tool", id: t.id, name: t.name, description: t.description,
        category: t.category, tags: t.tags, link: "/tools",
      });
    }
  }

  for (const d of datasets) {
    if (matchItem(d, q)) {
      results.push({
        type: "dataset", id: d.id, name: d.name, description: d.description,
        category: d.category, tags: d.tags, link: "/datasets",
      });
    }
  }

  for (const i of incidents) {
    if (
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.type.toLowerCase().includes(q) ||
      i.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: "incident", id: i.id, name: i.name, description: i.description,
        category: i.type, tags: i.tags, link: `/incidents/${i.id}`,
      });
    }
  }

  for (const p of papers) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.direction.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: "paper", id: p.id, name: p.title, description: p.summary,
        category: p.direction, tags: p.tags, link: "/papers",
      });
    }
  }

  for (const s of standards) {
    if (
      s.name.toLowerCase().includes(q) ||
      s.rfcNumber.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: "standard", id: s.id, name: `${s.rfcNumber} — ${s.name}`, description: s.summary,
        category: s.category, tags: s.tags, link: "/standards",
      });
    }
  }

  for (const r of researchers) {
    if (
      r.name.toLowerCase().includes(q) ||
      r.affiliation.toLowerCase().includes(q) ||
      r.bio.toLowerCase().includes(q) ||
      r.focus.some((f) => f.toLowerCase().includes(q)) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        type: "researcher", id: r.id, name: r.name, description: r.bio,
        category: r.affiliation, tags: r.tags, link: "/researchers",
      });
    }
  }

  return results.slice(0, 30);
}

function matchItem(item: { name: string; description: string; tags: string[]; category: string }, q: string): boolean {
  return (
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
