import LectureClassroom from '../viewModel/LectureClassroom';
import { createStore } from './Store';

const [
  setLectureClassroom,
  onLectureClassroom,
  getLectureClassroom,
] = createStore<LectureClassroom>();

export { setLectureClassroom, onLectureClassroom, getLectureClassroom };
