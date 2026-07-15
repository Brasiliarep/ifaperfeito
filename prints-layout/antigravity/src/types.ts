export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface Odu {
  name: string;
  description: string;
}

export interface DivinationResult {
  success: boolean;
  odu: Odu;
  resultDetails: {
    name: string;
    left?: number[];
    right?: number[];
    shells?: number[];
    openCount?: number;
    palmNuts?: number;
    remaining?: number;
  };
  interpretation: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  status: "Realizada" | "Confirmado" | "Em preparação" | "Agendado" | "Pendente";
  statusColor: string;
}

export interface ToolItem {
  name: string;
  description: string;
  path?: string;
  badge?: string;
}
