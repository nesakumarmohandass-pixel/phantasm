import React from 'react';
import { ShieldCheck, AlertOctagon, Wrench, Gauge, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParitySentinelProps {
  anomalyDetected: boolean;
  onInduceChaos: () => void;
  onAutoHeal: () => void;
  isHealing: boolean;
  speedup: number;
}

export const ParitySentinel: React.FC<ParitySentinelProps> = ({
  anomalyDetected,
  onInduceChaos,
  onAutoHeal,
  isHealing,
  speedup,
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleHealClick = () => {
    onAutoHeal();
    setTimeout(triggerConfetti, 1000);
  };

  return (
    <section className="px-4 lg:px-8 py-3 bg-slate-950/90 border-y border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Telemetry Indicators */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Parity Sentinel:
            </span>
          </div>

          {/* State Parity Metric */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400">State Parity:</span>
            <span
              className={`font-mono text-xs font-bold ${
                anomalyDetected ? 'text-red-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {anomalyDetected ? '91.50%' : '100.00%'}
            </span>
            {anomalyDetected ? (
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </div>

          {/* Mathematical Drift */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400">Calculated Drift:</span>
            <span
              className={`font-mono text-xs font-bold ${
                anomalyDetected ? 'text-red-400 font-extrabold' : 'text-slate-200'
              }`}
            >
              {anomalyDetected ? '+8.5000% [FAIL]' : '0.000000 [EXACT]'}
            </span>
          </div>

          {/* Execution Latency & Speedup */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] text-slate-400">Execution Speedup:</span>
            <span className="font-mono text-xs font-bold text-sky-400">
              {speedup}x Native V8
            </span>
          </div>
        </div>

        {/* Right: Chaos & Auto-Heal Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {!anomalyDetected ? (
            <button
              onClick={onInduceChaos}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/40 transition-colors shadow-sm"
              title="Simulate intentional drift/bug in modern code"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              <span>Induce Chaos / Bug Drift</span>
            </button>
          ) : (
            <button
              onClick={handleHealClick}
              disabled={isHealing}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-lg ${
                isHealing
                  ? 'bg-emerald-800 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-700/40 active:scale-95 animate-bounce'
              }`}
              title="Trigger Kiro Agent Hook (.kiro/hooks/on-drift-detected.json)"
            >
              <Wrench className={`w-3.5 h-3.5 ${isHealing ? 'animate-spin' : ''}`} />
              <span>{isHealing ? 'Synthesizing Patch...' : 'Invoke Kiro Auto-Heal Hook'}</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
