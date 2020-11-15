import { reactAlert } from '@nara.platform/accent';
import {
  openAnswerSheet,
  saveAnswerSheet,
  submitAnswerSheet,
} from '../../../api/surveyApi';
import AnswerSheetCdo from '../../../model/AnswerSheetCdo';
import {
  getLectureSurveyState,
  setLectureSurveyState,
} from '../../../store/LectureSurveyStore';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { MatrixItem } from '../../../viewModel/LectureSurveyState';

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
  const answerSheetId = await openAnswerSheet(
    surveyCaseId,
    round,
    answerSheetCdo
  );
  setLectureSurveyState({
    ...lectureSurveyState,
    state: 'Progress',
    answerSheetId,
  });
}

async function coreSaveLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  const {
    serviceId,
    round,
    surveyCaseId,
    answerItem,
    answerSheetId,
  } = lectureSurveyState;

  const answerSheetCdo: AnswerSheetCdo = {
    id: answerSheetId,
    serviceId,
    round,
    surveyCaseId,
    progress: 'Open',
    respondent: { usid: '', email: '', title: '', company: '' },
    evaluationSheet: {
      id: lectureSurveyState.evaluationSheetId,
      answerSheetId: lectureSurveyState.answerSheetId,
      answers: answerItem.map(c => {
        return {
          questionNumber: c.questionNumber,
          answerItemType: c.answerItemType,
          answerItem: {
            answerItemType: c.answerItemType,
            criteriaItem: c.criteriaItem,
            itemNumbers: c.itemNumbers,
            sentence: c.sentence,
            matrixItem: c.matrixItem,
          },
        };
      }),
    },
  };
  await saveAnswerSheet(surveyCaseId, round, answerSheetCdo);
  setLectureSurveyState({ ...lectureSurveyState, state: 'Progress' });
}

async function coreSubmitLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  const {
    serviceId,
    round,
    surveyCaseId,
    answerItem,
    answerSheetId,
  } = lectureSurveyState;

  const answerSheetCdo: AnswerSheetCdo = {
    id: answerSheetId,
    serviceId,
    round,
    surveyCaseId,
    progress: 'Complete',
    respondent: { usid: '', email: '', title: '', company: '' },
    evaluationSheet: {
      id: lectureSurveyState.evaluationSheetId,
      answerSheetId: lectureSurveyState.answerSheetId,
      answers: answerItem.map(c => {
        return {
          questionNumber: c.questionNumber,
          answerItemType: c.answerItemType,
          answerItem: {
            answerItemType: c.answerItemType,
            criteriaItem: c.criteriaItem,
            itemNumbers: c.itemNumbers,
            sentence: c.sentence,
            matrixItem: c.matrixItem,
          },
        };
      }),
    },
  };
  await submitAnswerSheet(surveyCaseId, round, answerSheetCdo);
  setLectureSurveyState({ ...lectureSurveyState, state: 'Completed' });
}

export async function saveLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  if (lectureSurveyState.answerSheetId === undefined) {
    await openLectureSurveyState();
  }
  await coreSaveLectureSurveyState();
  reactAlert({
    title: '알림',
    message: 'Survey 설문 이 저장 되었습니다.',
  });
}

export async function submitLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  if (lectureSurveyState.answerSheetId === undefined) {
    await openLectureSurveyState();
  }
  await coreSubmitLectureSurveyState();
  reactAlert({
    title: '알림',
    message: 'Survey 설문 참여가 완료 되었습니다.',
  });
}

export function selectSentenceAnswer(
  lectureSurveyItem: LectureSurveyItem,
  value: string
) {
  const { questionNumber, type, canMultipleAnswer } = lectureSurveyItem;
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    c => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        sentence: value,
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map(c => {
      if (c.questionNumber === questionNumber) {
        return { ...c, sentence: value };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectBooleanAnswer(
  lectureSurveyItem: LectureSurveyItem,
  value: string
) {
  const { questionNumber, type } = lectureSurveyItem;
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    c => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        itemNumbers: [value],
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map(c => {
      if (c.questionNumber === questionNumber) {
        return { ...c, itemNumbers: [value] };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectChoiceAnswer(
  lectureSurveyItem: LectureSurveyItem,
  value: number | string
) {
  const { questionNumber, type, canMultipleAnswer } = lectureSurveyItem;
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  const next = value.toString();
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    c => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        itemNumbers: [next],
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map(c => {
      if (c.questionNumber === questionNumber) {
        if (canMultipleAnswer) {
          if (c.itemNumbers !== undefined && c.itemNumbers.includes(next)) {
            return { ...c, itemNumbers: c.itemNumbers.filter(d => d === next) };
          } else {
            return { ...c, itemNumbers: [...(c.itemNumbers || []), next] };
          }
        } else {
          return { ...c, itemNumbers: [next] };
        }
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectCriterionAnswer(
  lectureSurveyItem: LectureSurveyItem,
  value: number | string
) {
  const { questionNumber, type, choices } = lectureSurveyItem;

  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  if (choices === undefined) {
    return;
  }
  const next = parseInt(value.toString());
  const choice = choices.find(c => c.no === next);
  if (choice === undefined) {
    return;
  }
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    c => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        criteriaItem: {
          value: next,
          names: choice.names!,
          index: choice.index!,
        },
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map(c => {
      if (c.questionNumber === questionNumber) {
        return {
          ...c,
          criteriaItem: {
            value: next,
            names: choice.names!,
            index: choice.index!,
          },
        };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectMatrixAnswer(
  lectureSurveyItem: LectureSurveyItem,
  value: number | string
) {
  const { questionNumber, type, canMultipleAnswer } = lectureSurveyItem;
  const lectureSurveyState = getLectureSurveyState();
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  const next: MatrixItem = JSON.parse(value.toString());
  if (next.rowNumber === undefined || next.columnSelectedNumber === undefined) {
    return;
  }
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    c => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        matrixItem: [next],
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map(c => {
      if (c.questionNumber === questionNumber) {
        const matrixItem = (c.matrixItem || []).filter(
          d => d.rowNumber !== next.rowNumber
        );
        return { ...c, matrixItem: [...matrixItem, next] };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}
