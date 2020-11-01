import LectureSurvey from '../viewModel/LectureSurvey';
import { createStore } from './Store';

const [setLectureSurvey, onLectureSurvey, getLectureSurvey] = createStore<
  LectureSurvey
>();

export { setLectureSurvey, onLectureSurvey, getLectureSurvey };
