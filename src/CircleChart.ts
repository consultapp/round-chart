import { ChartDimentions, Dot, ISelected, InitialData } from "./types";
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

  getCircles(selected: ISelected) {
    return this.circleInitials.map((item, index) => ({
      bigCircle: {
        radius: this.getBigCircleRadius(index),
        color: item.color,
        borderWidth: item.borderWidth,
        zIndex: item.zIndex,
        left: this.dimentions.cX - this.getBigCircleRadius(index),
        top: this.dimentions.cY - this.getBigCircleRadius(index),
      },
      dots: this.getDots(index, selected),
    }));
  }

  centerSkillsFrontToFirstCompetence(index: number) {
    if (index === 0) return 0;
    const skillCount =
      this.data[1].mainSkills.length + this.data[1].otherSkills.length;
    const gap = 360 / this.skills.length;

    return -(skillCount / 3) * gap;
  }

  getDots(circleIndex: number, selected: ISelected): Dot[] {
    const k = 180 / Math.PI;
    const arr = circleIndex ? this.skills : this.competence;
    const initials = this.circleInitials[circleIndex];
    const bigCircleRadius = this.getBigCircleRadius(circleIndex);

    const nameShift = 30;
    const gap = 360 / arr.length;

    return arr.map((name, index) => {
      const cos = Math.cos(
        (gap * index +
          90 +
          this.centerSkillsFrontToFirstCompetence(circleIndex)) /
          k
      );
      const sin = Math.sin(
        (gap * index +
          90 +
          this.centerSkillsFrontToFirstCompetence(circleIndex)) /
          k
      );
      return {
        diametr: initials.dotsDiametrs,
        color: initials.dotsColor,
        colorActive: initials.activeDotsColor,
        isSelected:
          circleIndex === selected.circleIndex && index === selected.dotIndex,
        isActive: this.checkDotIsActive(selected, circleIndex, index),
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

  checkDotIsActive(selected: ISelected, circleIndex: number, dotIndex: number) {
    if (selected.circleIndex === null || circleIndex === selected.circleIndex)
      return false;

    if (circleIndex === 1) {
      const selectedCompetence = this.competence[selected.dotIndex ?? 0];
      const [filtered] = this.data.filter(
        (item) => item.name === selectedCompetence
      );
      if (filtered) {
        if (filtered.mainSkills.includes(this.skills[dotIndex])) {
          return "main";
        }
        if (filtered.otherSkills.includes(this.skills[dotIndex])) {
          return "other";
        }
      }
    }
    if (circleIndex === 0) {
      const selectedSkill = this.skills[selected.dotIndex ?? 0];
      const competencesArrMain = this.data.filter((item) =>
        item.mainSkills.includes(selectedSkill)
      );
      const competencesMain = competencesArrMain.map((item) => item.name);
      if (competencesMain.includes(this.competence[dotIndex])) return "main";

      const competencesArrOther = this.data.filter((item) =>
        item.otherSkills.includes(selectedSkill)
      );
      const competencesOther = competencesArrOther.map((item) => item.name);
      if (competencesOther.includes(this.competence[dotIndex])) return "other";
    }

    return false;
  }

  getConnections(selected: ISelected | null) {
    if (!selected) return null;

    const circles = this.getCircles(selected);
    const startDots: Dot[] = [];
    const endDots: Dot[] = [];
    circles.forEach((circle) => {
      circle.dots.forEach((dot) => {
        if (dot.isActive)
          endDots.push({
            ...dot,
            normX: circle.bigCircle.left,
            normY: circle.bigCircle.top,
          });
        if (dot.isSelected)
          startDots.push({
            ...dot,
            normX: circle.bigCircle.left,
            normY: circle.bigCircle.top,
          });
      });
    });

    if (!startDots.length || !endDots.length) return null;
    const [startDot] = startDots;
    return endDots.map((item) => ({
      startDot,
      endDot: item,
      type: item.isActive,
    }));
  }
}
