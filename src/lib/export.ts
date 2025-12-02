import { BoxParams } from './types';
import { buildDielineSVG } from './dieline';

export function downloadSVG(params: BoxParams) {
  const svg = buildDielineSVG(params);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dieline.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
