import { LectureReport } from '../viewModel/LectureReport';
import { createStore } from './Store';

const initialStore: LectureReport = { courses: [], cubes: [], type: 'Cube' };
const [setLectureReport, onLectureReport, getLectureReport] = createStore<
  LectureReport
>(initialStore);

export { setLectureReport, onLectureReport, getLectureReport };
