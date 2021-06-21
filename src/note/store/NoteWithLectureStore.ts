import { createStore } from './Store';
import NoteWithLecture from '../model/NoteWithLecture';

const [
  setNoteWithLecture,
  onNoteWithLecture,
  getNoteWithLecture,
  useNoteWithLecture,
] = createStore<NoteWithLecture>();

export {
  setNoteWithLecture,
  onNoteWithLecture,
  getNoteWithLecture,
  useNoteWithLecture,
};

