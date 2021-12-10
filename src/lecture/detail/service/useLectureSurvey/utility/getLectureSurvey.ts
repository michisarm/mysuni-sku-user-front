import { CriterionModel } from '../../../../../survey/form/model/CriterionModel';
import { findIsJsonStudentByCube } from '../../../api/lectureApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
  findSurveySummaryBySurveyCaseIdAndRound,
  findAnswerSummariesBySurveySummaryId,
} from '../../../api/surveyApi';
import LangStrings, { langStringsToString } from '../../../model/LangStrings';
import StudentJoin from '../../../model/StudentJoin';
import Question from '../../../model/SurveyQuestion';
import {
  setLectureSurvey,
  setLectureSurveyState,
  setLectureSurveySummary,
  setLectureSurveyAnswerSummaryList,
} from '../../../store/LectureSurveyStore';
import { State } from '../../../viewModel/LectureState';
import LectureSurvey, {
  LectureSurveyItem,
  LectureSurveyItemChoice,
} from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyAnswerSummary, {
  MatrixItem,
} from '../../../viewModel/LectureSurveyAnswerSummary';
import { getLectureParams } from '../../../store/LectureParamsStore';
import { findCardCache } from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { LangSupport } from '../../../../model/LangSupport';

function parseChoice(
  question: Question,
  langSupport: LangSupport[],
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
    visible,
  } = question;
  const title = langStringsToString(sentences, langSupport);
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  const choices: LectureSurveyItemChoice[] =
    answerItems.items?.map(({ number, values }) => {
      const mTitle = langStringsToString(values, langSupport);
      let mNo = parseInt(number);
      if (isNaN(mNo)) {
        mNo = 1;
      }
      let mImage: string | undefined;
      const imageItem = answerItems.imageUrls?.find((c) => c.number === number);
      if (imageItem !== undefined) {
        mImage = imageItem.imageUrl;
      }
      let count: number | undefined;
      if (lectureSurveyAnswerSummary !== undefined) {
        const answerSummary = lectureSurveyAnswerSummary.find(
          (c) => c.questionNumber === questionNumber
        );
        if (answerSummary !== undefined) {
          const numberCountMap = answerSummary.summaryItems.numberCountMap;
          if (
            numberCountMap !== undefined &&
            numberCountMap[mNo] !== undefined
          ) {
            count = numberCountMap[mNo];
          }
        }
      }
      return {
        title: mTitle,
        no: mNo,
        image: mImage,
        count,
      };
    }) || [];
  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    canMultipleAnswer,
    choices,
    questionNumber,
    visible,
  };
}

function parseCriterion(
  question: Question,
  criterionList: CriterionModel[],
  langSupports: LangSupport[],
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
  } = question;
  const title = langStringsToString(sentences, langSupports);
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const criterion = criterionList?.find(
    (c) => c.number === answerItems.criterionNumber
  );
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  const choices: LectureSurveyItemChoice[] =
    criterion?.criteriaItems?.map(({ value, names, index }) => {
      const mTitle = langStringsToString(names, langSupports);
      let mNo = index !== undefined ? index : 0;
      if (isNaN(mNo)) {
        mNo = 0;
      }
      let count: number | undefined;

      if (lectureSurveyAnswerSummary !== undefined) {
        const answerSummary = lectureSurveyAnswerSummary.find(
          (c) => c.questionNumber === questionNumber
        );
        // console.log('answerSummary : ', answerSummary);
        if (answerSummary !== undefined) {
          const criteriaItemCountMap =
            answerSummary.summaryItems.criteriaItemCountMap;
          if (
            criteriaItemCountMap !== undefined &&
            criteriaItemCountMap[mNo] !== undefined
          ) {
            count = criteriaItemCountMap[mNo];
          }
        }
      }
      return {
        title: mTitle,
        no: mNo + 1,
        index,
        names: names as unknown as LangStrings,
        count,
      };
    }) || [];
  const visible = question.visible;
  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    canMultipleAnswer,
    choices,
    questionNumber,
    visible,
  };
}

function parseEssay(
  question: Question,
  langSupports: LangSupport[],
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
  } = question;
  const title = langStringsToString(sentences, langSupports);
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const maxLength = answerItems !== null ? answerItems.maxLength : undefined;
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  let sentencesMap: Record<string, number> | undefined;
  if (lectureSurveyAnswerSummary !== undefined) {
    const answerSummary = lectureSurveyAnswerSummary.find(
      (c) => c.questionNumber === questionNumber
    );
    if (answerSummary?.summaryItems.sentencesMap !== undefined) {
      sentencesMap = answerSummary.summaryItems.sentencesMap;
    }
  }
  let numberCountMap: Record<string, number> | undefined;
  if (lectureSurveyAnswerSummary !== undefined) {
    const answerSummary = lectureSurveyAnswerSummary.find(
      (c) => c.questionNumber === questionNumber
    );
    if (answerSummary?.summaryItems.numberCountMap !== undefined) {
      numberCountMap = answerSummary.summaryItems.numberCountMap;
    }
  }
  const visible = question.visible;
  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    maxLength,
    questionNumber,
    sentencesMap,
    visible,
    numberCountMap,
  };
}

function parseMatrix(
  question: Question,
  langSupports: LangSupport[],
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
  } = question;
  const title = langStringsToString(sentences, langSupports);
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  let matrixItems: MatrixItem[] | undefined;
  if (lectureSurveyAnswerSummary !== undefined) {
    const answerSummary = lectureSurveyAnswerSummary.find(
      (c) => c.questionNumber === questionNumber
    );
    if (answerSummary?.summaryItems.matrixItems !== undefined) {
      matrixItems = answerSummary.summaryItems.matrixItems;
    }
  }
  const columns: LectureSurveyItemChoice[] =
    answerItems.columnItems?.map(({ number, values }) => {
      const mTitle = langStringsToString(values, langSupports);
      let mNo = parseInt(number);
      if (isNaN(mNo)) {
        mNo = 1;
      }

      return {
        title: mTitle,
        no: mNo,
      };
    }) || [];

  const rows: LectureSurveyItemChoice[] =
    answerItems.rowItems?.map(({ number, values }) => {
      const mTitle = langStringsToString(values, langSupports);
      let mNo = parseInt(number);
      if (isNaN(mNo)) {
        mNo = 1;
      }

      return {
        title: mTitle,
        no: mNo,
      };
    }) || [];
  const visible = question.visible;

  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    canMultipleAnswer,
    columns,
    rows,
    matrixItems,
    questionNumber,
    visible,
  };
}

async function parseSurveyForm(
  surveyId: string,
  surveyCaseId: string,
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
): Promise<LectureSurvey | undefined> {
  const surveyForm = await findSurveyForm(surveyId);
  const { id, titles, questions: remoteQuestions, langSupports } = surveyForm;
  const title = langStringsToString(titles, langSupports);
  const surveyItems = remoteQuestions.map((question) => {
    switch (question.questionItemType) {
      case 'Choice':
        return parseChoice(question, langSupports, lectureSurveyAnswerSummary);
      case 'Essay':
      case 'Date':
      case 'Boolean':
        return parseEssay(question, langSupports, lectureSurveyAnswerSummary);
      case 'Matrix':
        return parseMatrix(question, langSupports, lectureSurveyAnswerSummary);
      case 'Criterion':
        return parseCriterion(
          question,
          surveyForm.criterionList,
          langSupports,
          lectureSurveyAnswerSummary
        );
      default:
        return parseEssay(question, langSupports);
    }
  });
  return {
    id,
    title,
    surveyItems,
    surveyId,
    surveyCaseId,
    userViewResult: surveyForm.userViewResult,
  };
}

async function getCubeLectureSurveyState(
  serviceId: string,
  surveyCaseId: string
): Promise<void> {
  let state: State = 'None';

  const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
  if (answerSheet !== undefined && answerSheet.id !== undefined) {
    const {
      round,
      progress,
      evaluationSheet: { id: evaluationSheetId, answerSheetId, answers },
    } = answerSheet;
    if (progress === 'Complete') {
      state = 'Completed';
    } else {
      state = 'Progress';
    }
    const answerItem: LectureSurveyAnswerItem[] = answers.map(
      ({
        questionNumber,
        answerItem: {
          answerItemType,
          criteriaItem,
          itemNumbers,
          sentence,
          matrixItem,
        },
      }) => ({
        questionNumber,
        answerItemType,
        criteriaItem:
          criteriaItem === null
            ? undefined
            : {
                names: criteriaItem.names as unknown as LangStrings,
                value: criteriaItem.value,
                index: criteriaItem.index,
              },
        itemNumbers: itemNumbers === null ? undefined : itemNumbers,
        sentence: sentence === null ? undefined : sentence,
        matrixItem: matrixItem === null ? undefined : matrixItem,
      })
    );
    const lectureSurveyState = {
      evaluationSheetId,
      answerSheetId,
      answerItem,
      state,
      surveyCaseId,
      round,
      serviceId,
    };
    setLectureSurveyState(lectureSurveyState);
    return;
  }
  const studentJoins = await findIsJsonStudentByCube(serviceId);
  if (studentJoins.length > 0) {
    const studentJoin: StudentJoin | null =
      studentJoins.reduce<StudentJoin | null>((r, c) => {
        if (r === null) {
          return c;
        }
        if (c.updateTime > r.updateTime) {
          return c;
        }
        return r;
      }, null);
    if (studentJoin !== null) {
      const lectureSurveyState = {
        state,
        surveyCaseId,
        round: studentJoin.round,
        serviceId,
        answerItem: [],
      };
      setLectureSurveyState(lectureSurveyState);
      return;
    }
  }
  const lectureSurveyState = {
    state,
    surveyCaseId,
    round: 1,
    serviceId,
    answerItem: [],
  };
  setLectureSurveyState(lectureSurveyState);
}
export async function getCourseLectureSurveyState(
  serviceId: string,
  surveyCaseId: string
) {
  let state: State = 'None';

  const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
  if (answerSheet !== undefined && answerSheet.id !== undefined) {
    const {
      id: answerSheetId,
      round,
      progress,
      evaluationSheet: { id, answers },
    } = answerSheet;
    if (progress === 'Complete') {
      state = 'Completed';
    } else {
      state = 'Progress';
    }
    const answerItem: LectureSurveyAnswerItem[] = answers.map(
      ({
        questionNumber,
        answerItem: {
          answerItemType,
          criteriaItem,
          itemNumbers,
          sentence,
          matrixItem,
        },
      }) => ({
        questionNumber,
        answerItemType,
        criteriaItem:
          criteriaItem === null
            ? undefined
            : {
                names: criteriaItem.names as unknown as LangStrings,
                value: criteriaItem.value,
                index: criteriaItem.index,
              },
        itemNumbers: itemNumbers === null ? undefined : itemNumbers,
        sentence: sentence === null ? undefined : sentence,
        matrixItem: matrixItem === null ? undefined : matrixItem,
      })
    );
    const lectureSurveyState = {
      id,
      answerSheetId,
      answerItem,
      state,
      surveyCaseId,
      round,
      serviceId,
    };
    setLectureSurveyState(lectureSurveyState);
    return;
  }
  const lectureSurveyState = {
    state,
    surveyCaseId,
    round: 1,
    serviceId,
    answerItem: [],
  };
  setLectureSurveyState(lectureSurveyState);
}

export async function requestLectureSurvey(
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
) {
  const params = getLectureParams();
  if (params !== undefined) {
    const { cardId, cubeId } = params;
    if (cubeId !== undefined) {
      const cubeDetail = await findCubeDetailCache(cubeId);
      if (cubeDetail === undefined) {
        return;
      }
      const {
        cube: { surveyCaseId },
        cubeContents: { surveyId },
      } = cubeDetail;
      if (surveyCaseId !== null && surveyId !== null) {
        requestLectureSurveyFromSurvey(
          surveyId,
          surveyCaseId,
          lectureSurveyAnswerSummary
        );
      }
    } else {
      const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
      if (
        cardWithContentsAndRelatedCountRom?.cardContents.surveyCaseId !==
          undefined &&
        cardWithContentsAndRelatedCountRom?.cardContents.surveyId
      ) {
        requestLectureSurveyFromSurvey(
          cardWithContentsAndRelatedCountRom?.cardContents.surveyId,
          cardWithContentsAndRelatedCountRom?.cardContents.surveyCaseId,
          lectureSurveyAnswerSummary
        );
      }
    }
  }
}

export async function requestLectureSurveyFromSurvey(
  surveyId: string,
  surveyCaseId: string,
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary[]
) {
  const lectureSurvey = await parseSurveyForm(
    surveyId,
    surveyCaseId,
    lectureSurveyAnswerSummary
  );
  setLectureSurvey(lectureSurvey);
  await getCourseLectureSurveyState(surveyId, surveyCaseId);
}

export async function requestLectureSurveySummary(
  surveyId: string,
  surveyCaseId: string
) {
  const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
  const lectureSurveySummary = await findSurveySummaryBySurveyCaseIdAndRound(
    surveyCaseId,
    answerSheet?.round || 1
  );
  setLectureSurveySummary(lectureSurveySummary);
  const lectureSurveyAnswerSummary = await findAnswerSummariesBySurveySummaryId(
    lectureSurveySummary.id
  );

  const lectureSurvey = await parseSurveyForm(
    surveyId,
    surveyCaseId,
    lectureSurveyAnswerSummary
  );
  setLectureSurvey(lectureSurvey);

  setLectureSurveyAnswerSummaryList(lectureSurveyAnswerSummary);
}
