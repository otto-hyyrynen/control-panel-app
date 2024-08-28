export type ProjectState = "Not started" | "Launched" | "Finished";

/**
 * Project object from an API.
 */
export interface Project {
  id: number;
  name: string;
  state: ProjectState;
}

/**
 * Project state item.
 */
export interface ProjectItem {
  id: number;
  name: string;
  state: ProjectState;
  selected: boolean;
  enabled: boolean;
  initialEnabled: boolean;
}
