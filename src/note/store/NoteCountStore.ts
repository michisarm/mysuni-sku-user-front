import { createStore } from './Store';

const [
  setNoteCount,
  onNoteCount,
  getNoteCount,
  useNoteCount,
] = createStore<number>();

export {
  setNoteCount,
  onNoteCount,
  getNoteCount,
  useNoteCount,
};

