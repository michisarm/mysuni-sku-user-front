import {
  LectureStructure,
  LectureStructureItem,
} from '../viewModel/LectureStructure';
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

const [
  setCurentLectureStructureItem,
  onCurentLectureStructureItem,
  getCurentLectureStructureItem,
] = createStore<LectureStructureItem>();

export {
  setLectureStructure,
  onLectureStructure,
  getLectureStructure,
  setCurentLectureStructureItem,
  onCurentLectureStructureItem,
  getCurentLectureStructureItem,
};
