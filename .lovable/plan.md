

## Plan: Vibrant Theme + AR Camera Food Preview

### 1. Make the Theme More Vibrant with a Lighter Background

Update `src/index.css` to brighten the overall palette:
- Lighten `--background` from `240 12% 12%` to around `220 15% 18%`
- Lighten `--card`, `--secondary`, `--muted` proportionally
- Boost `--primary` saturation for a more vivid emerald
- Make `--accent` (hot pink) punchier
- Add a new `--cyan` glow color for extra color pops
- Lighten borders and inputs for a more open feel
- Add new utility classes: `glow-cyan`, `text-gradient-cyan`

### 2. Redesign the QR-to-Camera AR Food Experience

Replace the current `FoodPreview.tsx` section with a simulated AR camera flow:

- **Step 1 - QR Code**: Show an animated QR code with a "Scan Me" prompt
- **Step 2 - Camera View**: When user clicks "Scan QR" (or taps the QR), transition to a simulated camera viewfinder showing a table/restaurant background image with the 3D dish model overlaid on it
- **Step 3 - AR Overlay**: The 3D model sits on the "table" with:
  - AR corner brackets framing the dish
  - A scanning animation line sweeping across
  - Portion size indicator (e.g., a ruler/scale reference next to the dish)
  - Rotate/zoom controls
  - Dish name and portion info overlay

### 3. Update the Menu Catalog to Link to AR View

Modify `MenuCatalog.tsx` so that when a user clicks "View in full 3D" on a dish card, instead of a simple modal, it opens an **AR Camera Simulation** modal:
- Full-screen dark overlay simulating a phone camera
- Background shows a table/restaurant scene image
- The 3D dish model is rendered on top, appearing to sit on the table
- AR UI overlays: corner brackets, portion size label (e.g., "Serves 1-2", diameter indicator), scanning animation
- Controls to rotate and zoom the dish
- A "Back to Menu" button

### 4. Add a New Route for Direct QR Access

Create a new page `src/pages/ARPreview.tsx`:
- Accepts a dish ID as a URL parameter (e.g., `/ar-preview/1`)
- Shows the full AR camera simulation for that specific dish
- This is what the QR code would link to in a real restaurant scenario

Update `App.tsx` to add the `/ar-preview/:dishId` route.

### 5. Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Lighten background, boost color vibrancy, add new glow utilities |
| `src/components/FoodPreview.tsx` | Rebuild as QR-scan-to-AR-camera demo flow with step animation |
| `src/components/MenuCatalog.tsx` | Replace modal with AR camera simulation view, add portion size info |
| `src/pages/ARPreview.tsx` | New page for direct QR-linked AR preview |
| `src/App.tsx` | Add `/ar-preview/:dishId` route |
| `src/components/HeroSection.tsx` | Update orb colors to match new vibrant palette |

### Technical Details

- The AR camera simulation will use a restaurant/table background image with a CSS gradient overlay to simulate a live camera feed
- The 3D model from `@react-three/fiber` will be rendered on top with a transparent canvas background
- Portion size will be shown via a visual scale indicator (plate diameter label, serving size badge)
- The QR-to-camera transition will use Framer Motion `AnimatePresence` for a smooth state change
- AR corner brackets and scan-line animation (already in CSS) will be reused for the camera viewfinder effect
- Each menu item will get additional fields: `servingSize`, `plateDiameter` for portion context
