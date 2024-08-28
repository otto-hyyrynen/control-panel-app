import ProjectsList from "./ProjectsList";
import ControlPanel from "./ControlPanel";
import { useAppSelector } from "../../redux/store";
import "./ControlPanelView.css";

function ControlPanelView() {
  const projectItems = useAppSelector((state) => state.projectItems);

  return (
    <div className="container">
      <ProjectsList items={projectItems} />
      <ControlPanel />
    </div>
  );
}

export default ControlPanelView;
