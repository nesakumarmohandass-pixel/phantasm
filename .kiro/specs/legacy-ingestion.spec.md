# Spec: Legacy Ingestion & AST Decompilation
**Module:** `src/core/decompiler`  
**Status:** Active  

## 1. Supported Legacy Dialects
1. **Visual Basic 6.0 (`.frm`, `.bas`, `.vbp`)**:
   - Parses form definitions (`Begin VB.Form`, `Begin VB.CommandButton`, `Begin VB.TextBox`).
   - Extracts procedural event handlers (`Sub Form_Load()`, `Sub cmdCalculate_Click()`).
   - Translates COM data types (`Currency`, `Double`, `Integer`) to TypeScript strict types.

2. **Macromedia Flash / ActionScript 2.0 (`.as`, `.fla`)**:
   - Parses timeline keyframes, `onClipEvent(enterFrame)` loops, vector drawing commands (`lineTo`, `curveTo`).
   - Translates frame-based physics to high-refresh `requestAnimationFrame` Canvas/WebGPU loops.

3. **Turbo Pascal 7.0 / MS-DOS ANSI (`.pas`)**:
   - Extracts `PROGRAM`, `VAR`, `PROCEDURE`, and `RECORD` structures.
   - Emulates 80x25 character-cell memory buffers into accessible ANSI terminals.

## 2. Extraction Pipeline
```
Raw Legacy Source / Preset
    │
    ▼
Regex & Token Scanner (TokenStream)
    │
    ▼
AST Extraction (Abstract Syntax Tree)
    │
    ▼
Semantic Logic Graph (State + Mathematical Formulas)
    │
    ▼
Kiro Spec Synthesis (.kiro/specs/)
    │
    ▼
Modern React 19 Component + Hooks Code
```
