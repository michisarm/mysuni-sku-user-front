import {
  LectureReport
} from '../viewModel/LectureReport';
import { createStore } from './Store';

const [setLectureReport, onLectureReport, getLectureReport] = createStore<
LectureReport
>();

export {
  setLectureReport,
  onLectureReport,
  getLectureReport,
};
