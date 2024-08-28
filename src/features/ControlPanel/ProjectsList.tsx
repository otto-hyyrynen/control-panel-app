import { ProjectItem, ProjectState } from "../../types/controlPanel";
import { useAppDispatch } from "../../redux/store";
import { saveProjectItems } from "../../redux/slices/projectsSlice";
import { useEffect, useState } from "react";
import ProjecItemStatus from "./ProjecItemStatus";

const blueRow = "#4b8ac8";
const lightBlueRow = "#65a9da";
const whiteRow = "#fff";

interface Props {
  items: ProjectItem[];
}

const ProjectsList = ({ items }: Props) => {
  const dispatch = useAppDispatch();

  const [rowColors, setRowColors] = useState<{ [key: number]: string }>({
    1: whiteRow,
    2: whiteRow,
    3: whiteRow,
    4: whiteRow,
  });

  // Change row color
  useEffect(() => {
    items.forEach((i) => {
      if (i.selected) {
        setRowColors((prevState) => {
          return {
            ...prevState,
            [i.id]: blueRow,
          };
        });
      } else {
        setRowColors((prevState) => {
          return {
            ...prevState,
            [i.id]: whiteRow,
          };
        });
      }
    });
  }, [items]);

  const handleSelectItem = (itemId: number) => {
    const itemToToggle: ProjectItem | undefined = items.find(
      (item) => item.id === itemId
    );
    if (!itemToToggle) return;

    const newSelectionState: boolean = !itemToToggle.selected;

    const updatedItems: ProjectItem[] = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, selected: newSelectionState };
      }
      return item;
    });

    const selectedStates: Set<ProjectState> = new Set(
      updatedItems.filter((item) => item.selected).map((item) => item.state)
    );

    const finalItems: ProjectItem[] = updatedItems.map((item) => {
      if (selectedStates.size === 0) {
        return { ...item, enabled: item.initialEnabled };
      }

      return {
        ...item,
        enabled: selectedStates.has(item.state) && item.initialEnabled,
      };
    });

    dispatch(saveProjectItems(finalItems));
  };

  const enableHoverEffect = (item: ProjectItem) => {
    if (!item.enabled) return;

    setRowColors((prevState) => {
      return {
        ...prevState,
        [item.id]: item.enabled ? lightBlueRow : rowColors[item.id],
      };
    });
  };

  const disableHoverEffect = (item: ProjectItem) => {
    setRowColors((prevState) => {
      return {
        ...prevState,
        [item.id]: item.selected ? blueRow : whiteRow,
      };
    });
  };

  return (
    <div className="list-container">
      {items.map((item) => (
        <div className="list-row" key={item.id}>
          <div
            onClick={() => item.enabled && handleSelectItem(item.id)}
            className="list-item"
            style={{
              cursor: item.enabled ? "pointer" : "not-allowed",
              backgroundColor: rowColors[item.id],
            }}
            onMouseEnter={() => enableHoverEffect(item)}
            onMouseLeave={() => disableHoverEffect(item)}
          >
            <h4>{item.name}</h4>
            <p>{item.state}</p>
          </div>
          <ProjecItemStatus state={item.state} />
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
