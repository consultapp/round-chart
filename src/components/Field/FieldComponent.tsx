import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import CircleWithDots from "../CircleWithDots/CircleWithDots";
import { CirlceInitial } from "@/types";
import { CircleChart } from "@/CircleChart";
import { DATA } from "../../DATA";

const circleInitials: CirlceInitial[] = [
  {
    diametr: 0.4,
    color: "gray",
    dotsColor: "gray",
    activeDotsColor: "green",
    dotsDiamets: 10,
    zIndex: 1,
  },
  {
    diametr: 0.8,
    color: "lightcoral",
    dotsColor: "lightcoral",
    activeDotsColor: "orange",
    dotsDiamets: 10,
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
