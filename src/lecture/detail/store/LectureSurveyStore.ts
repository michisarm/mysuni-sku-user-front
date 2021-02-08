import LectureSurvey from '../viewModel/LectureSurvey';
import LectureSurveyState from '../viewModel/LectureSurveyState';
import { createStore } from './Store';
import LectureSurveySummary from '../viewModel/LectureSurveySummary';
import LectureSurveyAnswerSummary from '../viewModel/LectureSurveyAnswerSummary';

const [setLectureSurvey, onLectureSurvey, getLectureSurvey] = createStore<
  LectureSurvey
>();

const [
  setLectureSurveyState,
  onLectureSurveyState,
  getLectureSurveyState,
] = createStore<LectureSurveyState>();

const [
  setLectureSurveySummary,
  onLectureSurveySummary,
  getLectureSurveySummary,
] = createStore<LectureSurveySummary>();

const [
  setLectureSurveyAnswerSummary,
  onLectureSurveyAnswerSummary,
  getLectureSurveyAnswerSummary,
] = createStore<LectureSurveyAnswerSummary>();

export {
  setLectureSurvey,
  onLectureSurvey,
  getLectureSurvey,
  setLectureSurveyState,
  onLectureSurveyState,
  getLectureSurveyState,
  setLectureSurveySummary,
  onLectureSurveySummary,
  getLectureSurveySummary,
  setLectureSurveyAnswerSummary,
  onLectureSurveyAnswerSummary,
  getLectureSurveyAnswerSummary,
};
