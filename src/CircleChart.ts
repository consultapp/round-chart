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
        radius: this.getBigCircleRadius(index),
        color: item.color,
        borderWidth: item.borderWidth,
        zIndex: item.zIndex,
        left: this.dimentions.cX - this.getBigCircleRadius(index),
        top: this.dimentions.cY - this.getBigCircleRadius(index),
      },
      dots: this.getDots(index),
    }));
  }

  getDots(index: number): Dot[] {
    const k = 180 / Math.PI;
    const arr = index ? this.skills : this.competence;
    const initials = this.circleInitials[index];
    const bigCircleRadius = this.getBigCircleRadius(index);

    const nameShift = 30;
    const gap = 360 / arr.length;

    return arr.map((name, index) => {
      const cos = Math.cos((gap * index + 90) / k);
      const sin = Math.sin((gap * index + 90) / k);
      return {
        diametr: initials.dotsDiametrs,
        color: initials.dotsColor,
        colorActive: initials.activeDotsColor,
        cos,
        sin,
        x:
          bigCircleRadius - (bigCircleRadius * cos + initials.dotsDiametrs / 2),
        y:
          bigCircleRadius - (bigCircleRadius * sin + initials.dotsDiametrs / 2),
        label: {
          name: name,
          x: bigCircleRadius - (bigCircleRadius + nameShift) * cos,
          y: bigCircleRadius - (bigCircleRadius + nameShift) * sin,
          adjustX:
            Math.round(cos * 100) / 100 > 0
              ? "right"
              : Math.round(cos * 100) / 100 === 0
              ? "center"
              : "left",
          adjustY:
            Math.floor(sin * 10) / 10 > 0
              ? "bottom"
              : Math.floor(sin * 10) / 10 === 0
              ? "center"
              : "top",
          cos,
          sin,
          // Math.abs(sin) === 1 ? "center" :
        },
      };
    });
  }

  getBigCircleDiametr(index: number) {
    return (
      Math.min(this.dimentions.w, this.dimentions.h) *
      this.circleInitials[index].diametr
    );
  }

  getBigCircleRadius(index: number) {
    return this.getBigCircleDiametr(index) / 2;
  }
}
