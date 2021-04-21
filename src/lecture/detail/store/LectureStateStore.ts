import LectureState from '../viewModel/LectureState';
import { createStore } from './Store';

const [
  setLectureState,
  onLectureState,
  getLectureState,
  useLectureState,
] = createStore<LectureState>();

export { setLectureState, onLectureState, getLectureState, useLectureState };
