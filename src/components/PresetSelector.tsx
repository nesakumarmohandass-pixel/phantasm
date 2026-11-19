import React from 'react';
import { PRESETS } from '../core/presets';
import type { PresetId } from '../types';
import { Layers, Monitor, Disc, Cpu, Code2, Sparkles, UploadCloud } from 'lucide-react';

interface PresetSelectorProps {
  activePresetId: PresetId;
  onSelectPreset: (id: PresetId) => void;
  onExorciseTrigger: () => void;
  isScanning: boolean;
  onCustomUpload: (code: string, name: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  activePresetId,
  onSelectPreset,
  onExorciseTrigger,
  isScanning,
  onCustomUpload
}) => {
  const [showCustomModal, setShowCustomModal] = React.useState(false);
  const [customInput, setCustomInput] = React.useState('');
  const [customName, setCustomName] = React.useState('Legacy-System-1995.bas');

  const presetList = Object.values(PRESETS);

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;
    onCustomUpload(customInput, customName);
    setShowCustomModal(false);
  };

  return (
    <section className="px-4 lg:px-8 py-4 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5 mr-1">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Dead Tech Artifacts:</span>
          </span>

          {presetList.map((preset) => {
            const isActive = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-purple-950/80 text-purple-200 border border-purple-500/80 shadow-md shadow-purple-900/30 ring-1 ring-purple-500/50'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {preset.id === 'vb6-finance' && <Monitor className="w-4 h-4 text-sky-400" />}
                {preset.id === 'flash-orbit' && <Disc className="w-4 h-4 text-amber-400" />}
                {preset.id === 'pascal-logistics' && <Cpu className="w-4 h-4 text-emerald-400" />}

                <div className="text-left">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    {preset.name}
                    <span className="text-[10px] text-slate-400 font-mono">({preset.year})</span>
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {preset.originalStack.split(' ')[0]} → {preset.originalPlatform}
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800/80 border border-dashed border-slate-700/80 transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
            <span>Ingest Custom Code</span>
          </button>
        </div>

        {/* Resurrect Action Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onExorciseTrigger}
            disabled={isScanning}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg ${
              isScanning
                ? 'bg-purple-800/50 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 active:scale-95 shadow-purple-600/30'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Decompiling & Specifying...' : 'Exorcise & Reincarnate'}</span>
          </button>
        </div>

      </div>

      {/* Custom Upload Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white m-0">Ingest Abandoned Legacy Code</h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Paste raw code from any dead language (Visual Basic 6, Turbo Pascal, ActionScript, COBOL, Fortran, or legacy C). Kiro will decompile the logic and synthesize modern specifications.
            </p>

            <div className="mt-3">
              <label className="text-[11px] font-mono text-slate-300 block mb-1">
                Artifact Filename:
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="mt-3">
              <label className="text-[11px] font-mono text-slate-300 block mb-1">
                Raw Legacy Source:
              </label>
              <textarea
                rows={8}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="' Paste your legacy function, form module, or subroutine here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-emerald-400 font-mono focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md"
              >
                Parse & Inject Into Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
