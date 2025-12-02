'use client';

import React, { useState } from 'react';
import { BoxParams } from '@/lib/types';
import { DielineControls } from '@/components/DielineControls';
import { DielineSVG } from '@/components/DielineSVG';
import { Box3DPreview } from '@/components/Box3DPreview';
import { downloadSVG } from '@/lib/export';

const defaultParams: BoxParams = {
  length: 12.4016,
  width: 7.9528,
  height: 2.4409,
  thickness: 0.06,
};

export default function HomePage() {
  const [params, setParams] = useState<BoxParams>(defaultParams);
  const [foldProgress, setFoldProgress] = useState(0);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Custom Mailer Dieline Generator</h1>
          <div className="status-pill bg-yellow-100 text-gray-600">
            <span role="img" aria-label="beta">
              ⚡
            </span>
            Interactive prototype
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-4 space-y-4">
            <DielineControls
              params={params}
              onChange={setParams}
              foldProgress={foldProgress}
              onFoldChange={setFoldProgress}
            />
            <button
              onClick={() => downloadSVG(params)}
              className="w-full mt-2 rounded bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700"
            >
              Download SVG dieline
            </button>
            <small>
              Use the slider to fold from a flat dieline (0%) to a closed box (100%).
              The 2D plan and 3D preview stay in sync.
            </small>
          </div>

          <div className="md:col-span-1 h-[420px]">
            <h2 className="text-sm font-medium mb-1">2D Dieline</h2>
            <DielineSVG params={params} />
          </div>

          <div className="md:col-span-1 h-[420px]">
            <h2 className="text-sm font-medium mb-1">3D Preview</h2>
            <Box3DPreview params={params} foldProgress={foldProgress} />
          </div>
        </div>
      </div>
    </main>
  );
}
