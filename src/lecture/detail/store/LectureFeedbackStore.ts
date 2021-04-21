import LectureFeedbackContent from '../viewModel/LectureFeedbackContent';
import { createStore } from './Store';

const [
  setLectureFeedbackContent,
  onLectureFeedbackContent,
  getLectureFeedbackContent,
] = createStore<LectureFeedbackContent>();

export { setLectureFeedbackContent, onLectureFeedbackContent, getLectureFeedbackContent };
