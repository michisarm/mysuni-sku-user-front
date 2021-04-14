import { LearningContent } from '../../model/LearningContent';
import { createStore } from './Store';

const [setLearningContent, onLearningContent, getLearningContent] = createStore<
  LearningContent
>();

export { setLearningContent, onLearningContent, getLearningContent };
