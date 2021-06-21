import { createStore } from './Store';

const [
  setFolderNoteCount,
  onFolderNoteCount,
  getFolderNoteCount,
  useFolderNoteCount,
] = createStore<number>();

export {
  setFolderNoteCount,
  onFolderNoteCount,
  getFolderNoteCount,
  useFolderNoteCount,
};

