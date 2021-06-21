import { createStore } from './Store';
import Folder from '../model/Folder';

const [
  setFolder,
  onFolder,
  getFolder,
  useFolder,
] = createStore<Folder>();

export {
  setFolder,
  onFolder,
  getFolder,
  useFolder,
};

