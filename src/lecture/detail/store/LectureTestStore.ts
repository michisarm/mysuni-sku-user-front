import { LectureTest } from '../viewModel/LectureTest';
import { createStore } from './Store';

const initialStore: LectureTest = { courses: [], cubes: [], type: 'Cube' };
const [
  setLectureTest,
  onLectureTest,
  getLectureTest,
] = createStore<LectureTest>(initialStore);

export { setLectureTest, onLectureTest, getLectureTest };
