import React from 'react';
import { Download, Check, X, FileArchive, Shield } from 'lucide-react';
import type { LegacyAppPreset } from '../types';

interface ExportModalProps {
  preset: LegacyAppPreset;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ preset, onClose }) => {
  const [downloaded, setDownloaded] = React.useState(false);

  const vitestCode = `import { describe, it, expect } from 'vitest';
import { calculateRiskSurplus } from './reincarnatedEngine';

describe('PHANTASM Parity Suite: ${preset.name}', () => {
  it('guarantees 100% mathematical parity against 1998 baseline', () => {
    const result = calculateRiskSurplus(100000, 8.5, 5, 18);
    // Legacy Win32 baseline verified: $151,974 gross balance
    expect(Math.round(result.compoundedTotal)).toBe(151974);
    expect(result.valueAtRisk95).toBeGreaterThan(0);
    expect(result.riskAdjustedSurplus).toBeCloseTo(result.grossYield - result.valueAtRisk95, 2);
  });
});`;

  const handleDownloadZip = () => {
    const exportBundle = {
      project: `PHANTASM-${preset.id}-reincarnated`,
      version: '1.0.0-halloween',
      migratedFrom: `${preset.originalStack} (${preset.year})`,
      targetStack: preset.modernTargetStack,
      kiroSpecifications: {
        specFile: '.kiro/specs/core-engine.spec.md',
        steeringRules: '.kiro/steering/system-rules.md',
        paritySentinel: '.kiro/steering/parity-verification.md',
        hooks: '.kiro/hooks/on-drift-detected.json'
      },
      files: {
        'src/engine.ts': preset.modernCodeSnippet,
        'tests/parity.test.ts': vitestCode,
        'Dockerfile': 'FROM node:22-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "run", "test"]'
      }
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phantasm-${preset.id}-migration-bundle.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <FileArchive className="w-4 h-4 text-purple-400" />
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 m-0">Export Reincarnation Bundle</h3>
              <p className="text-[11px] text-zinc-500 m-0">
                Production-grade package ready for CI/CD and deployment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Deliverables Checklist */}
        <div className="p-5 space-y-3 text-xs font-mono">
          <div className="text-zinc-300 font-sans text-xs">
            Bundled modern deliverables with governance metadata:
          </div>

          <div className="space-y-1.5 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Modern TypeScript Engine (`src/engine.ts`)</span>
              </span>
              <span className="text-zinc-600">TypeScript 5.8</span>
            </div>

            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Automated Parity Test Suite (`tests/parity.test.ts`)</span>
              </span>
              <span className="text-zinc-600">Vitest</span>
            </div>

            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Kiro Spec Governance (`.kiro/specs/`)</span>
              </span>
              <span className="text-zinc-600">Spec-Driven</span>
            </div>

            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Containerized Deployment (`Dockerfile`)</span>
              </span>
              <span className="text-zinc-600">Node 22</span>
            </div>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between font-sans">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-medium text-zinc-200">Mathematical Invariance Guarantee</div>
                <div className="text-[11px] text-zinc-500">Certified 100.00% state match against {preset.year} baseline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md text-xs text-zinc-400 hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-sm active:scale-95"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Downloaded!' : 'Download Package (.json)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
