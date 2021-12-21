import { isString } from 'lodash';
import { reactAlert } from '@nara.platform/accent';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  clearFindMyCardRelatedStudentsCache,
  saveTask,
  submitTask,
} from '../../../api/cardApi';
import {
  openAnswerSheet,
  saveAnswerSheet,
  submitAnswerSheet,
} from '../../../api/surveyApi';
import AnswerSheetCdo from '../../../model/AnswerSheetCdo';
import {
  getLectureSurvey,
  getLectureSurveyState,
  setLectureSurveyState,
} from '../../../store/LectureSurveyStore';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import LectureParams from '../../../viewModel/LectureParams';
import { LectureStructureSurveyItem } from '../../../viewModel/LectureStructure';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { MatrixItem } from '../../../viewModel/LectureSurveyState';
import { updateCardLectureStructure } from '../../useLectureStructure/utility/updateCardLectureStructure';

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
  const lectureSurvey = getLectureSurvey();
  if (lectureSurveyState === undefined || lectureSurvey === undefined) {
    return;
  }
  const { serviceId, round, surveyCaseId, answerItem, answerSheetId } =
    lectureSurveyState;

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
      answers: answerItem.map((c) => {
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
  const lectureSurvey = getLectureSurvey();
  if (lectureSurveyState === undefined || lectureSurvey === undefined) {
    return;
  }
  const { serviceId, round, surveyCaseId, answerItem, answerSheetId } =
    lectureSurveyState;
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
      answers: answerItem.map((c) => {
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
  const requiredMissAnswers = lectureSurvey.surveyItems
    .filter((c) => c.isRequired)
    .filter(
      (c) =>
        !answerItem.some(
          (d) =>
            d.questionNumber === c.questionNumber &&
            (c.type !== 'Matrix' ||
              (c.type === 'Matrix' && d.matrixItem?.length === c.rows?.length))
        ) ||
        answerItem.some(
          (d) =>
            c.type === 'Review' &&
            d.answerItemType === 'Review' &&
            (d.sentence === undefined || d.sentence?.trim() === '')
        )
    );

  const a = requiredMissAnswers.map((r) => r.rows);

  if (requiredMissAnswers.length > 0) {
    reactAlert({
      title: getPolyglotText('알림', 'survey-save-alert1'),
      message:
        requiredMissAnswers.map(
          (r) => ' ' + r.no + getPolyglotText('번', 'survey-설문참여-번호')
        ) + getPolyglotText('은 필수 항목입니다', 'survey-설문참여-필수항목'),
    });

    return;
  }
  await submitAnswerSheet(surveyCaseId, round, answerSheetCdo);
  setLectureSurveyState({ ...lectureSurveyState, state: 'Finish' });
  reactAlert({
    title: getPolyglotText('알림', 'survey-save-alert2'),
    message: getPolyglotText(
      'Survey 설문 참여가 완료 되었습니다.',
      'survey-설문참여-완료메세지'
    ),
  });

  return true;
}

export async function startLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  const lectureSurvey = getLectureSurvey();
  if (lectureSurveyState === undefined || lectureSurvey === undefined) {
    return;
  }
  setLectureSurveyState({ ...lectureSurveyState, state: 'Start' });
}

export async function finishLectureSurveyState() {
  const lectureSurveyState = getLectureSurveyState();
  const lectureSurvey = getLectureSurvey();
  if (lectureSurveyState === undefined || lectureSurvey === undefined) {
    return;
  }
  setLectureSurveyState({ ...lectureSurveyState, state: 'Completed' });
}

export async function saveLectureSurveyState(lectureParams: LectureParams) {
  const lectureSurveyState = getLectureSurveyState();
  const lectureStructureItem = getActiveStructureItem(
    lectureParams.pathname
  ) as LectureStructureSurveyItem;
  const { student } = lectureStructureItem;
  if (student === undefined || student === null) {
    return;
  }
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
  await saveTask(student.id, 'Survey');
  clearFindMyCardRelatedStudentsCache();
  updateCardLectureStructure(lectureParams.cardId);

  reactAlert({
    title: getPolyglotText('알림', 'survey-save-alert4'),
    message: getPolyglotText(
      'Survey 설문이 저장 되었습니다.',
      'survey-설문저장-완료메세지2'
    ),
  });
}

export async function submitLectureSurveyState(lectureParams: LectureParams) {
  const lectureSurveyState = getLectureSurveyState();
  const lectureStructureItem = getActiveStructureItem(
    lectureParams.pathname
  ) as LectureStructureSurveyItem;
  const { student } = lectureStructureItem;
  if (student === undefined || student === null) {
    return;
  }
  if (lectureSurveyState === undefined) {
    return;
  }
  if (lectureSurveyState.state === 'Completed') {
    return;
  }
  setLectureSurveyState({ ...lectureSurveyState, state: 'Progress' });
  if (lectureSurveyState.answerSheetId === undefined) {
    await openLectureSurveyState();
  }

  const result = await coreSubmitLectureSurveyState();
  if (result === true) {
    await submitTask(student.id, 'Survey');
    clearFindMyCardRelatedStudentsCache();
    updateCardLectureStructure(lectureParams.cardId);
  }
}

export async function saveCommunitySurveyState() {
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
    title: getPolyglotText('알림', 'survey-save-alert5'),
    message: getPolyglotText(
      'Survey 설문이 저장 되었습니다.',
      'survey-설문저장-완료메세지'
    ),
  });
}

export async function submitCommunitySurveyState() {
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
}

export function selectSentenceAnswer(
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
    (c) => c.questionNumber === questionNumber
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
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
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
    (c) => c.questionNumber === questionNumber
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
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
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
    (c) => c.questionNumber === questionNumber
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
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
      if (c.questionNumber === questionNumber) {
        if (canMultipleAnswer) {
          if (c.itemNumbers !== undefined && c.itemNumbers.includes(next)) {
            return {
              ...c,
              itemNumbers: c.itemNumbers.filter((d) => d !== next),
            };
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

export function selectReviewSentenceAnswer(
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
    (c) => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        sentence: value,
        matrixItem: null,
        criteriaItem: null,
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
      if (c.questionNumber === questionNumber) {
        return {
          ...c,
          sentence: value,
          matrixItem: null,
          criteriaItem: null,
        };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectReviewChoiceAnswer(
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
    (c) => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        itemNumbers: [next],
        matrixItem: null,
        criteriaItem: null,
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
      if (c.questionNumber === questionNumber) {
        if (canMultipleAnswer) {
          if (c.itemNumbers !== undefined && c.itemNumbers.includes(next)) {
            return {
              ...c,
              itemNumbers: c.itemNumbers.filter((d) => d !== next),
              matrixItem: null,
              criteriaItem: null,
            };
          } else {
            return {
              ...c,
              itemNumbers: [...(c.itemNumbers || []), next],
              matrixItem: null,
              criteriaItem: null,
            };
          }
        } else {
          return {
            ...c,
            itemNumbers: [next],
            matrixItem: null,
            criteriaItem: null,
          };
        }
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}

export function selectChoiceFixedAnswer(
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
    (c) => c.questionNumber === questionNumber
  );
  if (lectureSurveyAnswerItem === undefined) {
    lectureSurveyState.answerItem = [
      ...lectureSurveyState.answerItem,
      {
        questionNumber,
        answerItemType: type,
        itemNumbers: [next],
        matrixItem: null,
        criteriaItem: null,
        sentence: null,
      },
    ];
  } else {
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
      if (c.questionNumber === questionNumber) {
        if (canMultipleAnswer) {
          if (c.itemNumbers !== undefined && c.itemNumbers.includes(next)) {
            return {
              ...c,
              itemNumbers: c.itemNumbers.filter((d) => d !== next),
              matrixItem: null,
              criteriaItem: null,
              sentence: null,
            };
          } else {
            return {
              ...c,
              itemNumbers: [...(c.itemNumbers || []), next],
              matrixItem: null,
              criteriaItem: null,
              sentence: null,
            };
          }
        } else {
          return {
            ...c,
            itemNumbers: [next],
            matrixItem: null,
            criteriaItem: null,
            sentence: null,
          };
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
  const choice = choices.find((c) => c.no === next);
  if (choice === undefined) {
    return;
  }
  const lectureSurveyAnswerItem = lectureSurveyState.answerItem.find(
    (c) => c.questionNumber === questionNumber
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
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
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
  const { questionNumber, type } = lectureSurveyItem;
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
    (c) => c.questionNumber === questionNumber
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
    lectureSurveyState.answerItem = lectureSurveyState.answerItem.map((c) => {
      if (c.questionNumber === questionNumber) {
        const matrixItem = (c.matrixItem || []).filter(
          (d) => d.rowNumber !== next.rowNumber
        );
        return { ...c, matrixItem: [...matrixItem, next] };
      } else {
        return c;
      }
    });
  }
  setLectureSurveyState({ ...lectureSurveyState });
}
