import LectureState from '../viewModel/LectureState';
import { createStore } from './Store';

const [setLectureState, onLectureState, getLectureState] = createStore<
  LectureState
>();

export { setLectureState, onLectureState, getLectureState };
