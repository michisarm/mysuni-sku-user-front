import { createStore } from './Store';
import NoteWithLecture from '../model/NoteWithLecture';
import { OffsetElementList } from '@nara.platform/accent';

const [
  setNoteWithLectureList,
  onNoteWithLectureList,
  getNoteWithLectureList,
  useNoteWithLectureList,
] = createStore<OffsetElementList<NoteWithLecture>>();

export {
  setNoteWithLectureList,
  onNoteWithLectureList,
  getNoteWithLectureList,
  useNoteWithLectureList,
};
