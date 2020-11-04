import LectureDiscussion from '../viewModel/LectureDiscussion';
import { createStore } from './Store';

const [
  setLectureDiscussion,
  onLectureDiscussion,
  getLectureDiscussion,
] = createStore<LectureDiscussion>();

export { setLectureDiscussion, onLectureDiscussion, getLectureDiscussion };
