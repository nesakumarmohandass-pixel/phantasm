import React from 'react';
import type { PresetId, FinanceState, OrbitState, LogisticsState } from '../../types';
import { Monitor, Tv, Play, Pause, Disc } from 'lucide-react';
import { sound } from '../../core/sound';

interface LegacyViewportProps {
  presetId: PresetId;
  financeState: FinanceState;
  onFinanceChange: (state: FinanceState) => void;
  orbitState: OrbitState;
  onOrbitChange: (state: OrbitState) => void;
  logisticsState: LogisticsState;
  onLogisticsChange: (state: LogisticsState) => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
}

export const LegacyViewport: React.FC<LegacyViewportProps> = ({
  presetId,
  financeState,
  onFinanceChange,
  orbitState,
  onOrbitChange,
  logisticsState,
  onLogisticsChange,
  isCrtEnabled,
  onToggleCrt,
}) => {
  // Canvas animation for Flash Orbit
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const angleRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (presetId !== 'flash-orbit') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Orbit Trail
      ctx.strokeStyle = '#223355';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, orbitState.orbitalRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Central Star (Flash vector style)
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ff9900';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Calculate Planet Position
      if (orbitState.isPlaying) {
        const speed = (orbitState.starMass * 0.00008) / Math.sqrt(orbitState.orbitalRadius);
        angleRef.current += speed;
      }

      const px = cx + Math.cos(angleRef.current) * orbitState.orbitalRadius;
      const py = cy + Math.sin(angleRef.current) * orbitState.orbitalRadius;

      // Draw Planet (Flash vector cyan ball)
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [presetId, orbitState]);

  // Derived legacy computations for display
  const r = financeState.interestRate / 100;
  const n = financeState.compoundingPeriods;
  const t = financeState.years;
  const compounded = financeState.principal * Math.pow(1 + r / n, n * t);
  const grossYield = compounded - financeState.principal;
  const var95 = financeState.principal * 1.645 * (financeState.volatility / 100) * Math.sqrt(t);
  const surplus = grossYield - var95;

  return (
    <div className="flex flex-col h-full bg-zinc-950 rounded-xl border border-zinc-800/90 overflow-hidden shadow-sm">
      
      {/* Top Era Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="font-medium text-zinc-200">
            Legacy Emulated Environment (1987–2001)
          </span>
        </div>

        <button
          onClick={() => {
            sound.playDegauss();
            onToggleCrt();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
            isCrtEnabled
              ? 'bg-zinc-800 text-amber-400 border border-amber-500/30'
              : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
          }`}
          title="Toggle CRT Scanline Shader"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>CRT: {isCrtEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Main Viewport Content */}
      <div className={`p-4 flex-1 flex flex-col justify-center items-center overflow-auto ${isCrtEnabled ? 'crt-overlay' : ''}`}>
        
        {/* ========================================================= */}
        {/* PRESET 1: WINDOWS 98 VISUAL BASIC 6 FINANCE               */}
        {/* ========================================================= */}
        {presetId === 'vb6-finance' && (
          <div className="win98-window w-full max-w-lg shadow-2xl">
            {/* Title Bar */}
            <div className="win98-titlebar">
              <div className="flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5" />
                <span>Aegis Capital Risk Manager - [Form1.frm - 1998]</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="win98-btn !p-0.5 !text-[9px] w-4 h-4 font-bold">_</button>
                <button className="win98-btn !p-0.5 !text-[9px] w-4 h-4 font-bold">□</button>
                <button className="win98-btn !p-0.5 !text-[9px] w-4 h-4 font-bold">✕</button>
              </div>
            </div>

            {/* Menu Bar */}
            <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 text-[11px] flex gap-3 text-black">
              <span className="underline cursor-pointer">F</span>ile
              <span className="underline cursor-pointer">E</span>dit
              <span className="underline cursor-pointer">C</span>alculate
              <span className="underline cursor-pointer">H</span>elp
            </div>

            {/* Form Body */}
            <div className="p-3 text-[11px] space-y-3">
              <fieldset className="border border-[#808080] p-2 rounded-none">
                <legend className="px-1 text-[11px] font-bold">Portfolio Parameters (USD)</legend>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <label className="block mb-0.5">Principal Amount ($):</label>
                    <input
                      type="number"
                      value={financeState.principal}
                      onChange={(e) =>
                        onFinanceChange({ ...financeState, principal: Math.max(1000, Number(e.target.value)) })
                      }
                      className="win98-inset w-full px-1.5 py-0.5 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-0.5">Annual Interest Rate (%):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={financeState.interestRate}
                      onChange={(e) =>
                        onFinanceChange({ ...financeState, interestRate: Math.max(0.1, Number(e.target.value)) })
                      }
                      className="win98-inset w-full px-1.5 py-0.5 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-0.5">Holding Period (Years):</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={financeState.years}
                      onChange={(e) =>
                        onFinanceChange({ ...financeState, years: Math.max(1, Math.min(30, Number(e.target.value))) })
                      }
                      className="win98-inset w-full px-1.5 py-0.5 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block mb-0.5">Volatility Index (σ %):</label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="100"
                      value={financeState.volatility}
                      onChange={(e) =>
                        onFinanceChange({ ...financeState, volatility: Math.max(1, Number(e.target.value)) })
                      }
                      className="win98-inset w-full px-1.5 py-0.5 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Output Readout */}
              <fieldset className="border border-[#808080] p-2 bg-[#d4d0c8]">
                <legend className="px-1 text-[11px] font-bold text-blue-900">Computed Output (Win32 FPU)</legend>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="win98-inset p-1.5">
                    <div className="text-[10px] text-gray-600">Compounded Balance:</div>
                    <div className="font-bold text-sm text-black">
                      ${Math.round(compounded).toLocaleString()}
                    </div>
                  </div>
                  <div className="win98-inset p-1.5">
                    <div className="text-[10px] text-gray-600">Gross Total Yield:</div>
                    <div className="font-bold text-sm text-emerald-800">
                      +${Math.round(grossYield).toLocaleString()}
                    </div>
                  </div>
                  <div className="win98-inset p-1.5">
                    <div className="text-[10px] text-gray-600">Parametric VaR (95%):</div>
                    <div className="font-bold text-sm text-red-800">
                      -${Math.round(var95).toLocaleString()}
                    </div>
                  </div>
                  <div className="win98-inset p-1.5 bg-yellow-50">
                    <div className="text-[10px] text-gray-600">Net Risk Surplus:</div>
                    <div className={`font-bold text-sm ${surplus >= 0 ? 'text-blue-900' : 'text-red-700'}`}>
                      ${Math.round(surplus).toLocaleString()}
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-gray-600">Memory: 16-bit DWord Buffer</span>
                <div className="flex gap-1.5">
                  <button className="win98-btn font-bold">Calculate Now</button>
                  <button
                    onClick={() =>
                      onFinanceChange({ principal: 100000, interestRate: 8.5, years: 5, volatility: 18, compoundingPeriods: 4 })
                    }
                    className="win98-btn"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="border-t border-[#808080] px-2 py-0.5 text-[10px] text-gray-700 bg-[#c0c0c0] flex justify-between">
              <span>Ready | OLE Automation 2.0</span>
              <span>COM Port: Virtual</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRESET 2: MACROMEDIA FLASH ORBIT SIMULATOR (2001)         */}
        {/* ========================================================= */}
        {presetId === 'flash-orbit' && (
          <div className="w-full max-w-lg bg-[#2b2b2b] rounded-lg border-2 border-[#444] shadow-2xl overflow-hidden font-sans">
            {/* Flash MX Chrome */}
            <div className="bg-gradient-to-r from-[#d12e2e] to-[#8a1c1c] text-white px-3 py-1.5 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Disc className="w-4 h-4" />
                <span>Macromedia Flash Player 6 - [graviton_v2.swf]</span>
              </div>
              <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded">ActionScript 2.0</span>
            </div>

            <div className="p-3 bg-[#1e1e1e]">
              {/* Flash Canvas */}
              <div className="relative border-2 border-[#555] rounded bg-black flex justify-center items-center overflow-hidden">
                <canvas ref={canvasRef} width={420} height={220} className="w-full h-auto block" />
                <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-black/70 px-2 py-0.5 rounded">
                  SWF Vector Frame: 60fps
                </div>
              </div>

              {/* Flash Player Controls */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-0.5">Central Star Mass (M☉):</label>
                  <input
                    type="range"
                    min="200"
                    max="3000"
                    step="50"
                    value={orbitState.starMass}
                    onChange={(e) => onOrbitChange({ ...orbitState, starMass: Number(e.target.value) })}
                    className="w-full accent-amber-500"
                  />
                  <div className="text-[10px] font-mono text-amber-400">{orbitState.starMass} M☉</div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-0.5">Orbital Radius (AU):</label>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    step="1"
                    value={orbitState.orbitalRadius}
                    onChange={(e) => onOrbitChange({ ...orbitState, orbitalRadius: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                  <div className="text-[10px] font-mono text-cyan-400">{orbitState.orbitalRadius} AU</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#333] pt-2">
                <button
                  onClick={() => onOrbitChange({ ...orbitState, isPlaying: !orbitState.isPlaying })}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white text-xs rounded border border-[#666]"
                >
                  {orbitState.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{orbitState.isPlaying ? 'Halt Timeline' : 'Play Timeline'}</span>
                </button>
                <span className="text-[10px] font-mono text-slate-500">Vector Rasterizer: Active</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRESET 3: TURBO PASCAL 1987 CRT TERMINAL                  */}
        {/* ========================================================= */}
        {presetId === 'pascal-logistics' && (
          <div className="w-full max-w-lg bg-black border-4 border-[#333] rounded-lg p-3 font-mono text-xs shadow-2xl">
            <div className="terminal-amber leading-tight whitespace-pre select-none">
{`╔═════════════════════════════════════════════════════╗
║ LOGIX-87 INVENTORY CONTROLLER - TURBO PASCAL 7.0    ║
║ IBM PC/AT REAL-MODE 640KB RAM SYSTEM                ║
╚═════════════════════════════════════════════════════╝`}
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-amber-300 block text-[11px]">ANNUAL DEMAND (D):</span>
                  <input
                    type="number"
                    value={logisticsState.dailyDemand * 365}
                    onChange={(e) =>
                      onLogisticsChange({
                        ...logisticsState,
                        dailyDemand: Math.max(1, Math.round(Number(e.target.value) / 365))
                      })
                    }
                    className="bg-[#111] text-amber-400 border border-amber-800/80 px-2 py-0.5 w-full font-mono font-bold"
                  />
                </div>
                <div>
                  <span className="text-amber-300 block text-[11px]">ORDER COST (S, $):</span>
                  <input
                    type="number"
                    value={logisticsState.orderCost}
                    onChange={(e) =>
                      onLogisticsChange({ ...logisticsState, orderCost: Math.max(1, Number(e.target.value)) })
                    }
                    className="bg-[#111] text-amber-400 border border-amber-800/80 px-2 py-0.5 w-full font-mono font-bold"
                  />
                </div>
                <div>
                  <span className="text-amber-300 block text-[11px]">HOLDING COST (H, $):</span>
                  <input
                    type="number"
                    step="0.5"
                    value={logisticsState.holdingCostPerUnit}
                    onChange={(e) =>
                      onLogisticsChange({
                        ...logisticsState,
                        holdingCostPerUnit: Math.max(0.1, Number(e.target.value))
                      })
                    }
                    className="bg-[#111] text-amber-400 border border-amber-800/80 px-2 py-0.5 w-full font-mono font-bold"
                  />
                </div>
                <div>
                  <span className="text-amber-300 block text-[11px]">LEAD TIME (DAYS):</span>
                  <input
                    type="number"
                    value={logisticsState.leadTimeDays}
                    onChange={(e) =>
                      onLogisticsChange({
                        ...logisticsState,
                        leadTimeDays: Math.max(1, Number(e.target.value))
                      })
                    }
                    className="bg-[#111] text-amber-400 border border-amber-800/80 px-2 py-0.5 w-full font-mono font-bold"
                  />
                </div>
              </div>

              {/* Pascal Computed Output */}
              <div className="mt-3 border border-amber-900/60 p-2 bg-[#0c0800] text-[11px]">
                <div className="text-amber-500 font-bold mb-1">&gt; EXECUTING COMPUTE_EOQ()...</div>
                <div className="grid grid-cols-2 gap-1 text-amber-300">
                  <div>
                    EOQ OPTIMAL BATCH:{' '}
                    <span className="font-bold text-amber-100">
                      {Math.round(
                        Math.sqrt(
                          (2 * logisticsState.dailyDemand * 365 * logisticsState.orderCost) /
                            Math.max(0.1, logisticsState.holdingCostPerUnit)
                        )
                      )}{' '}
                      UNITS
                    </span>
                  </div>
                  <div>
                    REORDER POINT (ROP):{' '}
                    <span className="font-bold text-amber-100">
                      {Math.round(logisticsState.dailyDemand * logisticsState.leadTimeDays + 45)} UNITS
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-amber-600 flex justify-between pt-1">
                <span>CRT.TPU: 80x25 TEXT BUFFER</span>
                <span className="animate-pulse">CURSOR: _</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
