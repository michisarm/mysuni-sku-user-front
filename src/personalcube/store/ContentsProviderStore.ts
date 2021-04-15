import { createStore } from "./Store";
import { ContentsProvider } from "../personalcube/model/ContentsProvider";

const [
  setContentsProviderStore,
  onContentsProviderStore,
  getContentsProviderStore,
  useContentsProviderStore,
] = createStore<ContentsProvider[]>([]);


export {
  setContentsProviderStore,
  onContentsProviderStore,
  getContentsProviderStore,
  useContentsProviderStore,
};