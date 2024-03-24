import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import CircleWithDots from "../CircleWithDots/CircleWithDots";
import { CirlceInitial } from "@/types";
import { CircleChart } from "@/CircleChart";
import { DATA } from "../../DATA";

const circleInitials: CirlceInitial[] = [
  {
    diametr: 0.4,
    color: "#ADADAD",
    borderThickness: 2.35,

    dotsColor: "#ADADAD",
    activeDotsColor: "#00A372",
    dotsDiametrs: 23.7,
    zIndex: 2,
  },
  {
    diametr: 0.8,
    borderThickness: 2.35,
    color: "#ADADAD",

    dotsColor: "#FFD4AD",
    activeDotsColor: "#FF7A00",
    dotsDiametrs: 27.53,
    zIndex: 1,
  },
];

export default function FieldComponent() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [circleChart, setCircleChart] = useState<CircleChart | null>(null);

  useEffect(() => {
    console.log("useEffect1");
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect)
        setCircleChart(
          new CircleChart(rect.width, rect.height, DATA, circleInitials)
        );
    }
  }, []);

  const circles = circleChart ? circleChart.getCircles() : [];

  console.log("circles", circles);

  return (
    <div className={styles.root} ref={ref}>
      {circles.map((item, index) => (
        <CircleWithDots circle={item} index={index} key={index} />
      ))}
    </div>
  );
}
