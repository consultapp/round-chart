import { Circle, TUIContext } from "@/types";
import styles from "./styles.module.scss";
import { useCallback, useContext } from "react";
import classNames from "classnames";
import UIContext from "@/UIContext";
import DotLabel from "../DotLabel/DotLabel";

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

  if (!circle && !context) return <div key={`big${index}`}></div>;

  const { setSelected, clearSelected } = context as TUIContext;
  const { bigCircle, dots } = circle;
  const { radius, color, borderWidth, zIndex, left, top } = bigCircle;

  return (
    <div
      key={`big${index}`}
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
      onClick={() => clearSelected()}
    >
      {dots.map((item, i) => {
        return (
          <>
            <div
              key={`dot${i}`}
              style={{
                width: item.diametr + (checkIsSelected(i) ? 10 : 0),
                height: item.diametr + (checkIsSelected(i) ? 10 : 0),
                left: item.x - (checkIsSelected(i) ? 5 : 0),
                top: item.y - (checkIsSelected(i) ? 5 : 0),
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
            <DotLabel label={item.label} />
          </>
        );
      })}
    </div>
  );
}
