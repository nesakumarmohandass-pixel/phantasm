# Spec: Lockstep Dual-State Event Mirror
**Module:** `src/core/bridge`  
**Status:** Active  

## 1. Synchronization Architecture
The Lockstep Mirror provides bidirectional state synchronization between the simulated legacy environment and the modern React application:

1. **Legacy-to-Modern Propagation (`L -> M`)**:
   - User inputs in the retro UI (e.g. typing in a Win98 text box or moving a Flash slider).
   - The Bridge captures the DOM event, maps the legacy control ID to modern state, and updates the modern state.
   - Triggers re-render in Modern Viewport in <5ms.

2. **Modern-to-Legacy Propagation (`M -> L`)**:
   - User interacts with modern responsive controls (e.g. Tailwind range sliders, modern numeric inputs).
   - The Bridge serializes the state change back to the legacy memory model.
   - The retro UI updates its simulated controls synchronously.

3. **Chaos Injection & Anomaly Sentinel**:
   - Users can trigger a "Mutate / Drift" event to simulate an intentional calculation bug (e.g., floating-point rounding error in modern migration).
   - The Parity Sentinel flags the divergence, turns the UI into an alert state, and invokes the Kiro Auto-Heal Agent to regenerate the fix.
