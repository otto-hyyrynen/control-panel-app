import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectItem } from "../../types/controlPanel";
import { AppDispatch, RootState } from "../store";

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Travel to Mars",
    state: "Launched",
  },
  {
    id: 2,
    name: "Launching satellite",
    state: "Finished",
  },
  {
    id: 3,
    name: "Study: growing plants on Mars",
    state: "Not started",
  },
  {
    id: 4,
    name: "Study: new human generation to Mars",
    state: "Not started",
  },
];

interface ProjectsState {
  projectItems: ProjectItem[];
}

const initialState: ProjectsState = {
  projectItems: PROJECTS.map((p) => ({
    ...p,
    selected: false,
    enabled: p.state === "Finished" ? false : true,
    initialEnabled: p.state === "Finished" ? false : true,
  })),
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    storeProjectItems: (state, action: PayloadAction<ProjectItem[]>) => {
      state.projectItems = action.payload;
    },
    clearState: () => initialState,
  },
});

export const { storeProjectItems, clearState } = projectsSlice.actions;

export const saveProjectItems =
  (projectItems: ProjectItem[]) => (dispatch: AppDispatch) => {
    dispatch(storeProjectItems(projectItems));
  };

export const selectProjectItem =
  (projectItem: ProjectItem) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const projectItems = getState().projectItems;

    const updatedItems = projectItems.map((item) =>
      item.id === projectItem.id
        ? { ...item, selected: !projectItem.selected }
        : item
    );

    dispatch(storeProjectItems(updatedItems));
  };

export default projectsSlice.reducer;
