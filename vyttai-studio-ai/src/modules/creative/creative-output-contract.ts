export type CarouselSlideIntent = "hook" | "context" | "explanation" | "proof" | "cta";

export type LayoutSystem = "grid" | "centered" | "bold" | "cinematic" | "comparison" | "catalog";

export type CreativeStrategyContract = {
  objective: string;
  audience: string;
  promise: string;
  angle: string;
  emotion: string;
  insight: string;
  objections: string[];
};

export type CreativeSlideContract = {
  number: number;
  intent: CarouselSlideIntent;
  role: string;
  headline: string;
  body: string;
  visualDirection: string;
  imagePrompt: string;
  layoutHint: string;
};

export type CreativeDesignContract = {
  palette: string[];
  style: string;
  typographyMood: string;
  symbols: string[];
  layoutSystem: LayoutSystem;
};

export type CreativeComplianceContract = {
  warnings: string[];
  requiredDisclaimers: string[];
};

export type CarouselCreativeOutputContract = {
  schemaVersion: "creative-output.v1.1";
  type: "carousel";
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  campaign: {
    id: string;
    name: string;
    objective: string;
    theme: string;
    mode: string;
  };
  strategy: CreativeStrategyContract;
  creative: {
    title: string;
    slides: CreativeSlideContract[];
    caption: string;
    hashtags: string[];
    cta: string;
  };
  design: CreativeDesignContract;
  compliance: CreativeComplianceContract;
  metadata: {
    orchestratorVersion: "campaign-orchestrator.v1.1";
    generatedAt: string;
    agentTrace: string[];
    renderReady: boolean;
  };
};
