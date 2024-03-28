import { ILabel } from "@/types";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

type Props = { label: ILabel; isSelected: boolean };

export default function DotLabel({ label, isSelected }: Props) {
  const ref = useRef<HTMLLabelElement | null>(null);
  const [rect, setRect] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (ref.current) {
      const b = ref.current.getBoundingClientRect();
      if (b) setRect({ w: b.width, h: b.height });
    }
  }, []);

  if (!label) return;

  let adjustX = 0;
  switch (label.adjustX) {
    case "right":
      adjustX = rect?.w ?? 0;
      break;
    case "center":
      adjustX = (rect?.w ?? 0) / 2;
      break;
  }

  let adjustY = 0;
  switch (label.adjustY) {
    case "bottom":
      adjustY = rect?.h ?? 0;
      break;
    case "center":
      adjustY = (rect?.h ?? 0) / 2;
      break;
  }

  return (
    <label
      ref={ref}
      key={label.name}
      style={{
        left: label.x - adjustX,
        top: label.y - adjustY,
        textAlign: label.adjustX,
      }}
      className={classNames(styles.root, isSelected && styles.selected)}
    >
      {label.name}
    </label>
  );
}
