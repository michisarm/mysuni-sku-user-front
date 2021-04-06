import LectureParams from '../viewModel/LectureParams';
import { createStore } from './Store';

const [
  setLectureParams,
  onLectureParams,
  getLectureParams,
  useLectureParams,
] = createStore<LectureParams>();

export {
  setLectureParams,
  onLectureParams,
  getLectureParams,
  useLectureParams,
};
