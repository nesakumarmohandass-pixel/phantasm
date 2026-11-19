import React from 'react';
import type { LegacyAppPreset } from '../types';
import { Code2, Copy, Check } from 'lucide-react';

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
    <section className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono m-0">
                Code Dissection & AST Translation Diff
              </h3>
              <p className="text-xs text-slate-400 m-0">
                Comparing original {preset.year} legacy code against synthesized 2026 TypeScript
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
              Bridge: .kiro/specs/core-engine.spec.md
            </span>
          </div>
        </div>

        {/* Dual Code View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          
          {/* Left: Original Legacy Code */}
          <div className="flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs">
              <span className="font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Original {preset.originalStack} ({preset.year})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Read-Only Decompiled</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-96">
              <code>{preset.legacyCodeSnippet}</code>
            </pre>
          </div>

          {/* Right: Modern Reincarnated TypeScript Code */}
          <div className="flex flex-col bg-slate-950 rounded-xl border border-purple-900/50 overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-purple-950/40 border-b border-purple-900/40 text-xs">
              <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Synthesized Modern TypeScript 5.8 (2026)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {copiedModern ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedModern ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed max-h-96">
              <code>{preset.modernCodeSnippet}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
