import {
  LectureStructure,
  LectureStructureItem,
} from '../viewModel/LectureStructure';
import CommunityIsLoadingState from '../viewModel/CommunityIsLoadingState';

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

const [
  setIsLoadingState,
  onIsLoadingState,
  getIsLoadingState,
  useIsLoadingState,
] = createStore<CommunityIsLoadingState>({ isLoading: false });

export {
  setLectureStructure,
  onLectureStructure,
  getLectureStructure,
  setCurentLectureStructureItem,
  onCurentLectureStructureItem,
  getCurentLectureStructureItem,
  setIsLoadingState,
  onIsLoadingState,
  getIsLoadingState,
  useIsLoadingState,
};
