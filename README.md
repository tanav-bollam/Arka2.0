# Arka2.0 Dieline Demo

A single-page dieline generator demo with interactive dimensions, features, and a CSS-only 3D preview.

## Run locally
1. Ensure you have Python 3 installed.
2. From the project root, start a simple web server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser to http://localhost:8000 and load `index.html`.

## Basic usage
- Adjust width, depth, height, and board thickness to redraw the dieline and 3D preview.
- Toggle optional features (window, handle, dust flaps) and orientation to see updates.
- Use **Download dieline (SVG)** or **Export PNG** to save the current layout.
- Double-click the SVG canvas to recenter the view; **Reset** restores defaults.
