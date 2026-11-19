import React from 'react';
import type { LegacyAppPreset } from '../types';
import { Copy, Check } from 'lucide-react';

interface CodeComparatorProps {
  preset: LegacyAppPreset;
}

export const CodeComparator: React.FC<CodeComparatorProps> = ({ preset }) => {
  const [copiedModern, setCopiedModern] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(preset.modernCodeSnippet);
    setCopiedModern(true);
    setTimeout(() => setCopiedModern(false), 2000);
  };

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-4">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-850 gap-2 text-xs">
        <div>
          <span className="font-semibold text-zinc-200">
            AST Translation & Logic Specification
          </span>
          <span className="text-zinc-500 font-mono text-[11px] ml-2">
            Comparing original {preset.year} bytecode against synthesized 2026 TypeScript
          </span>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 self-start sm:self-auto">
          Spec: .kiro/specs/core-engine.spec.md
        </span>
      </div>

      {/* Dual Code View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        
        {/* Left: Original Legacy Code */}
        <div className="flex flex-col bg-zinc-900/40 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono">
            <span className="text-amber-400 font-medium">
              Original {preset.originalStack} ({preset.year})
            </span>
            <span className="text-zinc-500">Decompiled AST</span>
          </div>
          <pre className="p-3 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed max-h-80 select-text">
            <code>{preset.legacyCodeSnippet}</code>
          </pre>
        </div>

        {/* Right: Modern Reincarnated TypeScript Code */}
        <div className="flex flex-col bg-zinc-900/40 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono">
            <span className="text-emerald-400 font-medium">
              Synthesized TypeScript 5.8 (2026)
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              {copiedModern ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedModern ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3 text-[11px] font-mono text-emerald-300/90 overflow-x-auto leading-relaxed max-h-80 select-text">
            <code>{preset.modernCodeSnippet}</code>
          </pre>
        </div>

      </div>

    </div>
  );
};
