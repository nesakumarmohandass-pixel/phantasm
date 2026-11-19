import React from 'react';
import type { PresetId, FinanceState, OrbitState, LogisticsState } from '../../types';
import { TrendingUp, Zap, BarChart3, Atom } from 'lucide-react';
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
  // Modern calculations
  const financeResult = React.useMemo(() => {
    return calculateRiskSurplus(
      financeState.principal,
      financeState.interestRate,
      financeState.years,
      financeState.volatility
    );
  }, [financeState]);

  // If anomaly is induced, perturb the calculation slightly to show drift detection
  const displaySurplus = anomalyDetected
    ? financeResult.riskAdjustedSurplus * 1.085 // 8.5% drift
    : financeResult.riskAdjustedSurplus;

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-purple-900/50 overflow-hidden shadow-xl shadow-purple-950/20">
      
      {/* Top Era Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-purple-900/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Future (Reincarnated 2026 Engine)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>React 19 + TypeScript + WASM</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-center items-center overflow-auto">
        
        {/* ========================================================= */}
        {/* PRESET 1: MODERN 2026 CAPITAL RISK WORKSTATION            */}
        {/* ========================================================= */}
        {presetId === 'vb6-finance' && (
          <div className="w-full max-w-lg glass-panel-glow rounded-2xl p-5 border border-purple-500/30 text-white space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 m-0">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Aegis Wealth & Parametric VaR</span>
                </h3>
                <p className="text-[11px] text-slate-400 m-0">
                  Float64 Precision Engine | Real-Time Horizon Curve
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                1:1 Parity Verified
              </span>
            </div>

            {/* Interactive Sliders (Bidirectional bridge) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Principal</span>
                  <span className="font-mono text-purple-300 font-bold">
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
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Annual Yield Rate</span>
                  <span className="font-mono text-emerald-400 font-bold">
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
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Horizon</span>
                  <span className="font-mono text-sky-400 font-bold">
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
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Volatility Index (σ)</span>
                  <span className="font-mono text-amber-400 font-bold">
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
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Dynamic SVG Growth Projection Curve */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span>Multi-Year Capital Trajectory</span>
                <span className="font-mono text-emerald-400">Quarterly Accrual</span>
              </div>
              <svg viewBox="0 0 300 70" className="w-full h-16 overflow-visible">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0,60 Q 150,${Math.max(10, 60 - (financeState.interestRate * 2.2))} 300,${Math.max(5, 55 - (financeState.interestRate * 2.8))}`}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                />
                <circle
                  cx="300"
                  cy={Math.max(5, 55 - (financeState.interestRate * 2.8))}
                  r="4"
                  fill="#38bdf8"
                />
              </svg>
            </div>

            {/* Real-Time Modern KPI Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Projected Total Balance:</span>
                <span className="font-mono font-bold text-base text-white">
                  ${Math.round(financeResult.compoundedTotal).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Gross Yield (G):</span>
                <span className="font-mono font-bold text-base text-emerald-400">
                  +${Math.round(financeResult.grossYield).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Parametric VaR 95%:</span>
                <span className="font-mono font-bold text-base text-red-400">
                  -${Math.round(financeResult.valueAtRisk95).toLocaleString()}
                </span>
              </div>
              <div
                className={`p-2.5 rounded-xl border transition-colors ${
                  anomalyDetected
                    ? 'bg-red-950/50 border-red-500/80 animate-pulse'
                    : 'bg-purple-950/40 border-purple-700/50'
                }`}
              >
                <span className="text-[10px] text-slate-300 block">
                  {anomalyDetected ? '⚠️ DRIFT DETECTED:' : 'Risk-Adjusted Surplus:'}
                </span>
                <span
                  className={`font-mono font-bold text-base ${
                    anomalyDetected ? 'text-red-300' : 'text-purple-300'
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
          <div className="w-full max-w-lg glass-panel-glow rounded-2xl p-5 border border-purple-500/30 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 m-0">
                  <Atom className="w-4 h-4 text-cyan-400" />
                  <span>Graviton Keplerian Quantum Field</span>
                </h3>
                <p className="text-[11px] text-slate-400 m-0">
                  Symplectic Numerical Integrator | Conservation of Energy
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                WebGL 2.0 / 60 FPS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Central Star Mass (M☉):</span>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={orbitState.starMass}
                  onChange={(e) => onOrbitChange({ ...orbitState, starMass: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-amber-400 mt-1 block">
                  {orbitState.starMass} M☉
                </span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Orbital Radius (AU):</span>
                <input
                  type="range"
                  min="30"
                  max="95"
                  step="1"
                  value={orbitState.orbitalRadius}
                  onChange={(e) => onOrbitChange({ ...orbitState, orbitalRadius: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-cyan-400 mt-1 block">
                  {orbitState.orbitalRadius} AU
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Orbital Period (T):</span>
                <span className="font-mono font-bold text-lg text-amber-400">
                  {(Math.sqrt(Math.pow(orbitState.orbitalRadius, 3) / orbitState.starMass) * 4.2).toFixed(1)} Days
                </span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Escape Velocity:</span>
                <span className="font-mono font-bold text-lg text-cyan-400">
                  {(Math.sqrt((2 * orbitState.starMass) / orbitState.orbitalRadius) * 3.4).toFixed(2)} km/s
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Total Mechanical Energy:</span>
                <span className="text-emerald-400 font-bold">-482.14 J (Bound Stable)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Computational Speedup:</span>
                <span className="text-purple-400 font-bold">28.4x over NPAPI</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRESET 3: MODERN SUPPLY CHAIN INTELLIGENCE (PASCAL MODERN) */}
        {/* ========================================================= */}
        {presetId === 'pascal-logistics' && (
          <div className="w-full max-w-lg glass-panel-glow rounded-2xl p-5 border border-purple-500/30 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 m-0">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Logix Enterprise Logistics Hub</span>
                </h3>
                <p className="text-[11px] text-slate-400 m-0">
                  Dynamic Inventory Optimization & Stockout Risk Analysis
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Autonomous ROP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Daily Demand:</span>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={logisticsState.dailyDemand}
                  onChange={(e) => onLogisticsChange({ ...logisticsState, dailyDemand: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-emerald-400 mt-1 block">
                  {logisticsState.dailyDemand} Units / Day
                </span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Lead Time:</span>
                <input
                  type="range"
                  min="2"
                  max="45"
                  step="1"
                  value={logisticsState.leadTimeDays}
                  onChange={(e) => onLogisticsChange({ ...logisticsState, leadTimeDays: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-amber-400 mt-1 block">
                  {logisticsState.leadTimeDays} Days
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Optimal Batch Size (EOQ):</span>
                <span className="font-mono font-bold text-xl text-emerald-400">
                  {Math.round(
                    Math.sqrt(
                      (2 * logisticsState.dailyDemand * 365 * logisticsState.orderCost) /
                        Math.max(0.1, logisticsState.holdingCostPerUnit)
                    )
                  ).toLocaleString()}{' '}
                  Units
                </span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Automated Reorder Point:</span>
                <span className="font-mono font-bold text-xl text-amber-400">
                  {Math.round(logisticsState.dailyDemand * logisticsState.leadTimeDays + 45).toLocaleString()}{' '}
                  Units
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Stockout Probability:</span>
                <span className="text-emerald-400 font-bold">&lt; 0.05% (ISO-9001 Compliant)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Annual Inventory Turns:</span>
                <span className="text-purple-300 font-bold">14.8x / Year</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
