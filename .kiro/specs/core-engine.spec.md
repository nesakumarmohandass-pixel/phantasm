# Spec: PHANTASM Core Engine & Synchronization Bus
**Version:** 1.0.0-halloween  
**Status:** Approved  
**Author:** Kiro Autonomous Architect  

## 1. Overview
The Core Engine orchestrates the lifecycle of legacy software resurrection: ingestion, AST decompilation, spec generation, code synthesis, and bidirectional lockstep event mirroring.

## 2. Requirements
- **REQ-01**: Ingest raw legacy source code or binary metadata without external compiler dependencies.
- **REQ-02**: Deconstruct legacy forms, controls, and event listeners (`OnClick`, `OnChange`, `OnTimer`) into an Abstract Behavioral Graph (ABG).
- **REQ-03**: Emit modern React 19 functional components with TypeScript typings and reactive hooks (`useLegacyMirror`).
- **REQ-04**: Maintain a bi-directional event bus that broadcasts state updates between the legacy emulation layer and modern DOM with latency < 5ms.
- **REQ-05**: Provide exportable migration packages containing source code, Vitest parity suites, and Dockerfile configurations.

## 3. Data Structures
```typescript
interface ParityMetrics {
  stateParityPct: number;       // e.g. 100.00
  mathematicalDrift: number;    // e.g. 0.000000
  legacyExecutionTimeMs: number;// e.g. 42.4
  modernExecutionTimeMs: number;// e.g. 1.2
  speedupRatio: number;         // e.g. 35.33
  anomalyDetected: boolean;
  activeDriftField?: string;
}

interface LegacyAppPreset {
  id: string;
  name: string;
  year: number;
  originalPlatform: string;
  originalStack: string;
  modernTargetStack: string;
  description: string;
  legacyCodeSnippet: string;
  modernCodeSnippet: string;
}
```
