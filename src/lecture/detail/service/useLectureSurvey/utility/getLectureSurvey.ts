import { findPostMenuName } from 'community/api/communityApi';
import { CriteriaItemModel } from '../../../../../survey/form/model/CriteriaItemModel';
import { CriterionModel } from '../../../../../survey/form/model/CriterionModel';
import {
  findCoursePlanContents,
  findIsJsonStudentByCube,
} from '../../../api/lectureApi';
import { cacheableFindPersonalCube } from '../../../api/mPersonalCubeApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
  findSurveySummaryBySurveyCaseIdAndRound,
  findAnswerSummariesBySurveySummaryId,
} from '../../../api/surveyApi';
import LangStrings from '../../../model/LangStrings';
import StudentJoin from '../../../model/StudentJoin';
import Question from '../../../model/SurveyQuestion';
import {
  setLectureSurvey,
  setLectureSurveyState,
  setLectureSurveySummary,
  setLectureSurveyAnswerSummaryList,
} from '../../../store/LectureSurveyStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import { State } from '../../../viewModel/LectureState';
import LectureSurvey, {
  LectureSurveyItem,
  LectureSurveyItemChoice,
} from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  CriteriaItem,
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';

function parseChoice(question: Question): LectureSurveyItem {
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
  const title = sentences.langStringMap[sentences.defaultLanguage];
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const choices: LectureSurveyItemChoice[] =
    answerItems.items?.map(({ number, values }) => {
      const mTitle = values.langStringMap[values.defaultLanguage];
      let mNo = parseInt(number);
      if (isNaN(mNo)) {
        mNo = 1;
      }
      let mImage: string | undefined;
      const imageItem = answerItems.imageUrls?.find(c => c.number === number);
      if (imageItem !== undefined) {
        mImage = imageItem.imageUrl;
      }
      const mCount = 0;

      return {
        title: mTitle,
        no: mNo,
        image: mImage,
        count: mCount,
      };
    }) || [];
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
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
  criterionList: CriterionModel[]
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
  const title = sentences.langStringMap[sentences.defaultLanguage];
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const criterion = criterionList?.find(
    c => c.number === answerItems.criterionNumber
  );
  const choices: LectureSurveyItemChoice[] =
    criterion?.criteriaItems?.map(({ value, names, index }) => {
      const mTitle =
        ((names.langStringMap as unknown) as Record<string, string>)[
          names.defaultLanguage
        ] || '';
      let mNo = value ? value : 1;
      if (isNaN(mNo)) {
        mNo = 1;
      }
      return {
        title: mTitle,
        no: mNo,
        index,
        names: (names as unknown) as LangStrings,
      };
    }) || [];
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  const visible = true;
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

function parseEssay(question: Question): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
  } = question;
  const title = sentences.langStringMap[sentences.defaultLanguage];
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const maxLength = answerItems !== null ? answerItems.maxLength : undefined;
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  const visible = true;
  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    maxLength,
    questionNumber,
    visible,
  };
}

function parseMatrix(question: Question): LectureSurveyItem {
  const {
    id,
    questionItemType,
    optional,
    sentences,
    sentencesImageUrl,
    sequence,
    answerItems,
  } = question;
  const title = sentences.langStringMap[sentences.defaultLanguage];
  const image = sentencesImageUrl === '' ? undefined : sentencesImageUrl;
  let no = parseInt(sequence.number);
  if (isNaN(no)) {
    no = 1;
  }
  const type = questionItemType;
  const isRequired = !optional;
  const canMultipleAnswer = answerItems.multipleChoice;
  const columns: LectureSurveyItemChoice[] =
    answerItems.columnItems?.map(({ number, values }) => {
      const mTitle = values.langStringMap[values.defaultLanguage];
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
      const mTitle = values.langStringMap[values.defaultLanguage];
      let mNo = parseInt(number);
      if (isNaN(mNo)) {
        mNo = 1;
      }

      return {
        title: mTitle,
        no: mNo,
      };
    }) || [];
  const questionNumber = `${sequence.index}-${sequence.groupNumber}-${sequence.number}`;
  const visible = true;

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
    questionNumber,
    visible,
  };
}

async function parseSurveyForm(
  surveyId: string
): Promise<LectureSurvey | undefined> {
  const surveyForm = await findSurveyForm(surveyId);
  const { id, titles, questions: remoteQuestions } = surveyForm;
  const title = titles.langStringMap[titles.defaultLanguage];
  const surveyItems = remoteQuestions.map(question => {
    switch (question.questionItemType) {
      case 'Choice':
        return parseChoice(question);
      case 'Essay':
      case 'Date':
      case 'Boolean':
        return parseEssay(question);
      case 'Matrix':
        return parseMatrix(question);
      case 'Criterion':
        return parseCriterion(question, surveyForm.criterionList);
      default:
        return parseEssay(question);
    }
  });
  return {
    id,
    title,
    surveyItems,
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
                names: (criteriaItem.names as unknown) as LangStrings,
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
    const studentJoin: StudentJoin | null = studentJoins.reduce<StudentJoin | null>(
      (r, c) => {
        if (r === null) {
          return c;
        }
        if (c.updateTime > r.updateTime) {
          return c;
        }
        return r;
      },
      null
    );
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
                names: (criteriaItem.names as unknown) as LangStrings,
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

export async function getLectureSurvey(params: LectureRouterParams) {
  const { contentType, contentId, lectureId } = params;
  if (contentType === 'cube') {
    const { contents } = await cacheableFindPersonalCube(contentId);
    if (contents !== undefined && contents.surveyId != '') {
      const lectureSurvey = await parseSurveyForm(contents.surveyId);
      setLectureSurvey(lectureSurvey);
      await getCubeLectureSurveyState(lectureId, contents.surveyCaseId);
    }
  }
  if (contentType === 'coures') {
    const { surveyCase } = await findCoursePlanContents(contentId, lectureId);

    if (
      surveyCase !== undefined &&
      surveyCase !== null &&
      surveyCase.surveyFormId !== ''
    ) {
      const lectureSurvey = await parseSurveyForm(surveyCase.surveyFormId);
      setLectureSurvey(lectureSurvey);
      await getCourseLectureSurveyState(lectureId, surveyCase.id);
    }
  }
  if (contentType === 'community') {
    const surveyCase = await findPostMenuName(contentId, lectureId);
    if (
      surveyCase !== undefined &&
      surveyCase !== null &&
      surveyCase.surveyId !== '' &&
      surveyCase.surveyCaseId !== ''
    ) {
      const lectureSurvey = await parseSurveyForm(surveyCase.surveyId);
      setLectureSurvey(lectureSurvey);

      await getCourseLectureSurveyState(lectureId, surveyCase.surveyCaseId);

      const answerSheet = await findAnswerSheetBySurveyCaseId(
        surveyCase.surveyCaseId
      );

      const lectureSurveySummary = await findSurveySummaryBySurveyCaseIdAndRound(
        surveyCase.surveyCaseId,
        answerSheet?.round || 1
      );
      setLectureSurveySummary(lectureSurveySummary);

      const lectureSurveyAnswerSummary = await findAnswerSummariesBySurveySummaryId(
        lectureSurveySummary.id
      );
      setLectureSurveyAnswerSummaryList(lectureSurveyAnswerSummary);
    }
  }
}
