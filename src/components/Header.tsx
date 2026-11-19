import React from 'react';
import { Ghost, Sparkles, Download, FileCode, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenSpecs: () => void;
  onOpenExport: () => void;
  isAutoHealing: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSpecs,
  onOpenExport,
  isAutoHealing,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="border-b border-purple-900/40 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 shadow-lg shadow-purple-500/20">
            <Ghost className="w-6 h-6 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white m-0 p-0 font-sans">
                PHANTASM
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-700/50">
                v1.0 Kiroween
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0">
              Autonomous Code Reincarnator & Dual-State Time Machine
            </p>
          </div>
        </div>

        {/* Center: Track & Feature Badges */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
            🎃 Kiroween 2026
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30">
            ⚰️ Resurrection
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            🧟 Frankenstein
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            💼 $10K Startup MVP
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {isAutoHealing && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kiro Auto-Healing Active...</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
              soundEnabled
                ? 'bg-purple-950/60 text-purple-300 border-purple-700/50'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Retro Synthesized Audio FX"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">SFX: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={onOpenSpecs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-colors shadow-sm"
            title="View Kiro Spec Documents"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span>.kiro/specs</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 transition-all shadow-md shadow-purple-600/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Migration Bundle</span>
          </button>
        </div>

      </div>
    </header>
  );
};
