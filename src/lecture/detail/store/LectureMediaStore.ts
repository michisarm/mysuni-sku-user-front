import { LectureMedia } from '../viewModel/LectureMedia';
import { createStore } from './Store';

const [
  setLectureMedia,
  onLectureMedia,
  getLectureMedia,
  useLectureMedia,
] = createStore<LectureMedia>();

export { setLectureMedia, onLectureMedia, getLectureMedia, useLectureMedia };
