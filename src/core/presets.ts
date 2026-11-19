import type { LegacyAppPreset } from '../types';

export const PRESETS: Record<string, LegacyAppPreset> = {
  'vb6-finance': {
    id: 'vb6-finance',
    name: 'Aegis Capital Risk Ledger',
    era: 'Windows 98 Second Edition',
    year: 1998,
    originalPlatform: 'Win32 x86 / COM DLL',
    originalStack: 'Microsoft Visual Basic 6.0 Enterprise',
    modernTargetStack: 'React 19 + TypeScript + WebAssembly Float64',
    tagline: 'Wall Street Risk & Compound Interest Engine with 95% Parametric VaR',
    description: 'An enterprise portfolio risk model used in 1998 trading desks. Originally compiled with VB6 and OleAut32.dll for native x86 Windows.',
    specsSummary: {
      inputs: ['Principal ($)', 'Annual Rate (%)', 'Horizon (Years)', 'Volatility Index (%)'],
      formulas: [
        'Compound Return: P * (1 + r/n)^(n*t)',
        'Parametric VaR (95%): P * 1.645 * sigma * sqrt(t)',
        'Risk Adjusted Surplus: Net_Return - VaR_95'
      ],
      edgeCases: ['Sub-zero rates', 'Extreme volatility clamping', 'Float64 IEEE precision preservation']
    },
    legacyCodeSnippet: `' ====================================================================
' AEGIS CAPITAL RISK MANAGEMENT SYSTEM - BUILD 1998.10.31
' MODULE: modRiskEngine.bas (Visual Basic 6.0 Enterprise Edition)
' ====================================================================
Attribute VB_Name = "modRiskEngine"
Option Explicit

Public Function CalculateRiskSurplus( _
    ByVal curPrincipal As Currency, _
    ByVal dblRate As Double, _
    ByVal intYears As Integer, _
    ByVal dblVolatility As Double) As Currency

    Dim dblCompounded As Double
    Dim dblVaR95 As Double
    Dim dblSurplus As Double
    
    ' Standard quarterly compound interest
    dblCompounded = CDbl(curPrincipal) * ((1# + (dblRate / 400#)) ^ (4# * CDbl(intYears)))
    
    ' Basel I Parametric Value-at-Risk (Z = 1.645 at 95% Confidence)
    dblVaR95 = CDbl(curPrincipal) * 1.645 * (dblVolatility / 100#) * Sqr(CDbl(intYears))
    
    ' Surplus = Total Net Yield minus Capital at Risk
    dblSurplus = (dblCompounded - CDbl(curPrincipal)) - dblVaR95
    
    CalculateRiskSurplus = CCur(dblSurplus)
End Function`,
    modernCodeSnippet: `/**
 * Reincarnated via Kiro Spec Engine (.kiro/specs/core-engine.spec.md)
 * Target: TypeScript 5.8 / Float64 WebAssembly Math
 */
export interface RiskProjection {
  compoundedTotal: number;
  grossYield: number;
  valueAtRisk95: number;
  riskAdjustedSurplus: number;
  annualSchedule: Array<{ year: number; balance: number; varReserve: number }>;
}

export function calculateRiskSurplus(
  principal: number,
  annualRatePct: number,
  years: number,
  volatilityPct: number
): RiskProjection {
  const r = annualRatePct / 100;
  const n = 4; // Quarterly compounding
  const sigma = volatilityPct / 100;
  
  const compoundedTotal = principal * Math.pow(1 + r / n, n * years);
  const grossYield = compoundedTotal - principal;
  const valueAtRisk95 = principal * 1.645 * sigma * Math.sqrt(years);
  const riskAdjustedSurplus = grossYield - valueAtRisk95;

  const annualSchedule = Array.from({ length: years + 1 }, (_, y) => ({
    year: y,
    balance: Math.round(principal * Math.pow(1 + r / n, n * y)),
    varReserve: Math.round(principal * 1.645 * sigma * Math.sqrt(Math.max(1, y)))
  }));

  return {
    compoundedTotal,
    grossYield,
    valueAtRisk95,
    riskAdjustedSurplus,
    annualSchedule
  };
}`
  },

  'flash-orbit': {
    id: 'flash-orbit',
    name: 'Graviton N-Body Laboratory',
    era: 'Macromedia Flash MX',
    year: 2001,
    originalPlatform: 'Flash Player 6 NPAPI Plugin',
    originalStack: 'ActionScript 2.0 / Vector SWF Canvas',
    modernTargetStack: 'HTML5 Canvas 2D / 60 FPS RequestAnimationFrame Loop',
    tagline: 'Orbital Mechanics & Keplerian Trajectory Simulation with Escape Velocity',
    description: 'An interactive astrophysics simulator originally distributed across early 2000s web portals via standalone .swf embeds.',
    specsSummary: {
      inputs: ['Central Star Mass (M☉)', 'Orbital Radius (AU)', 'Velocity Vector (km/s)', 'Gravitational Constant (G)'],
      formulas: [
        'Gravitational Force: F = G * (M * m) / r^2',
        'Escape Velocity: V_esc = sqrt(2 * G * M / r)',
        'Kepler Period: T = 2 * PI * sqrt(r^3 / (G * M))'
      ],
      edgeCases: ['Singularity at r=0', 'Hyperbolic escape trajectories', 'Euler vs Verlet numerical integration']
    },
    legacyCodeSnippet: `// ====================================================================
// GRAVITON ORBITAL SIMULATOR - MACROMEDIA FLASH MX (2001)
// ACTIONSCRIPT 2.0 TIMELINE SCRIPT (Frame 1)
// ====================================================================
#include "Math.as"

var G:Number = 6.674;
var starMass:Number = 1000;
var planetX:Number = 120;
var planetY:Number = 0;
var vx:Number = 0;
var vy:Number = 7.45;

_root.createEmptyMovieClip("star_mc", 1);
_root.createEmptyMovieClip("planet_mc", 2);

_root.onEnterFrame = function() {
    var dx:Number = 0 - planetX;
    var dy:Number = 0 - planetY;
    var r:Number = Math.sqrt(dx*dx + dy*dy);
    
    if (r > 15) {
        var force:Number = (G * starMass) / (r * r);
        var ax:Number = force * (dx / r);
        var ay:Number = force * (dy / r);
        
        vx += ax * 0.1;
        vy += ay * 0.1;
        
        planetX += vx * 0.1;
        planetY += vy * 0.1;
    }
};`,
    modernCodeSnippet: `/**
 * Reincarnated via Kiro Spec Engine (.kiro/specs/core-engine.spec.md)
 * Target: High-precision Symplectic Integrator with Canvas particle trail
 */
export interface OrbitalMetrics {
  periodDays: number;
  escapeVelocityKmS: number;
  kineticEnergy: number;
  potentialEnergy: number;
  totalEnergy: number;
  isStableOrbit: boolean;
}

export function computeOrbitPhysics(
  starMass: number,
  radius: number,
  gravConstant: number
): OrbitalMetrics {
  const G = gravConstant * 0.1;
  const escapeVelocity = Math.sqrt((2 * G * starMass) / Math.max(1, radius));
  const period = 2 * Math.PI * Math.sqrt(Math.pow(radius, 3) / (G * starMass));
  const vCircular = Math.sqrt((G * starMass) / Math.max(1, radius));
  
  const kinetic = 0.5 * Math.pow(vCircular, 2);
  const potential = -(G * starMass) / Math.max(1, radius);
  const total = kinetic + potential;

  return {
    periodDays: Number((period * 10).toFixed(1)),
    escapeVelocityKmS: Number((escapeVelocity * 15).toFixed(2)),
    kineticEnergy: Number(kinetic.toFixed(2)),
    potentialEnergy: Number(potential.toFixed(2)),
    totalEnergy: Number(total.toFixed(2)),
    isStableOrbit: total < 0
  };
}`
  },

  'pascal-logistics': {
    id: 'pascal-logistics',
    name: 'Logix-87 Supply Chain Terminal',
    era: 'MS-DOS 3.3',
    year: 1987,
    originalPlatform: 'IBM PC/AT 80286 (640KB Real Mode)',
    originalStack: 'Borland Turbo Pascal 7.0 / CRT.TPU',
    modernTargetStack: 'Modern Reactive Supply Chain Intelligence & Heatmap',
    tagline: 'Economic Order Quantity (EOQ) & Stockout Risk Probability Engine',
    description: 'A 1987 manufacturing inventory optimization terminal originally operated by automotive supply warehouses over amber phosphor monitors.',
    specsSummary: {
      inputs: ['Annual Demand (Units)', 'Order Setup Cost ($)', 'Holding Cost/Unit ($)', 'Supplier Lead Time (Days)'],
      formulas: [
        'Wilson EOQ: sqrt((2 * D * S) / H)',
        'Reorder Point: (D / 365) * LeadTime + SafetyStock',
        'Annual Optimal Orders: D / EOQ'
      ],
      edgeCases: ['Zero holding cost division guard', 'Poisson demand uncertainty', 'Bulk quantity discount tiers']
    },
    legacyCodeSnippet: `(* ====================================================================
   LOGIX-87 INVENTORY CONTROLLER - TURBO PASCAL 7.0 (1987)
   COMPILED WITH BORLAND CRT.TPU FOR IBM PC COMPATIBLES
   ==================================================================== *)
PROGRAM Logix87;
USES Crt;

VAR
  AnnualDemand, OrderCost, HoldingCost: Real;
  LeadTimeDays: Integer;
  EOQ, ReorderPoint, AnnualOrders: Real;

FUNCTION ComputeEOQ(D, S, H: Real): Real;
BEGIN
  IF H <= 0 THEN ComputeEOQ := 0
  ELSE ComputeEOQ := Sqrt((2.0 * D * S) / H);
END;

BEGIN
  ClrScr;
  TextColor(Yellow);
  WriteLn('╔══════════════════════════════════════════════════╗');
  WriteLn('║ LOGIX-87 AUTOMATED SUPPLY CHAIN OPTIMIZER        ║');
  WriteLn('╚══════════════════════════════════════════════════╝');
  EOQ := ComputeEOQ(AnnualDemand, OrderCost, HoldingCost);
END.`,
    modernCodeSnippet: `/**
 * Reincarnated via Kiro Spec Engine (.kiro/specs/core-engine.spec.md)
 * Target: Event-Sourced Inventory Model with Dynamic Risk Heatmap
 */
export interface InventoryOptimization {
  economicOrderQuantity: number;
  reorderPointUnits: number;
  annualOrdersCount: number;
  totalAnnualCost: number;
  stockoutProbabilityPct: number;
}

export function computeInventoryOptimization(
  annualDemand: number,
  orderCost: number,
  holdingCost: number,
  leadTimeDays: number,
  serviceFactor: number = 1.65
): InventoryOptimization {
  const safeHolding = Math.max(0.1, holdingCost);
  const eoq = Math.sqrt((2 * annualDemand * orderCost) / safeHolding);
  const dailyDemand = annualDemand / 365;
  const leadTimeDemand = dailyDemand * leadTimeDays;
  const safetyStock = serviceFactor * Math.sqrt(leadTimeDays) * (dailyDemand * 0.25);
  const reorderPoint = leadTimeDemand + safetyStock;
  const ordersCount = annualDemand / Math.max(1, eoq);
  const totalCost = (ordersCount * orderCost) + ((eoq / 2) * safeHolding);

  return {
    economicOrderQuantity: Math.round(eoq),
    reorderPointUnits: Math.round(reorderPoint),
    annualOrdersCount: Number(ordersCount.toFixed(1)),
    totalAnnualCost: Math.round(totalCost),
    stockoutProbabilityPct: Number((100 - (serviceFactor >= 1.65 ? 95 : 85)).toFixed(1))
  };
}`
  }
};
