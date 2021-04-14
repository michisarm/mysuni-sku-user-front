import { Cube } from '../../model/Cube';
import { createStore } from './Store';

const [
  setLearningContentCube,
  onLearningContentCube,
  getLearningContentCube,
] = createStore<Cube[]>();

export {
  setLearningContentCube,
  onLearningContentCube,
  getLearningContentCube,
};
