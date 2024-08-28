import { useEffect, useState } from "react";
import { ProjectState } from "../../types/controlPanel";

const statusColor = {
  green: "#a6ec9a",
  gray: "#a9a9a9",
  beige: "#fcffe6",
  blue: "#abc9e5",
};

interface Props {
  state: ProjectState;
}

function ProjecItemStatus({ state }: Props) {
  const [color, setColor] = useState<string>(statusColor.beige);

  useEffect(() => {
    switch (state) {
      case "Finished":
        setColor(statusColor.gray);
        break;
      case "Launched":
        setColor(statusColor.green);
        break;
      default:
        setColor(statusColor.beige);
    }
  }, [state]);

  return (
    <div className="list-item-status" style={{ backgroundColor: color }} />
  );
}

export default ProjecItemStatus;
