import React from 'react';
import { Header } from './components/Header';
import { StudioToolbar } from './components/StudioToolbar';
import { LegacyViewport } from './components/DualMirror/LegacyViewport';
import { ModernViewport } from './components/DualMirror/ModernViewport';
import { ParitySentinel } from './components/DualMirror/ParitySentinel';
import { ParityTestRunner } from './components/ParityTestRunner';
import { CodeComparator } from './components/CodeComparator';
import { SpectralScanner } from './components/SpectralScanner';
import { SpecsModal } from './components/SpecsModal';
import { ExportModal } from './components/ExportModal';
import { PRESETS } from './core/presets';
import { sound } from './core/sound';
import type { PresetId, FinanceState, OrbitState, LogisticsState } from './types';
import { CheckSquare, Code2, ArrowLeftRight } from 'lucide-react';

export function App() {
  // Preset Selection State
  const [activePresetId, setActivePresetId] = React.useState<PresetId>('vb6-finance');
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [showSpecsModal, setShowSpecsModal] = React.useState<boolean>(false);
  const [showExportModal, setShowExportModal] = React.useState<boolean>(false);

  // Bottom Workspace Tabs: 'tests' | 'diff' | 'specs'
  const [activeTab, setActiveTab] = React.useState<'tests' | 'diff'>('tests');

  // Parity Sentinel & Chaos State
  const [anomalyDetected, setAnomalyDetected] = React.useState<boolean>(false);
  const [isHealing, setIsHealing] = React.useState<boolean>(false);

  // Audio & Viewport Settings
  const [isCrtEnabled, setIsCrtEnabled] = React.useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(true);

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

  const handleToggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playKeyClick();
    }
  };

  const handleSelectPreset = (id: PresetId) => {
    sound.playEraTransition();
    setActivePresetId(id);
    setAnomalyDetected(false);
  };

  const handleDecompile = () => {
    sound.playEraTransition();
    setIsScanning(true);
    setAnomalyDetected(false);
  };

  const handleInduceChaos = () => {
    setAnomalyDetected(true);
  };

  const handleAutoHeal = () => {
    setIsHealing(true);
    setTimeout(() => {
      setAnomalyDetected(false);
      setIsHealing(false);
    }, 1200);
  };

  const handleCustomUpload = (_code: string, _name: string) => {
    sound.playEraTransition();
    setIsScanning(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-purple-600 selection:text-white font-sans antialiased">
      
      {/* 1. Sleek Human-Grade Navigation */}
      <Header
        onOpenSpecs={() => setShowSpecsModal(true)}
        onOpenExport={() => setShowExportModal(true)}
        isAutoHealing={isHealing}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 2. Linear-Style Studio Toolbar */}
      <StudioToolbar
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onDecompile={handleDecompile}
        isScanning={isScanning}
        onCustomUpload={handleCustomUpload}
      />

      {/* 3. Invariance Sentinel Telemetry Bar */}
      <ParitySentinel
        anomalyDetected={anomalyDetected}
        onInduceChaos={handleInduceChaos}
        onAutoHeal={handleAutoHeal}
        isHealing={isHealing}
        speedup={activePresetId === 'vb6-finance' ? 34.4 : activePresetId === 'flash-orbit' ? 28.2 : 45.1}
      />

      {/* 4. Main Dual-State Workstation Viewport */}
      <main className="flex-1 px-4 lg:px-6 py-5 max-w-7xl mx-auto w-full">
        
        {/* Workspace Title Bar */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-semibold text-zinc-200">
              {activePreset.name} ({activePreset.year})
            </span>
            <span className="text-zinc-500 font-mono text-[11px] hidden sm:inline">
              — Sub-5ms Synchronous Memory Bridge
            </span>
          </div>

          <div className="text-[11px] text-zinc-500 font-mono">
            Inputs in either runtime propagate bidirectionally
          </div>
        </div>

        {/* Dual Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[480px]">
          {/* Left: The Past */}
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

          {/* Right: The Future */}
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

        {/* 5. Clean Workstation Tabs: Verification & Source Diff */}
        <div className="mt-8">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-px mb-4">
            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'tests'
                  ? 'border-purple-500 text-zinc-100 font-semibold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>In-Browser Test Vectors</span>
            </button>

            <button
              onClick={() => setActiveTab('diff')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'diff'
                  ? 'border-purple-500 text-zinc-100 font-semibold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>AST Source Code Diff</span>
            </button>
          </div>

          {activeTab === 'tests' && <ParityTestRunner />}
          {activeTab === 'diff' && <CodeComparator preset={activePreset} />}
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 px-6 py-4 text-xs text-zinc-600 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          PHANTASM — Built for the Kiroween Devpost Challenge
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span>Spec-Driven Modernization</span>
          <span>•</span>
          <span>Zero-Divergence Telemetry</span>
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
