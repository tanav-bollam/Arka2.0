import { BoxParams, Panel } from './types';

const INCH_TO_PX = 96;

export function computePanels(params: BoxParams): Panel[] {
  const { length: L, width: W, height: H, thickness: T } = params;

  const Lo = L + 2 * T;
  const Wo = W + 2 * T;
  const Ho = H + T;

  const panels: Panel[] = [];

  panels.push({
    id: 'bottom',
    type: 'bottom',
    x: 0,
    y: 0,
    w: Lo,
    h: Wo,
    pivotX: 0,
    pivotY: 0,
    pivotAxis: 'x',
    foldDirection: 1,
  });

  panels.push({
    id: 'side-left',
    type: 'side',
    x: -Ho,
    y: 0,
    w: Ho,
    h: Wo,
    pivotX: 0,
    pivotY: 0,
    pivotAxis: 'y',
    foldDirection: 1,
  });

  panels.push({
    id: 'side-right',
    type: 'side',
    x: Lo,
    y: 0,
    w: Ho,
    h: Wo,
    pivotX: Lo,
    pivotY: 0,
    pivotAxis: 'y',
    foldDirection: -1,
  });

  panels.push({
    id: 'back',
    type: 'back',
    x: 0,
    y: Wo,
    w: Lo,
    h: Ho,
    pivotX: 0,
    pivotY: Wo,
    pivotAxis: 'x',
    foldDirection: -1,
  });

  panels.push({
    id: 'front',
    type: 'front',
    x: 0,
    y: -Ho,
    w: Lo,
    h: Ho,
    pivotX: 0,
    pivotY: 0,
    pivotAxis: 'x',
    foldDirection: 1,
  });

  panels.push({
    id: 'lid',
    type: 'lid',
    x: 0,
    y: Wo + Ho,
    w: Lo,
    h: Wo,
    pivotX: 0,
    pivotY: Wo + Ho,
    pivotAxis: 'x',
    foldDirection: -1,
  });

  panels.push({
    id: 'glue',
    type: 'glue',
    x: -0.75,
    y: -Ho,
    w: 0.75,
    h: Wo + 2 * Ho,
    pivotX: 0,
    pivotY: -Ho,
    pivotAxis: 'y',
    foldDirection: 1,
  });

  return panels;
}

function rectPath(x: number, y: number, w: number, h: number): string {
  const x0 = x * INCH_TO_PX;
  const y0 = -y * INCH_TO_PX;
  const x1 = (x + w) * INCH_TO_PX;
  const y1 = -(y + h) * INCH_TO_PX;
  return `M ${x0} ${y0} L ${x1} ${y0} L ${x1} ${y1} L ${x0} ${y1} Z`;
}

export function buildDielineSVG(params: BoxParams): string {
  const panels = computePanels(params);

  const margin = 2 * INCH_TO_PX;
  const allXs = panels.flatMap((p) => [p.x, p.x + p.w]);
  const allYs = panels.flatMap((p) => [p.y, p.y + p.h]);

  const minX = Math.min(...allXs) * INCH_TO_PX - margin;
  const maxX = Math.max(...allXs) * INCH_TO_PX + margin;
  const minY = -Math.max(...allYs) * INCH_TO_PX - margin;
  const maxY = -Math.min(...allYs) * INCH_TO_PX + margin;
  const width = maxX - minX;
  const height = maxY - minY;

  const paths = panels.map((p) => {
    const cls =
      p.type === 'bottom' || p.type === 'side' || p.type === 'front' || p.type === 'back' || p.type === 'lid'
        ? 'cut'
        : 'crease';
    return `<path class="${cls}" d="${rectPath(p.x, p.y, p.w, p.h)}" />`;
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="${minX} ${minY} ${width} ${height}">
  <style>
    .cut { stroke: #00aa00; stroke-width: 2; fill: none; }
    .crease { stroke: #ff0000; stroke-dasharray: 6 4; fill: none; }
  </style>
  ${paths.join('\n')}
</svg>`;
}
