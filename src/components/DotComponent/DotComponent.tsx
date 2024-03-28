import { Dot } from "@/types";
import classNames from "classnames";
import styles from "./styles.module.scss";

type Props = {
  dot: Dot;

  selectDot: () => void;
};

export default function DotComponent({
  dot,

  selectDot,
}: Props) {
  return (
    <div
      style={{
        width: dot.diametr + 10,
        height: dot.diametr + 10,
        left: dot.x - 5,
        top: dot.y - 5,
        borderColor: dot.isSelected ? dot.colorActive : "",
      }}
      className={classNames(styles.root, dot.isSelected && styles.selected)}
      onClick={(e) => {
        e.stopPropagation();
        selectDot();
      }}
    >
      <div
        style={{
          width: dot.diametr,
          height: dot.diametr,
          backgroundColor:
            dot.isSelected || dot.isActive ? dot.colorActive : dot.color,
        }}
        className={styles.activeCenter}
      ></div>
    </div>
  );
}
