import LectureSurvey from '../viewModel/LectureSurvey';
import LectureSurveyState from '../viewModel/LectureSurveyState';
import { createStore } from './Store';
import LectureSurveySummary from '../viewModel/LectureSurveySummary';

import LectureSurveyAnswerSummaryList from '../viewModel/LectureSurveyAnswerSummary';
import AnswerSheet from '../model/SurveyAnswerSheet';

const [setLectureSurvey, onLectureSurvey, getLectureSurvey] =
  createStore<LectureSurvey>();

const [setLectureSurveyState, onLectureSurveyState, getLectureSurveyState] =
  createStore<LectureSurveyState>();

const [
  setLectureSurveySummary,
  onLectureSurveySummary,
  getLectureSurveySummary,
  useLectureSurveySummary,
] = createStore<LectureSurveySummary>();

const [
  setLectureSurveyAnswerSheet,
  onLectureSurveyAnswerSheet,
  getLectureSurveyAnswerSheet,
  useLectureSurveyAnswerSheet,
] = createStore<AnswerSheet>();

const [
  setLectureSurveyAnswerSummaryList,
  onLectureSurveyAnswerSummaryList,
  getLectureSurveyAnswerSummaryList,
  useLectureSurveyAnswerSummaryList,
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
  useLectureSurveySummary,
  setLectureSurveyAnswerSummaryList,
  onLectureSurveyAnswerSummaryList,
  getLectureSurveyAnswerSummaryList,
  useLectureSurveyAnswerSummaryList,
  setLectureSurveyAnswerSheet,
  onLectureSurveyAnswerSheet,
  getLectureSurveyAnswerSheet,
  useLectureSurveyAnswerSheet,
};
