import { createStore } from "./Store";
import { SelectedCollege } from "../create/model/SelectedCollege";

const [
  setSelectedCollege,
  onSelectedCollege,
  getSelectedCollege,
  useSelectedCollege,
] = createStore<SelectedCollege>();

export {
  setSelectedCollege,
  onSelectedCollege,
  getSelectedCollege,
  useSelectedCollege,
};