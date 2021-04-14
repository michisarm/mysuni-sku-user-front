import { LearningContent } from '../../model/LearningContent';
import { createStore } from './Store';

const [
  setLearningContent,
  onLearningContent,
  getLearningContent,
  useLearningContent,
] = createStore<LearningContent>();

export {
  setLearningContent,
  onLearningContent,
  getLearningContent,
  useLearningContent,
};
