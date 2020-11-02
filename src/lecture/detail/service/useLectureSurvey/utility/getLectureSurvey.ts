import { CriteriaItemModel } from '../../../../../survey/form/model/CriteriaItemModel';
import { CriterionModel } from '../../../../../survey/form/model/CriterionModel';
import {
  findCoursePlanContents,
  findIsJsonStudentByCube,
} from '../../../api/lectureApi';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../../api/surveyApi';
import LangStrings from '../../../model/LangStrings';
import StudentJoin from '../../../model/StudentJoin';
import Question from '../../../model/SurveyQuestion';
import {
  setLectureSurvey,
  setLectureSurveyState,
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
      return {
        title: mTitle,
        no: mNo,
        image: mImage,
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
    criterion?.criteriaItems?.map(({ value, names }) => {
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

  return {
    title,
    image,
    no,
    id,
    type,
    isRequired,
    maxLength,
    questionNumber,
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
  };
}

async function parseSurveyForm(
  surveyId: string
): Promise<LectureSurvey | undefined> {
  const surveyForm = await findSurveyForm(surveyId);
  console.log('surveyForm', surveyForm);
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
): Promise<LectureSurveyState> {
  let state: State = 'None';

  const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
  if (answerSheet !== null) {
    const {
      round,
      progress,
      evaluationSheet: { id, answerSheetId, answers },
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
        criteriaItem: {
          names: (criteriaItem.names as unknown) as LangStrings,
          value: criteriaItem.value,
          index: criteriaItem.index,
        },
        itemNumbers,
        sentence,
        matrixItem: matrixItem === null ? undefined : matrixItem,
      })
    );
    return {
      id,
      answerSheetId,
      answerItem,
      state,
      surveyCaseId,
      round,
      serviceId,
    };
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
      return { state, surveyCaseId, round: studentJoin.round, serviceId };
    }
  }
  return { state, surveyCaseId, round: 1, serviceId };
}
async function getCourseLectureSurveyState(
  serviceId: string,
  surveyCaseId: string
): Promise<LectureSurveyState> {
  let state: State = 'None';

  const answerSheet = await findAnswerSheetBySurveyCaseId(surveyCaseId);
  if (answerSheet !== null) {
    const {
      round,
      progress,
      evaluationSheet: { id, answerSheetId, answers },
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
        criteriaItem: {
          names: (criteriaItem.names as unknown) as LangStrings,
          value: criteriaItem.value,
          index: criteriaItem.index,
        },
        itemNumbers,
        sentence,
        matrixItem: matrixItem === null ? undefined : matrixItem,
      })
    );
    return {
      id,
      answerSheetId,
      answerItem,
      state,
      surveyCaseId,
      round,
      serviceId,
    };
  }
  return { state, surveyCaseId, round: 1, serviceId };
}

export async function getLectureSurvey(params: LectureRouterParams) {
  const { contentType, contentId, lectureId } = params;
  if (contentType === 'cube') {
    const { contents } = await findPersonalCube(contentId);
    if (contents !== undefined && contents.surveyId != '') {
      const lectureSurvey = await parseSurveyForm(contents.surveyId);
      setLectureSurvey(lectureSurvey);
      const lectureSurveyTask = await getCubeLectureSurveyState(
        lectureId,
        contents.surveyCaseId
      );
      setLectureSurveyState(lectureSurveyTask);
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
      const lectureSurveyTask = await getCourseLectureSurveyState(
        lectureId,
        surveyCase.id
      );
      setLectureSurveyState(lectureSurveyTask);
    }
  }
}
