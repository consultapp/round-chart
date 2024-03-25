import { Circle, TUIContext } from "@/types";
import styles from "./styles.module.scss";
import { useCallback, useContext } from "react";
import classNames from "classnames";
import UIContext from "@/UIContext";

export default function CircleWithDots({
  circle,
  index,
}: {
  circle: Circle;
  index: number;
}) {
  const context = useContext(UIContext);

  const checkIsSelected = useCallback(
    (dotIndex: number) => {
      if (context && context.selected)
        return (
          context.selected.dotIndex === dotIndex &&
          context.selected.circleIndex === index
        );
    },
    [context, index]
  );

  if (!circle && !context) return <></>;

  const { setSelected, clearSelected } = context as TUIContext;

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
      onClick={() => clearSelected()}
    >
      {dots.map((item, i) => (
        <div
          key={i}
          style={{
            width: item.diametr + (checkIsSelected(i) ? 10 : 0),
            height: item.diametr + (checkIsSelected(i) ? 10 : 0),
            left:
              radius - item.diametr / 2 + item.x - (checkIsSelected(i) ? 5 : 0),
            top:
              radius - item.diametr / 2 + item.y - (checkIsSelected(i) ? 5 : 0),
            backgroundColor: item.color,
            borderColor: item.colorActive,
          }}
          className={classNames(
            styles.dot,
            checkIsSelected(i) && styles.active
          )}
          onClick={(e) => {
            e.stopPropagation();
            setSelected(index, i);
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
