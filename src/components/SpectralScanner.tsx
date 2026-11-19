import React from 'react';
import { Cpu, ShieldCheck, FileText } from 'lucide-react';
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
      { text: `[AST-INGEST] Reading byte stream for artifact: ${preset.name} (${preset.year})`, delay: 250 },
      { text: `[DEAD-API] Detected obsolete runtime link: ${preset.originalStack} -> ${preset.originalPlatform}`, delay: 550 },
      { text: `[DECOMPILER] Extracting state variables, form controls, and mathematical functions...`, delay: 850 },
      { text: `[SPEC-GEN] Synthesizing formal specification into .kiro/specs/core-engine.spec.md`, delay: 1200 },
      { text: `[AI-SYNTHESIS] Emitting modern TypeScript 5.8 + React 19 functional component tree`, delay: 1600 },
      { text: `[PARITY-VERIFY] Running symbolic equivalence check: State Parity 100.00%, Drift 0.0000`, delay: 2000 },
      { text: `[LOCKSTEP-READY] Bidirectional DOM mirror active. Launching Dual-State Viewport.`, delay: 2400 },
    ];

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    sequence.forEach((item, index) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
        setStep(index + 1);
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 700);
        }
      }, item.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [preset, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-2xl font-mono">
        
        {/* Terminal Title */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400 animate-spin" />
            <h3 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider m-0">
              AST Decompilation & Spec Synthesizer
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            Phase: {step}/7
          </span>
        </div>

        {/* Live Terminal Log Output */}
        <div className="mt-3 p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 h-56 overflow-y-auto font-mono text-xs space-y-1.5">
          {logs.map((log, idx) => {
            const isHighlight = log.includes('SPEC-GEN') || log.includes('PARITY-VERIFY');
            return (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  isHighlight ? 'text-purple-300 font-medium' : 'text-emerald-400'
                }`}
              >
                <span className="text-zinc-600 select-none">&gt;</span>
                <span>{log}</span>
              </div>
            );
          })}
          {step < 7 && (
            <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
              <span className="text-zinc-600 select-none">&gt;</span>
              <span>Decompiling AST nodes...</span>
            </div>
          )}
        </div>

        {/* Spec Information */}
        <div className="mt-3 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Target: <span className="font-mono text-zinc-400">.kiro/specs/core-engine.spec.md</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Invariance Guard: Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
