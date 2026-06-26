export type BrandBrainSnapshot = {
  identity: Record<string, unknown>;
  voice: Record<string, unknown>;
  visual: Record<string, unknown>;
  rules: Record<string, unknown>;
  knowledge: Record<string, unknown>;
};

export type CampaignAgentContext = {
  brand: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
  campaign: {
    id: string;
    name: string;
    objective: string;
    theme: string;
    mode: string;
  };
  brandBrain: BrandBrainSnapshot | null;
  products: Array<{
    id: string;
    name: string;
    description: string | null;
    audience: string | null;
  }>;
};

export function getBrainString(
  brain: BrandBrainSnapshot | null,
  section: keyof BrandBrainSnapshot,
  key: string,
  fallback: string,
) {
  const value = brain?.[section]?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export function getBrainList(
  brain: BrandBrainSnapshot | null,
  section: keyof BrandBrainSnapshot,
  key: string,
) {
  const value = brain?.[section]?.[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function getBrainRecord(
  brain: BrandBrainSnapshot | null,
  section: keyof BrandBrainSnapshot,
  key: string,
) {
  const value = brain?.[section]?.[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}
