// export const DotType = {
//   innerDot: "innerDot",
//   outerDot: "outerDot",
// } as const;

export interface CirlceInitial {
  diametr: number;
  color: string;
  dotsColor: string;
  activeDotsColor: string;
  dotsDiametrs: number;
  borderThickness: number;
  zIndex: number;
}

// export type TDotType = keyof typeof DotType;

export interface Dot {
  // type: TDotType;
  name: string;
  diametr: number;

  color: string;
  colorActive: string;
  x: number;
  y: number;
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
  borderThickness: number;
  zIndex: number;
}

export interface Circle {
  chartDimentions: ChartDimentions;
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
  setSelected: (circleIndex: number, dotIndex: number) => void;
  clearSelected: () => void;
};

export interface ISelected {
  circleIndex: number | null;
  dotIndex: number | null;
}
