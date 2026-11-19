export interface ParityMetrics {
  stateParityPct: number;
  mathematicalDrift: number;
  legacyExecutionTimeMs: number;
  modernExecutionTimeMs: number;
  speedupRatio: number;
  anomalyDetected: boolean;
  activeDriftField?: string;
  divergenceLog?: string[];
}

export type PresetId = 'vb6-finance' | 'flash-orbit' | 'pascal-logistics';

export interface LegacyAppPreset {
  id: PresetId;
  name: string;
  era: string;
  year: number;
  originalPlatform: string;
  originalStack: string;
  modernTargetStack: string;
  tagline: string;
  description: string;
  legacyCodeSnippet: string;
  modernCodeSnippet: string;
  specsSummary: {
    inputs: string[];
    formulas: string[];
    edgeCases: string[];
  };
}

export interface FinanceState {
  principal: number;
  interestRate: number;
  years: number;
  volatility: number;
  compoundingPeriods: number;
}

export interface OrbitState {
  starMass: number;
  orbitalRadius: number;
  initialVelocity: number;
  gravitationalConstant: number;
  isPlaying: boolean;
}

export interface LogisticsState {
  dailyDemand: number;
  leadTimeDays: number;
  orderCost: number;
  holdingCostPerUnit: number;
  safetyStockFactor: number;
}
