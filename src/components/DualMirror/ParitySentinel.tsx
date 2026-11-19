import React from 'react';
import { ShieldCheck, AlertTriangle, Wrench, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../core/sound';

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
    sound.playVictory();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleChaosClick = () => {
    sound.playAlarm();
    onInduceChaos();
  };

  const handleHealClick = () => {
    onAutoHeal();
    setTimeout(triggerConfetti, 900);
  };

  return (
    <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 lg:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
      
      {/* Left: Precise Telemetry Metrics */}
      <div className="flex flex-wrap items-center gap-4 text-zinc-400">
        <div className="flex items-center gap-1.5 text-zinc-500 font-sans font-medium text-[11px] uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-zinc-400" />
          <span>Invariance Sentinel</span>
        </div>

        {/* State Parity */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 text-[11px]">Parity:</span>
          <span className={`font-semibold tabular-nums ${anomalyDetected ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
            {anomalyDetected ? '91.50%' : '100.00%'}
          </span>
          {anomalyDetected ? (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          ) : (
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
          )}
        </div>

        {/* Drift */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500 text-[11px]">Drift:</span>
          <span className={`tabular-nums ${anomalyDetected ? 'text-red-400 font-semibold' : 'text-zinc-300'}`}>
            {anomalyDetected ? '+8.5000% [DIVERGENCE]' : '0.000000 Δ'}
          </span>
        </div>

        {/* Speedup */}
        <div className="hidden md:flex items-center gap-1.5 text-zinc-400">
          <span className="text-zinc-500 text-[11px]">Speedup:</span>
          <span className="text-zinc-200 tabular-nums">{speedup}x V8 Native</span>
        </div>
      </div>

      {/* Right: Chaos & Auto-Heal Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {!anomalyDetected ? (
          <button
            onClick={handleChaosClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
            title="Inject an artificial floating-point rounding divergence"
          >
            <AlertTriangle className="w-3 h-3 text-zinc-500" />
            <span>Simulate Drift Bug</span>
          </button>
        ) : (
          <button
            onClick={handleHealClick}
            disabled={isHealing}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-sans font-medium text-white transition-all shadow-sm ${
              isHealing
                ? 'bg-emerald-900 cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95'
            }`}
          >
            <Wrench className={`w-3 h-3 ${isHealing ? 'animate-spin' : ''}`} />
            <span>{isHealing ? 'Synthesizing Patch...' : 'Apply Kiro Auto-Patch'}</span>
          </button>
        )}
      </div>

    </div>
  );
};
