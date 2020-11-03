import {
  findAnswerSheetBySurveyCaseId,
  openAnswerSheet,
  saveAnswerSheet,
  submitAnswerSheet,
} from '../../../api/surveyApi';
import AnswerSheetCdo from '../../../model/AnswerSheetCdo';
import LangStrings from '../../../model/LangStrings';
import {
  getLectureSurveyState,
  setLectureSurveyState,
} from '../../../store/LectureSurveyStore';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { getCourseLectureSurveyState } from './getLectureSurvey';

async function openLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  const { serviceId, round, surveyCaseId, answerItem } = lectureSurveyState;

  const answers = answerItem.map(
    ({
      questionNumber,
      answerItemType,
      criteriaItem,
      itemNumbers,
      sentence,
      matrixItem,
    }) => ({
      questionNumber,
      answerItem: {
        answerItemType,
        criteriaItem,
        itemNumbers,
        sentence,
        matrixItem,
      },
    })
  );

  const answerSheetCdo: AnswerSheetCdo = {
    serviceId,
    round,
    surveyCaseId,
    progress: 'Open',
    respondent: { usid: '', email: '', title: '', company: '' },
    evaluationSheet: {
      id: '',
      entityVersion: 0,
      patronKey: {},
      questionCount: 0,
      answers,
      answerSheetId: '',
    },
  };
  await openAnswerSheet(surveyCaseId, round, answerSheetCdo);
  await getCourseLectureSurveyState(serviceId, surveyCaseId);
}

async function coreSaveLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  const { serviceId, round, surveyCaseId, answerItem } = lectureSurveyState;

  const answers = answerItem.map(
    ({
      questionNumber,
      answerItemType,
      criteriaItem,
      itemNumbers,
      sentence,
      matrixItem,
    }) => ({
      questionNumber,
      answerItem: {
        answerItemType,
        criteriaItem,
        itemNumbers,
        sentence,
        matrixItem,
      },
    })
  );

  const answerSheetCdo: AnswerSheetCdo = {
    serviceId,
    round,
    surveyCaseId,
    progress: 'Open',
    respondent: { usid: '', email: '', title: '', company: '' },
    evaluationSheet: {
      id: '',
      entityVersion: 0,
      patronKey: {},
      questionCount: 0,
      answers,
      answerSheetId: '',
    },
  };
  await saveAnswerSheet(surveyCaseId, round, answerSheetCdo);
  await getCourseLectureSurveyState(serviceId, surveyCaseId);
}

async function coreSubmitLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  const { serviceId, round, surveyCaseId, answerItem } = lectureSurveyState;

  const answers = answerItem.map(
    ({
      questionNumber,
      answerItemType,
      criteriaItem,
      itemNumbers,
      sentence,
      matrixItem,
    }) => ({
      questionNumber,
      answerItem: {
        answerItemType,
        criteriaItem,
        itemNumbers,
        sentence,
        matrixItem,
      },
    })
  );

  const answerSheetCdo: AnswerSheetCdo = {
    serviceId,
    round,
    surveyCaseId,
    progress: 'Open',
    respondent: { usid: '', email: '', title: '', company: '' },
    evaluationSheet: {
      id: '',
      entityVersion: 0,
      patronKey: {},
      questionCount: 0,
      answers,
      answerSheetId: '',
    },
  };
  await submitAnswerSheet(surveyCaseId, round, answerSheetCdo);
  await getCourseLectureSurveyState(serviceId, surveyCaseId);
}

export async function saveLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  console.log('lectureSurveyState', lectureSurveyState);
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.id === undefined) {
    await openLectureSurveyState();
  } else {
    await coreSaveLectureSurveyState();
  }
}

export async function submitLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  console.log('lectureSurveyState', lectureSurveyState);
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.id === undefined) {
    await openLectureSurveyState();
  } else {
    await coreSubmitLectureSurveyState();
  }
}

/**
 * function selectAnswer(lectureSurveyItem: LectureSurveyItem, value: string) {
  const { questionNumber, type, canMultipleAnswer } = lectureSurveyItem;
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  let lectureSurveyAnswerItem = lectureSurveyState.answerItem;
}

 */
