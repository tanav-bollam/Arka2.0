'use client';

import React from 'react';
import { BoxParams } from '@/lib/types';
import { buildDielineSVG } from '@/lib/dieline';

type Props = {
  params: BoxParams;
};

export const DielineSVG: React.FC<Props> = ({ params }) => {
  const svgMarkup = buildDielineSVG(params);

  return (
    <div className="border rounded-md bg-white p-2 w-full h-full overflow-auto">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    </div>
  );
};
