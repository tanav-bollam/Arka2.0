export type BoxParams = {
  length: number; // internal length (inches)
  width: number;  // internal width
  height: number; // internal height
  thickness: number; // material thickness
};

export type PanelType =
  | 'bottom'
  | 'side'
  | 'front'
  | 'back'
  | 'lid'
  | 'flap'
  | 'glue';

export type Panel = {
  id: string;
  type: PanelType;
  x: number;
  y: number;
  w: number;
  h: number;
  pivotX: number;
  pivotY: number;
  pivotAxis: 'x' | 'y';
  foldDirection: 1 | -1;
};
