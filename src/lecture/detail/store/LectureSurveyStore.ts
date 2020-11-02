import LectureSurvey from '../viewModel/LectureSurvey';
import LectureSurveyState from '../viewModel/LectureSurveyState';
import { createStore } from './Store';

const [setLectureSurvey, onLectureSurvey, getLectureSurvey] = createStore<
  LectureSurvey
>();

const [
  setLectureSurveyState,
  onLectureSurveyState,
  getLectureSurveyState,
] = createStore<LectureSurveyState>();

export {
  setLectureSurvey,
  onLectureSurvey,
  getLectureSurvey,
  setLectureSurveyState,
  onLectureSurveyState,
  getLectureSurveyState,
};
