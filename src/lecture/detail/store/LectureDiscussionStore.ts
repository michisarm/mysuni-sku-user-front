import LectureDiscussion from '../viewModel/LectureDiscussion';
import { createStore } from './Store';

const [
  setLectureDiscussion,
  onLectureDiscussion,
  getLectureDiscussion,
  useLectureDiscussion,
] = createStore<LectureDiscussion>();

export {
  setLectureDiscussion,
  onLectureDiscussion,
  getLectureDiscussion,
  useLectureDiscussion,
};
