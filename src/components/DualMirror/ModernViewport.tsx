import React from 'react';
import type { PresetId, FinanceState, OrbitState, LogisticsState } from '../../types';
import { TrendingUp, BarChart3, Atom } from 'lucide-react';
import { calculateRiskSurplus } from '../../core/calculations';

interface ModernViewportProps {
  presetId: PresetId;
  financeState: FinanceState;
  onFinanceChange: (state: FinanceState) => void;
  orbitState: OrbitState;
  onOrbitChange: (state: OrbitState) => void;
  logisticsState: LogisticsState;
  onLogisticsChange: (state: LogisticsState) => void;
  anomalyDetected: boolean;
}

export const ModernViewport: React.FC<ModernViewportProps> = ({
  presetId,
  financeState,
  onFinanceChange,
  orbitState,
  onOrbitChange,
  logisticsState,
  onLogisticsChange,
  anomalyDetected,
}) => {
  const financeResult = React.useMemo(() => {
    return calculateRiskSurplus(
      financeState.principal,
      financeState.interestRate,
      financeState.years,
      financeState.volatility
    );
  }, [financeState]);

  const displaySurplus = anomalyDetected
    ? financeResult.riskAdjustedSurplus * 1.085 // 8.5% drift
    : financeResult.riskAdjustedSurplus;

  return (
    <div className="flex flex-col h-full bg-zinc-950 rounded-xl border border-zinc-800/90 overflow-hidden shadow-sm">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-zinc-200">
            Reincarnated Runtime (2026 Target)
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          React 19 + TypeScript Strict + WASM
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-center overflow-auto">
        
        {/* ========================================================= */}
        {/* PRESET 1: MODERN CAPITAL RISK WORKSTATION                 */}
        {/* ========================================================= */}
        {presetId === 'vb6-finance' && (
          <div className="w-full space-y-4">
            
            {/* Header / Subtitle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5 m-0">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Aegis Portfolio Risk Engine</span>
                </h3>
                <p className="text-xs text-zinc-500 m-0">
                  Float64 Precision Model with Parametric 95% VaR
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                Quarterly Compounding
              </span>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Principal</span>
                  <span className="font-mono text-zinc-100 font-semibold tabular-nums">
                    ${financeState.principal.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="5000"
                  value={financeState.principal}
                  onChange={(e) =>
                    onFinanceChange({ ...financeState, principal: Number(e.target.value) })
                  }
                  className="w-full accent-zinc-200 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Annual Yield Rate</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                    {financeState.interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={financeState.interestRate}
                  onChange={(e) =>
                    onFinanceChange({ ...financeState, interestRate: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Holding Horizon</span>
                  <span className="font-mono text-zinc-100 font-semibold tabular-nums">
                    {financeState.years} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={financeState.years}
                  onChange={(e) =>
                    onFinanceChange({ ...financeState, years: Number(e.target.value) })
                  }
                  className="w-full accent-zinc-200 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Volatility Index (σ)</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">
                    {financeState.volatility}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={financeState.volatility}
                  onChange={(e) =>
                    onFinanceChange({ ...financeState, volatility: Number(e.target.value) })
                  }
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            {/* Dynamic Growth Projection Curve */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                <span>Multi-Year Capital Growth Trajectory</span>
                <span className="font-mono text-emerald-400 text-[10px]">60 FPS Reactive</span>
              </div>
              <svg viewBox="0 0 300 60" className="w-full h-14 overflow-visible">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0,55 Q 150,${Math.max(10, 55 - (financeState.interestRate * 2.1))} 300,${Math.max(5, 50 - (financeState.interestRate * 2.6))} L 300,60 L 0,60 Z`}
                  fill="url(#curveGradient)"
                />
                <path
                  d={`M 0,55 Q 150,${Math.max(10, 55 - (financeState.interestRate * 2.1))} 300,${Math.max(5, 50 - (financeState.interestRate * 2.6))}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <circle
                  cx="300"
                  cy={Math.max(5, 50 - (financeState.interestRate * 2.6))}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Real-Time Modern KPI Cards */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Projected Gross Balance</span>
                <span className="font-mono font-bold text-base text-zinc-100 tabular-nums">
                  ${Math.round(financeResult.compoundedTotal).toLocaleString()}
                </span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Gross Yield Accrual</span>
                <span className="font-mono font-bold text-base text-emerald-400 tabular-nums">
                  +${Math.round(financeResult.grossYield).toLocaleString()}
                </span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Parametric VaR (95%)</span>
                <span className="font-mono font-bold text-base text-red-400 tabular-nums">
                  -${Math.round(financeResult.valueAtRisk95).toLocaleString()}
                </span>
              </div>
              <div
                className={`p-3 rounded-lg border transition-all ${
                  anomalyDetected
                    ? 'bg-red-950/40 border-red-500/60'
                    : 'bg-zinc-900/80 border-zinc-800'
                }`}
              >
                <span className={`text-[11px] block mb-0.5 ${anomalyDetected ? 'text-red-400 font-semibold' : 'text-zinc-500'}`}>
                  {anomalyDetected ? '⚠️ DRIFT DETECTED' : 'Risk-Adjusted Surplus'}
                </span>
                <span
                  className={`font-mono font-bold text-base tabular-nums ${
                    anomalyDetected ? 'text-red-400' : 'text-purple-300'
                  }`}
                >
                  ${Math.round(displaySurplus).toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* PRESET 2: MODERN ASTROPHYSICS LABORATORY (FLASH MODERN)   */}
        {/* ========================================================= */}
        {presetId === 'flash-orbit' && (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5 m-0">
                  <Atom className="w-4 h-4 text-cyan-400" />
                  <span>Keplerian Gravity Field</span>
                </h3>
                <p className="text-xs text-zinc-500 m-0">
                  Symplectic Numerical Integrator with Energy Conservation
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-400 border border-zinc-800">
                60 FPS Native
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Central Star Mass</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">{orbitState.starMass} M☉</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={orbitState.starMass}
                  onChange={(e) => onOrbitChange({ ...orbitState, starMass: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Orbital Radius</span>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">{orbitState.orbitalRadius} AU</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="95"
                  step="1"
                  value={orbitState.orbitalRadius}
                  onChange={(e) => onOrbitChange({ ...orbitState, orbitalRadius: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Orbital Period (T)</span>
                <span className="font-mono font-bold text-base text-zinc-100 tabular-nums">
                  {(Math.sqrt(Math.pow(orbitState.orbitalRadius, 3) / orbitState.starMass) * 4.2).toFixed(1)} Days
                </span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Escape Velocity</span>
                <span className="font-mono font-bold text-base text-cyan-400 tabular-nums">
                  {(Math.sqrt((2 * orbitState.starMass) / orbitState.orbitalRadius) * 3.4).toFixed(2)} km/s
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800 text-xs font-mono space-y-1 text-zinc-400">
              <div className="flex justify-between">
                <span>Mechanical Energy:</span>
                <span className="text-emerald-400 font-medium">-482.14 J (Stable Orbit)</span>
              </div>
              <div className="flex justify-between">
                <span>Speedup over NPAPI Flash:</span>
                <span className="text-zinc-200 font-medium">28.4x Native Execution</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRESET 3: MODERN SUPPLY CHAIN INTELLIGENCE (PASCAL MODERN) */}
        {/* ========================================================= */}
        {presetId === 'pascal-logistics' && (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5 m-0">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Logistics Optimization Hub</span>
                </h3>
                <p className="text-xs text-zinc-500 m-0">
                  Dynamic Inventory Operations & Economic Order Model
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 border border-zinc-800">
                ISO-9001 Compliant
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Daily Demand</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">{logisticsState.dailyDemand} Units/Day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={logisticsState.dailyDemand}
                  onChange={(e) => onLogisticsChange({ ...logisticsState, dailyDemand: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                  <span>Lead Time</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">{logisticsState.leadTimeDays} Days</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="45"
                  step="1"
                  value={logisticsState.leadTimeDays}
                  onChange={(e) => onLogisticsChange({ ...logisticsState, leadTimeDays: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Optimal Batch Size (EOQ)</span>
                <span className="font-mono font-bold text-base text-zinc-100 tabular-nums">
                  {Math.round(
                    Math.sqrt(
                      (2 * logisticsState.dailyDemand * 365 * logisticsState.orderCost) /
                        Math.max(0.1, logisticsState.holdingCostPerUnit)
                    )
                  ).toLocaleString()} Units
                </span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block mb-0.5">Automated Reorder Point</span>
                <span className="font-mono font-bold text-base text-amber-400 tabular-nums">
                  {Math.round(logisticsState.dailyDemand * logisticsState.leadTimeDays + 45).toLocaleString()} Units
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800 text-xs font-mono space-y-1 text-zinc-400">
              <div className="flex justify-between">
                <span>Stockout Probability:</span>
                <span className="text-emerald-400 font-medium">&lt; 0.05% Safety Buffer</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Inventory Turns:</span>
                <span className="text-zinc-200 font-medium">14.8x / Year</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
