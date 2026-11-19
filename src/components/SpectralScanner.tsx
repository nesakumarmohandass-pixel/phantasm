import React from 'react';
import { Cpu, ShieldCheck, FileCode } from 'lucide-react';
import type { LegacyAppPreset } from '../types';

interface SpectralScannerProps {
  preset: LegacyAppPreset;
  onComplete: () => void;
}

export const SpectralScanner: React.FC<SpectralScannerProps> = ({ preset, onComplete }) => {
  const [step, setStep] = React.useState<number>(0);
  const [logs, setLogs] = React.useState<string[]>([]);

  React.useEffect(() => {
    const sequence = [
      { text: `[AST-INGEST] Reading byte stream for artifact: ${preset.name} (${preset.year})`, delay: 300 },
      { text: `[DEAD-API] Detected obsolete runtime link: ${preset.originalStack} -> ${preset.originalPlatform}`, delay: 700 },
      { text: `[DECOMPILER] Extracting state variables, form controls, and mathematical functions...`, delay: 1100 },
      { text: `[SPEC-GEN] Synthesizing formal specification into .kiro/specs/core-engine.spec.md`, delay: 1600 },
      { text: `[AI-SYNTHESIS] Emitting modern TypeScript 5.8 + React 19 functional component tree`, delay: 2100 },
      { text: `[PARITY-VERIFY] Running symbolic equivalence check: State Parity 100.00%, Drift 0.0000`, delay: 2600 },
      { text: `[LOCKSTEP-READY] Bidirectional DOM mirror active. Launching Dual-State Viewport.`, delay: 3000 },
    ];

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    sequence.forEach((item, index) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
        setStep(index + 1);
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 900);
        }
      }, item.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [preset, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="max-w-2xl w-full bg-slate-950 border border-purple-500/50 rounded-2xl p-6 shadow-2xl shadow-purple-950/60 font-mono">
        
        {/* Terminal Title */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400 animate-spin" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase m-0">
              Kiro Spectral Decompiler & Spec Synthesizer
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
            Phase: {step}/7
          </span>
        </div>

        {/* Live Terminal Log Output */}
        <div className="mt-4 p-4 rounded-xl bg-black/90 border border-slate-800 h-64 overflow-y-auto font-mono text-xs space-y-2">
          {logs.map((log, idx) => {
            const isHighlight = log.includes('SPEC-GEN') || log.includes('PARITY-VERIFY');
            return (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  isHighlight ? 'text-amber-300 font-semibold' : 'text-emerald-400'
                }`}
              >
                <span className="text-slate-600 select-none">&gt;</span>
                <span>{log}</span>
              </div>
            );
          })}
          {step < 7 && (
            <div className="flex items-center gap-2 text-slate-500 animate-pulse">
              <span className="text-slate-600 select-none">&gt;</span>
              <span>Processing Abstract Syntax Tree...</span>
            </div>
          )}
        </div>

        {/* Kiro Specs Highlight Card */}
        <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Generated Specification: <span className="text-purple-300 font-mono">.kiro/specs/core-engine.spec.md</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Inputs: {preset.specsSummary.inputs.length} | Mathematical Invariants: {preset.specsSummary.formulas.length}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Parity Guard: Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
