import LectureSurvey from '../viewModel/LectureSurvey';
import LectureSurveyState from '../viewModel/LectureSurveyState';
import { createStore } from './Store';
import LectureSurveySummary from '../viewModel/LectureSurveySummary';
import LectureSurveyAnswerSummary from '../viewModel/LectureSurveyAnswerSummary';
import LectureSurveyAnswerSummaryList from '../viewModel/LectureSurveyAnswerSummary';

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
  setLectureSurveyAnswerSummaryList,
  onLectureSurveyAnswerSummaryList,
  getLectureSurveyAnswerSummaryList,
] = createStore<LectureSurveyAnswerSummaryList[]>();

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
  setLectureSurveyAnswerSummaryList,
  onLectureSurveyAnswerSummaryList,
  getLectureSurveyAnswerSummaryList,
};
