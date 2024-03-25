import { ChartDimentions, Dot, InitialData } from "./types";
import { CirlceInitial } from "@/types";

export class CircleChart {
  dimentions: ChartDimentions;
  circleInitials: CirlceInitial[];
  data: InitialData[];
  skills: string[];
  competence: string[];

  constructor(
    width: number,
    height: number,
    data: InitialData[],
    circleInitials: CirlceInitial[]
  ) {
    this.dimentions = {
      w: width,
      h: height,
      cX: width / 2,
      cY: height / 2,
    };
    this.circleInitials = circleInitials;
    this.data = data;
    this.skills = Array.from(
      new Set(
        data.map((item) => [...item.mainSkills, ...item.otherSkills]).flat()
      )
    );
    this.competence = data.map((item) => item.name);
  }

  getCircles() {
    return this.circleInitials.map((item, index) => ({
      bigCircle: {
        radius:
          (Math.min(this.dimentions.w, this.dimentions.h) * item.diametr) / 2,
        color: item.color,
        borderWidth: item.borderWidth,
        zIndex: item.zIndex,
        left:
          this.dimentions.cX -
          (Math.min(this.dimentions.w, this.dimentions.h) * item.diametr) / 2,
        top:
          this.dimentions.cY -
          (Math.min(this.dimentions.w, this.dimentions.h) * item.diametr) / 2,
      },
      dots: this.getDots(index),
    }));
  }

  getDots(index: number): Dot[] {
    const k = 180 / Math.PI;
    const arr = index ? this.skills : this.competence;
    const initials = this.circleInitials[index];

    const gap = 360 / arr.length;
    const radius =
      (Math.min(this.dimentions.w, this.dimentions.h) * initials.diametr) / 2 +
      initials.borderWidth / 2;

    return arr.map((item, index) => ({
      name: item,
      diametr: initials.dotsDiametrs,
      color: initials.dotsColor,
      colorActive: initials.activeDotsColor,
      x: radius * Math.cos((gap * index - 90) / k),
      y: radius * Math.sin((gap * index - 90) / k),
    }));
  }
}
