import { ChartDimentions, CirlceInitials } from "./types";

export class CircleChart {
  dimentions: ChartDimentions;
  circleInitials: CirlceInitials[];

  constructor(
    width: number,
    height: number,
    data: InitialData[],
    circleInitials: CirlceInitials[]
  ) {
    this.dimentions = {
      w: width,
      h: height,
      cX: width / 2,
      cY: height / 2,
    };
    this.circleInitials = circleInitials;
    console.log("class", this);
  }

  getCircles() {
    return this.circleInitials.map((item) => ({
      chartDimentions: this.dimentions,
      bigCircle: {
        radius:
          (Math.min(this.dimentions.w, this.dimentions.h) * item.diametr) / 2,
        color: item.color,
      },
      dots: [],
    }));
  }
}
