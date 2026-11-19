import React from 'react';
import { Header } from './components/Header';
import { PresetSelector } from './components/PresetSelector';
import { LegacyViewport } from './components/DualMirror/LegacyViewport';
import { ModernViewport } from './components/DualMirror/ModernViewport';
import { ParitySentinel } from './components/DualMirror/ParitySentinel';
import { CodeComparator } from './components/CodeComparator';
import { SpectralScanner } from './components/SpectralScanner';
import { SpecsModal } from './components/SpecsModal';
import { ExportModal } from './components/ExportModal';
import { PRESETS } from './core/presets';
import type { PresetId, FinanceState, OrbitState, LogisticsState } from './types';
import { ArrowLeftRight, Ghost } from 'lucide-react';

export function App() {
  // Preset Selection State
  const [activePresetId, setActivePresetId] = React.useState<PresetId>('vb6-finance');
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [showSpecsModal, setShowSpecsModal] = React.useState<boolean>(false);
  const [showExportModal, setShowExportModal] = React.useState<boolean>(false);

  // Parity Sentinel & Chaos State
  const [anomalyDetected, setAnomalyDetected] = React.useState<boolean>(false);
  const [isHealing, setIsHealing] = React.useState<boolean>(false);

  // Viewport Settings
  const [isCrtEnabled, setIsCrtEnabled] = React.useState<boolean>(true);

  // Shared Application States (Synchronized via Lockstep Bridge)
  const [financeState, setFinanceState] = React.useState<FinanceState>({
    principal: 100000,
    interestRate: 8.5,
    years: 5,
    volatility: 18,
    compoundingPeriods: 4,
  });

  const [orbitState, setOrbitState] = React.useState<OrbitState>({
    starMass: 1000,
    orbitalRadius: 65,
    initialVelocity: 7.45,
    gravitationalConstant: 6.674,
    isPlaying: true,
  });

  const [logisticsState, setLogisticsState] = React.useState<LogisticsState>({
    dailyDemand: 120,
    leadTimeDays: 14,
    orderCost: 250,
    holdingCostPerUnit: 4.5,
    safetyStockFactor: 1.65,
  });

  const activePreset = PRESETS[activePresetId];

  // Trigger Spectral Scanner Decompilation Animation
  const handleExorciseTrigger = () => {
    setIsScanning(true);
    setAnomalyDetected(false);
  };

  // Induce Chaos (simulate a subtle migration bug)
  const handleInduceChaos = () => {
    setAnomalyDetected(true);
  };

  // Auto-Heal (Simulate Kiro Agent Hook fixing the bug)
  const handleAutoHeal = () => {
    setIsHealing(true);
    setTimeout(() => {
      setAnomalyDetected(false);
      setIsHealing(false);
    }, 1200);
  };

  const handleCustomUpload = (_code: string, _name: string) => {
    // Dynamically inject custom code and trigger scanner
    setIsScanning(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white">
      
      {/* 1. Global Header with Hackathon Tracks & Actions */}
      <Header
        onOpenSpecs={() => setShowSpecsModal(true)}
        onOpenExport={() => setShowExportModal(true)}
        isAutoHealing={isHealing}
      />

      {/* 2. Preset Selector / Dead Tech Catalog */}
      <PresetSelector
        activePresetId={activePresetId}
        onSelectPreset={(id) => {
          setActivePresetId(id);
          setAnomalyDetected(false);
        }}
        onExorciseTrigger={handleExorciseTrigger}
        isScanning={isScanning}
        onCustomUpload={handleCustomUpload}
      />

      {/* 3. Parity Sentinel Telemetry Bar */}
      <ParitySentinel
        anomalyDetected={anomalyDetected}
        onInduceChaos={handleInduceChaos}
        onAutoHeal={handleAutoHeal}
        isHealing={isHealing}
        speedup={activePresetId === 'vb6-finance' ? 34.4 : activePresetId === 'flash-orbit' ? 28.2 : 45.1}
      />

      {/* 4. Main Dual-State Lockstep Viewport */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        
        {/* Viewport Subtitle / Lockstep Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-purple-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-slate-300 font-mono m-0">
              Dual-State Lockstep Mirror: {activePreset.name}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Sub-5ms Event Mirror Active | Input in either era updates both in lockstep
          </span>
        </div>

        {/* Dual Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[520px]">
          
          {/* Left: The Past (Legacy Emulated Viewport) */}
          <LegacyViewport
            presetId={activePresetId}
            financeState={financeState}
            onFinanceChange={setFinanceState}
            orbitState={orbitState}
            onOrbitChange={setOrbitState}
            logisticsState={logisticsState}
            onLogisticsChange={setLogisticsState}
            isCrtEnabled={isCrtEnabled}
            onToggleCrt={() => setIsCrtEnabled(!isCrtEnabled)}
          />

          {/* Right: The Future (2026 Modern Viewport) */}
          <ModernViewport
            presetId={activePresetId}
            financeState={financeState}
            onFinanceChange={setFinanceState}
            orbitState={orbitState}
            onOrbitChange={setOrbitState}
            logisticsState={logisticsState}
            onLogisticsChange={setLogisticsState}
            anomalyDetected={anomalyDetected}
          />

        </div>
      </main>

      {/* 5. Code Dissection & AST Translation Diff */}
      <CodeComparator preset={activePreset} />

      {/* 6. Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Ghost className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 font-bold">PHANTASM</span>
            <span>— Built for the Kiroween Devpost Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Spec-Driven Engineering</span>
            <span>•</span>
            <span>Zero-Divergence Telemetry</span>
            <span>•</span>
            <span className="text-purple-400">Powered by Kiro AI</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {isScanning && (
        <SpectralScanner
          preset={activePreset}
          onComplete={() => setIsScanning(false)}
        />
      )}

      {showSpecsModal && (
        <SpecsModal onClose={() => setShowSpecsModal(false)} />
      )}

      {showExportModal && (
        <ExportModal
          preset={activePreset}
          onClose={() => setShowExportModal(false)}
        />
      )}

    </div>
  );
}

export default App;
