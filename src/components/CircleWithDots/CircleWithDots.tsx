import { Circle } from "@/types";
import styles from "./styles.module.scss";

export default function CircleWithDots({
  circle,
  index,
}: {
  circle: Circle;
  index: number;
}) {
  if (!circle) return <></>;

  console.log("index, circle", index, circle);

  const { chartDimentions, bigCircle, dots } = circle;
  const { cX, cY } = chartDimentions;
  const { radius, color } = bigCircle;

  return (
    <div
      className={styles.root}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: cX - radius,
        top: cY - radius,
        borderColor: color,
      }}
    ></div>
  );
}
