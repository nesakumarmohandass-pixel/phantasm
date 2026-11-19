import React from 'react';
import { Ghost, Download, FileText, Volume2, VolumeX } from 'lucide-react';

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
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shadow-sm">
          <Ghost className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-zinc-100 tracking-tight font-sans">
            PHANTASM
          </span>
          <span className="text-xs text-zinc-500 font-normal">
            Legacy Code Modernization Engine
          </span>
        </div>
      </div>

      {/* Center Status Pill */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Lockstep Bridge Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {isAutoHealing && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Kiro Patching Invariants...</span>
          </div>
        )}

        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded-md text-xs transition-colors border ${
            soundEnabled
              ? 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              : 'bg-zinc-950 text-zinc-600 border-zinc-850 hover:text-zinc-400'
          }`}
          title={soundEnabled ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenSpecs}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span>Specifications</span>
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-100 bg-zinc-100 hover:bg-white text-zinc-950 transition-all shadow-sm active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Bundle</span>
        </button>
      </div>
    </header>
  );
};
