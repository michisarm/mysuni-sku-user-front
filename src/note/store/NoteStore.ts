import { createStore } from './Store';
import Note from '../model/Note';

const [
  setNote,
  onNote,
  getNote,
  useNote,
] = createStore<Note>();

export {
  setNote,
  onNote,
  getNote,
  useNote,
};

