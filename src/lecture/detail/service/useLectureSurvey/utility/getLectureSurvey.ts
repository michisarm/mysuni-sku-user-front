import { findCoursePlanContents } from '../../../api/lectureApi';
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import { findSurveyForm } from '../../../api/surveyApi';
import Question from '../../../model/SurveyQuestion';
import { setLectureSurvey } from '../../../store/LectureSurveyStore';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import LectureSurvey, {
  LectureSurveyItem,
  LectureSurveyItemChoice,
} from '../../../viewModel/LectureSurvey';

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

export async function getLectureSurvey(params: LectureRouterParams) {
  const { contentType, contentId, lectureId } = params;
  if (contentType === 'cube') {
    const { contents } = await findPersonalCube(contentId);
    if (contents !== undefined && contents.surveyId != '') {
      const lectureSurvey = await parseSurveyForm(contents.surveyId);
      setLectureSurvey(lectureSurvey);
      console.log('lectureSurvey', lectureSurvey);
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
      console.log('lectureSurvey', lectureSurvey);
    }
  }
}
