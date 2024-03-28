import { Circle } from "@/types";
import styles from "./styles.module.scss";
import React, { useContext, useId } from "react";
import UIContext from "@/UIContext";
import DotLabel from "../DotLabel/DotLabel";
import DotComponent from "../DotComponent/DotComponent";

export default function CircleWithDots({
  circle,
  index,
}: {
  circle: Circle;
  index: number;
}) {
  const context = useContext(UIContext);
  const id = useId();

  if (!circle && !context) return;

  const { setSelected, clearSelected } = context;
  const { bigCircle, dots } = circle;
  const { radius, color, borderWidth, zIndex, left, top } = bigCircle;

  return (
    <div
      key={id}
      className={styles.root}
      style={{
        width: radius * 2,
        height: radius * 2,
        left,
        top,
        borderColor: color,
        borderWidth: borderWidth,
        zIndex,
      }}
      onClick={() => clearSelected && clearSelected()}
    >
      {dots.map((item, i) => {
        return (
          <React.Fragment key={`React.Fragment ${i}`}>
            <DotComponent
              dot={item}
              selectDot={() => setSelected && setSelected(index, i)}
            />
            <DotLabel label={item.label} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
