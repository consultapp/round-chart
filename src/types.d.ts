export interface CirlceInitial {
  diametr: number;
  color: string;
  dotsColor: string;
  activeDotsColor: string;
  dotsDiametrs: number;
  borderWidth: number;
  zIndex: number;
}

export interface Dot {
  diametr: number;
  color: string;
  colorActive: string;
  x: number;
  y: number;
  label: ILablel;
  normX?: number;
  normY?: number;

  isSelected?: boolean;
  isActive?: "main" | "other" | boolean;
}

export interface ILabel {
  name: string;
  x: number;
  y: number;
  adjustX?: "left" | "right" | "center";
  adjustY?: "top" | "bottom" | "center";
}

export interface ChartDimentions {
  w: number;
  h: number;
  cX: number;
  cY: number;
}

interface BigCircle {
  radius: number;
  color: string;
  borderWidth: number;
  zIndex: number;
  left: number;
  top: number;
}

export interface Circle {
  bigCircle: BigCircle;
  dots: Dot[];
}

export interface InitialData {
  name: string;
  mainSkills: string[];
  otherSkills: string[];
}

export type TUIContext = {
  selected: ISelected;
  setSelected?: (circleIndex: number, dotIndex: number) => void;
  clearSelected?: () => void;
};

export interface ISelected {
  circleIndex: number | null;
  dotIndex: number | null;
}
