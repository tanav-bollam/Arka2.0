# Arka2.0 Dieline Generator (Next.js)

A rebuild of the dieline + 3D preview prototype using a small Next.js app. It computes a flip-top mailer dieline from Length/Width/Height/Thickness inputs, renders a labeled SVG, and shows a synced Three.js folding preview.

## Features
- Parameterized dieline math (outer dims derived from inputs) rendered as layered SVG cut/crease lines.
- Three.js folding preview that rotates panels around crease pivots with a fold slider.
- Downloadable SVG export that uses the same geometry as the on-screen dieline.
- Minimal utility CSS to style the control panel and previews without extra frameworks.

## Getting started
1. Install dependencies (Node 18+ recommended):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to use the generator. Adjust dimensions and the fold slider to see the SVG and 3D preview update, or click **Download SVG dieline** to save the vector output.

> If you prefer a static export, run `npm run build` then `npm run start` for a production server.

## Testing and validation
- Lint the project: `npm run lint`
- Build the production bundle: `npm run build`

> Note: Dependency installation requires access to the npm registry. If you encounter HTTP 403 errors when running `npm install`, verify proxy/network settings or try again from an environment with unrestricted registry access.
