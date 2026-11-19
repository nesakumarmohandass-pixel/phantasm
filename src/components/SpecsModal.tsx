import React from 'react';
import { FileText, X, Check } from 'lucide-react';

interface SpecsModalProps {
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'specs' | 'steering' | 'hooks'>('specs');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="max-w-3xl w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 m-0">Kiro Specification & Invariance Rules</h3>
              <p className="text-[11px] text-zinc-500 m-0">
                Core governance documents embedded in the local repository
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

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60 px-5 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-md border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-purple-500 text-zinc-100 bg-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            .kiro/specs/core-engine.spec.md
          </button>
          <button
            onClick={() => setActiveTab('steering')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-md border-b-2 transition-all ${
              activeTab === 'steering'
                ? 'border-purple-500 text-zinc-100 bg-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            .kiro/steering/system-rules.md
          </button>
          <button
            onClick={() => setActiveTab('hooks')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-md border-b-2 transition-all ${
              activeTab === 'hooks'
                ? 'border-purple-500 text-zinc-100 bg-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            .kiro/hooks/on-drift-detected.json
          </button>
        </div>

        {/* Content Viewer */}
        <div className="p-5 overflow-y-auto font-mono text-xs text-zinc-300 bg-zinc-950 leading-relaxed flex-1 select-text">
          {activeTab === 'specs' && (
            <pre className="whitespace-pre-wrap">
{`# Spec: PHANTASM Core Engine & Synchronization Bus
Version: 1.0.0-halloween
Status: Approved
Author: Kiro Autonomous Architect

## 1. Overview
The Core Engine orchestrates the lifecycle of legacy software resurrection:
ingestion, AST decompilation, spec generation, code synthesis, and
bidirectional lockstep event mirroring.

## 2. Invariants & Guarantees
- REQ-01: Zero Logic Loss - Every mathematical formula decompiled to Float64 precision.
- REQ-02: Bidirectional Lockstep latency < 5ms across legacy and modern DOM.
- REQ-03: Parity Sentinel automated drift tripping at delta > 0.0001.`}
            </pre>
          )}

          {activeTab === 'steering' && (
            <pre className="whitespace-pre-wrap">
{`# System Architecture & Steering Rules

### 1. Vision & Core Philosophy
PHANTASM resurrects abandoned and rotting software into modern,
reactive 2026 web applications while maintaining mathematical and state parity.

### 2. Engineering Standards
- Framework: React 19 + TypeScript (Strict Type Safety).
- Styling: Authentic Win98/CRT Shaders + Modern Zinc Dark Theme.
- State Engine: Observable lockstep bridge syncing legacy and modern inputs.`}
            </pre>
          )}

          {activeTab === 'hooks' && (
            <pre className="whitespace-pre-wrap text-emerald-400">
{`{
  "name": "on-drift-detected",
  "description": "Triggered when mathematical drift exceeds 0.0001",
  "version": "1.0.0",
  "trigger": {
    "type": "event",
    "event": "parity:drift_exceeded",
    "threshold": 0.0001
  },
  "actions": [
    { "step": 1, "action": "system.telemetry.record", "severity": "CRITICAL" },
    { "step": 2, "action": "agent.analyze_diff", "strategy": "symbolic_compare" },
    { "step": 3, "action": "agent.synthesize_patch", "output": "auto_hot_patch" }
  ]
}`}
            </pre>
          )}
        </div>

        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Check className="w-3.5 h-3.5" />
            <span>Kiro Governance Validated</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
