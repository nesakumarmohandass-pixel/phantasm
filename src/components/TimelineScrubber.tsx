import React from 'react';
import type { PresetId } from '../types';
import { Clock, Cpu, Monitor, Disc, Sparkles } from 'lucide-react';
import { sound } from '../core/sound';

interface TimelineScrubberProps {
  activePresetId: PresetId;
  onSelectPreset: (id: PresetId) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  const milestones: Array<{ id: PresetId; year: number; label: string; arch: string; icon: typeof Cpu }> = [
    { id: 'pascal-logistics', year: 1987, label: 'MS-DOS 3.3', arch: 'IBM PC Real-Mode', icon: Cpu },
    { id: 'vb6-finance', year: 1998, label: 'Windows 98 SE', arch: 'Win32 COM / x86', icon: Monitor },
    { id: 'flash-orbit', year: 2001, label: 'Macromedia Flash MX', arch: 'Vector SWF Plugin', icon: Disc },
  ];

  const handleSelect = (id: PresetId) => {
    sound.playEraTransition();
    onSelectPreset(id);
  };

  return (
    <div className="w-full bg-slate-950/90 border-b border-purple-900/30 px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Title */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>Timeline Scrubber:</span>
        </div>

        {/* Milestone Steps */}
        <div className="flex-1 flex items-center justify-between max-w-3xl mx-auto relative">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

          {milestones.map((m) => {
            const isActive = m.id === activePresetId;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m.id)}
                className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-purple-950 text-purple-200 border border-purple-500 shadow-lg shadow-purple-900/50 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                <div className="text-left font-mono">
                  <span className="font-bold text-white block text-[11px] leading-tight">{m.year}</span>
                  <span className="text-[9px] text-slate-400 block">{m.label}</span>
                </div>
              </button>
            );
          })}

          {/* 2026 Target */}
          <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-mono shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <div className="text-left">
              <span className="font-bold text-white block text-[11px] leading-tight">2026</span>
              <span className="text-[9px] text-emerald-400 block">Kiro Reincarnated</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
