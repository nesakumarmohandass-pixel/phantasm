export interface RiskProjection {
  compoundedTotal: number;
  grossYield: number;
  valueAtRisk95: number;
  riskAdjustedSurplus: number;
  annualSchedule: Array<{ year: number; balance: number; varReserve: number }>;
}

export function calculateRiskSurplus(
  principal: number,
  annualRatePct: number,
  years: number,
  volatilityPct: number
): RiskProjection {
  const r = annualRatePct / 100;
  const n = 4; // Quarterly compounding
  const sigma = volatilityPct / 100;
  
  const compoundedTotal = principal * Math.pow(1 + r / n, n * years);
  const grossYield = compoundedTotal - principal;
  const valueAtRisk95 = principal * 1.645 * sigma * Math.sqrt(years);
  const riskAdjustedSurplus = grossYield - valueAtRisk95;

  const annualSchedule = Array.from({ length: years + 1 }, (_, y) => ({
    year: y,
    balance: Math.round(principal * Math.pow(1 + r / n, n * y)),
    varReserve: Math.round(principal * 1.645 * sigma * Math.sqrt(Math.max(1, y)))
  }));

  return {
    compoundedTotal,
    grossYield,
    valueAtRisk95,
    riskAdjustedSurplus,
    annualSchedule
  };
}
