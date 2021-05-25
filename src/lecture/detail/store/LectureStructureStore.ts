import {
  LectureStructure,
  LectureStructureItem,
} from '../viewModel/LectureStructure';
import CommunityIsLoadingState from '../viewModel/CommunityIsLoadingState';

import { createStore } from './Store';

const initialStore: LectureStructure = {
  card: {
    cardId: '',
    name: '',
    params: {
      cardId: '',
      viewType: 'view',
      pathname: '',
    },
    path: '',
    can: false,
    order: -1,
    type: 'CARD',
    learningTime: 0,
    additionalLearningTime: 0,
    canSubmit: false,
  },
  chapters: [],
  cubes: [],
  discussions: [],
  items: [],
};
const [
  setLectureStructure,
  onLectureStructure,
  getLectureStructure,
  useLectureStructure,
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
  useLectureStructure,
  setCurentLectureStructureItem,
  onCurentLectureStructureItem,
  getCurentLectureStructureItem,
  setIsLoadingState,
  onIsLoadingState,
  getIsLoadingState,
  useIsLoadingState,
};
