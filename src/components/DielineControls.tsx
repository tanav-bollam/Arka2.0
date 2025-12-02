'use client';

import React from 'react';
import { BoxParams } from '@/lib/types';

type Props = {
  params: BoxParams;
  onChange: (p: BoxParams) => void;
  foldProgress: number;
  onFoldChange: (v: number) => void;
};

export const DielineControls: React.FC<Props> = ({
  params,
  onChange,
  foldProgress,
  onFoldChange,
}) => {
  const updateField = (field: keyof BoxParams, value: string) => {
    const num = parseFloat(value) || 0;
    onChange({ ...params, [field]: num });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Length (in)</label>
        <input
          type="number"
          step="0.01"
          value={params.length}
          onChange={(e) => updateField('length', e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Width (in)</label>
        <input
          type="number"
          step="0.01"
          value={params.width}
          onChange={(e) => updateField('width', e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Height (in)</label>
        <input
          type="number"
          step="0.01"
          value={params.height}
          onChange={(e) => updateField('height', e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Thickness (in)</label>
        <input
          type="number"
          step="0.001"
          value={params.thickness}
          onChange={(e) => updateField('thickness', e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Fold Progress ({Math.round(foldProgress * 100)}%)
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={foldProgress}
          onChange={(e) => onFoldChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};
