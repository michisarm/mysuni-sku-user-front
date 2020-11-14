import { LectureStructure } from '../viewModel/LectureStructure';
import { createStore } from './Store';

const initialStore: LectureStructure = {
  courses: [],
  cubes: [],
  discussions: [],
  items: [],
  type: 'Cube',
};
const [
  setLectureStructure,
  onLectureStructure,
  getLectureStructure,
] = createStore<LectureStructure>(initialStore);

export { setLectureStructure, onLectureStructure, getLectureStructure };
