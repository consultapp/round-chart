export const DotType = {
  innerDot: "innerDot",
  outerDot: "outerDot",
} as const;

export interface CirlceInitial {
  diametr: number;
  color: string;
  dotsColor: string;
  activeDotsColor: string;
  dotsDiamets: number;
  zIndex: number;
}

export type TDotType = keyof typeof DotType;

export interface Dot {
  type: TDotType;
  name: string;
  diametr: number;
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
