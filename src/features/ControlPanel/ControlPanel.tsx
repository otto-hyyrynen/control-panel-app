import { saveProjectItems } from "../../redux/slices/projectsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ProjectItem, ProjectState } from "../../types/controlPanel";

function ControlPanel() {
  const dispatch = useAppDispatch();

  const projectItems: ProjectItem[] = useAppSelector(
    (state) => state.projectItems
  );

  const handleClick = (type: ProjectState) => {
    const updatedItems: ProjectItem[] = projectItems.map((pi) => ({
      ...pi,
      state: pi.selected ? type : pi.state,
      selected: false,
      enabled: pi.initialEnabled,
    }));

    const finishedItems = updatedItems.map((ui) => ({
      ...ui,
      enabled: ui.state === "Finished" ? false : true,
    }));

    dispatch(saveProjectItems(finishedItems));
  };

  return (
    <div className="control-buttons-container">
      <div className="control-button" onClick={() => handleClick("Launched")}>
        <p>Launch project</p>
      </div>
      <div className="control-button" onClick={() => handleClick("Finished")}>
        <p>Finish</p>
      </div>
    </div>
  );
}

export default ControlPanel;
