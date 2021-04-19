import { createStore } from "./Store";
import { ContentsProvider } from "../personalcube/model/ContentsProvider";

const [
  setContentsProviders,
  onContentsProviders,
  getContentsProviders,
  useContentsProviders,
] = createStore<ContentsProvider[]>([]);


export {
  setContentsProviders,
  onContentsProviders,
  getContentsProviders,
  useContentsProviders,
};