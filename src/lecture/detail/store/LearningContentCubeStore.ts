import { LectureChpaterCubeList } from '../viewModel/LectureChpaterCubeList';
import { createStore } from './Store';

const [
  setLearningContentCube,
  onLearningContentCube,
  getLearningContentCube,
  useLearningContentCube,
] = createStore<LectureChpaterCubeList[]>();

export {
  setLearningContentCube,
  onLearningContentCube,
  getLearningContentCube,
  useLearningContentCube,
};
