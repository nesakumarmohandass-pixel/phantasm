import React from 'react';
import { PRESETS } from '../core/presets';
import type { PresetId } from '../types';
import { Play, UploadCloud, Monitor, Disc, Cpu } from 'lucide-react';
import { sound } from '../core/sound';

interface StudioToolbarProps {
  activePresetId: PresetId;
  onSelectPreset: (id: PresetId) => void;
  onDecompile: () => void;
  isScanning: boolean;
  onCustomUpload: (code: string, name: string) => void;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  activePresetId,
  onSelectPreset,
  onDecompile,
  isScanning,
  onCustomUpload,
}) => {
  const [showCustomModal, setShowCustomModal] = React.useState(false);
  const [customInput, setCustomInput] = React.useState('');
  const [customName, setCustomName] = React.useState('FinancialModel.bas');

  const presetList = Object.values(PRESETS);
  const activePreset = PRESETS[activePresetId];

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;
    onCustomUpload(customInput, customName);
    setShowCustomModal(false);
  };

  return (
    <div className="border-b border-zinc-800/80 bg-zinc-950 px-4 lg:px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      
      {/* Left: Segmented Artifact Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900/90 border border-zinc-800">
        {presetList.map((preset) => {
          const isActive = preset.id === activePresetId;
          const Icon =
            preset.id === 'pascal-logistics'
              ? Cpu
              : preset.id === 'vb6-finance'
              ? Monitor
              : Disc;

          return (
            <button
              key={preset.id}
              onClick={() => {
                sound.playEraTransition();
                onSelectPreset(preset.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                isActive
                  ? 'bg-zinc-800 text-zinc-100 font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
              <div className="flex items-baseline gap-1.5">
                <span>{preset.name}</span>
                <span className="text-[10px] font-mono text-zinc-500">'{preset.year.toString().slice(-2)}</span>
              </div>
            </button>
          );
        })}

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 transition-colors"
          title="Upload or paste custom legacy code"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Custom</span>
        </button>
      </div>

      {/* Right: Architecture Badge & Decompile Action */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <div className="text-right hidden sm:block">
          <div className="text-[11px] text-zinc-300 font-medium">
            {activePreset.originalStack.split('/')[0]}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            ➔ {activePreset.modernTargetStack.split('+')[0]}
          </div>
        </div>

        <button
          onClick={() => {
            sound.playEraTransition();
            onDecompile();
          }}
          disabled={isScanning}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium text-white transition-all shadow-sm ${
            isScanning
              ? 'bg-purple-900/60 cursor-wait text-purple-200'
              : 'bg-purple-600 hover:bg-purple-500 active:scale-95'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : 'fill-current'}`} />
          <span>{isScanning ? 'Decompiling AST...' : 'Decompile & Mirror'}</span>
        </button>
      </div>

      {/* Custom Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-100 m-0">Ingest Custom Legacy Source</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Source Filename:</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-200 font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Paste Legacy Code (VB6, Pascal, C, Fortran, JS):</label>
                <textarea
                  rows={8}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="' Paste subroutine, mathematical functions, or form definitions here..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-xs text-emerald-400 font-mono focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-3 py-1.5 rounded-md text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
              >
                Decompile & Inject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
