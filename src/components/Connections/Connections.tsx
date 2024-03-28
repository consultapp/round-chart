import { ChartDimentions, Dot } from "@/types";
import styles from "./styles.module.scss";

type Props = {
  connections:
    | { startDot: Dot; endDot: Dot; type?: boolean | "main" | "other" }[];
  dimentions: ChartDimentions | null;
};

export default function Connections({ connections, dimentions }: Props) {
  console.log("connections", connections);
  if (!connections || !connections.length || !dimentions) return;
  const paths = connections.map((connection) => {
    const { startDot, endDot, type } = connection;
    const x1 = startDot.x + (startDot?.normX ?? 0) + startDot.diametr / 2;
    const y1 = startDot.y + (startDot?.normY ?? 0) + startDot.diametr / 2;
    const x2 = endDot.x + (endDot?.normX ?? 0) + endDot.diametr / 2;
    const y2 = endDot.y + (endDot?.normY ?? 0) + endDot.diametr / 2;

    return (
      <g
        fill="none"
        stroke={(type ?? "main") === "main" ? "blue" : "green"}
        stroke-width="2"
        marker-end="url(#arrowhead)"
      >
        <path d={"M" + x1 + " " + y1 + " " + "L" + x2 + " " + y2} />
        <circle cx={x1} cy={y1} r="4" />
      </g>
    );
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimentions.w}
      height={dimentions.h}
      className={styles.root}
    >
      {paths}
    </svg>
  );
}
