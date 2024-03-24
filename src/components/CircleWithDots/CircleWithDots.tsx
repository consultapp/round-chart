import { Circle } from "@/types";
import styles from "./styles.module.scss";
import { useState } from "react";
import classNames from "classnames";

export default function CircleWithDots({
  circle,
  index,
}: {
  circle: Circle;
  index: number;
}) {
  const [state, setState] = useState<number | null>(null);

  if (!circle) return <></>;

  console.log("index, circle", index, circle);

  const { chartDimentions, bigCircle, dots } = circle;
  const { cX, cY } = chartDimentions;
  const { radius, color, borderThickness, zIndex } = bigCircle;

  return (
    <div
      className={styles.root}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: cX - radius,
        top: cY - radius,
        borderColor: color,
        borderWidth: borderThickness,
        zIndex,
      }}
    >
      {dots.map((item, index) => (
        <div
          key={index}
          style={{
            width: item.diametr + (state === index ? 10 : 0),
            height: item.diametr + (state === index ? 10 : 0),
            left:
              radius - item.diametr / 2 + item.x - (state === index ? 5 : 0),
            top: radius - item.diametr / 2 + item.y - (state === index ? 5 : 0),
            backgroundColor: item.color,
            borderColor: item.colorActive,
          }}
          className={classNames(styles.dot, state === index && styles.active)}
          onClick={() => {
            console.log("state", state);
            setState(index);
          }}
        >
          <div
            style={{
              width: item.diametr,
              height: item.diametr,
              backgroundColor: item.colorActive,
            }}
            className={styles.activeCenter}
          ></div>
        </div>
      ))}
    </div>
  );
}
