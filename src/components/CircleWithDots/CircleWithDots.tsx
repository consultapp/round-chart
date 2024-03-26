import { Circle } from "@/types";
import styles from "./styles.module.scss";
import { useContext } from "react";
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

  if (!circle && !context) return <div key={`big${index}`}></div>;

  const { setSelected, clearSelected } = context;
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
      onClick={() => clearSelected && clearSelected()}
    >
      {dots.map((item, i) => {
        return (
          <>
            <DotComponent
              dot={item}
              selectDot={() => setSelected && setSelected(index, i)}
            />
            <DotLabel label={item.label} />
          </>
        );
      })}
    </div>
  );
}
