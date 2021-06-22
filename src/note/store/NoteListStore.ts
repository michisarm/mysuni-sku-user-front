import { createStore } from './Store';
import Note from '../model/Note';
import { OffsetElementList } from '@nara.platform/accent';

const [
  setNoteList,
  onNoteList,
  getNoteList,
  useNoteList,
] = createStore<OffsetElementList<Note>>();

export {
  setNoteList,
  onNoteList,
  getNoteList,
  useNoteList,
};

