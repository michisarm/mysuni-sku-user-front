import { Card } from '../../../../model/Card';
import { CardContents } from '../../../../model/CardContents';
import { Cube } from '../../../../model/Cube';
import { LearningContent } from '../../../../model/LearningContent';
import Student from '../../../../model/Student';
import {
  findCardCache,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { findCubesByIdsCache } from '../../../api/cubeApi';
import {
  setIsLoadingState,
  setLectureStructure,
} from '../../../store/LectureStructureStore';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructureChapterItem,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
  LectureStructureItem,
  LectureStructureReportItem,
  LectureStructureSurveyItem,
  LectureStructureTestItem,
} from '../../../viewModel/LectureStructure';
import {
  LectureStructure,
  LectureStructureCardItem,
} from '../../../viewModel/LectureStructure';
import { convertLearningStateToState } from './parseModels';

function parseCubeTestItem(
  card: Card,
  cube: Cube,
  cubeOrder: number,
  cubeStudent?: Student
): LectureStructureTestItem {
  const { id, name } = cube;
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'test',
    cubeType: cube.type,
    pathname: '',
  };
  params.pathname = toPath(params);

  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    switch (cubeStudent.extraWork.testStatus) {
      case 'SAVE':
      case 'SUBMIT':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }
  return {
    id: `test-${id}`,
    name,
    type: 'EXAM',
    params,
    path: params.pathname,
    can: cubeStudent !== undefined,
    state,
    order: cubeOrder,
    student: cubeStudent,
  };
}

function parseCubeReportItem(
  card: Card,
  cube: Cube,
  cubeOrder: number,
  cubeStudent?: Student
): LectureStructureReportItem {
  const { id, name } = cube;
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'report',
    cubeType: cube.type,
    pathname: '',
  };
  params.pathname = toPath(params);
  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    switch (cubeStudent.extraWork.testStatus) {
      case 'SAVE':
      case 'SUBMIT':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }

  return {
    id: `report-${id}`,
    name,
    type: 'REPORT',
    params,
    path: params.pathname,
    can: cubeStudent !== undefined && cubeStudent !== null,
    state,
    order: cubeOrder,
    student: cubeStudent,
  };
}

function parseCubeSurveyItem(
  card: Card,
  cube: Cube,
  cubeOrder: number,
  cubeStudent?: Student
): LectureStructureSurveyItem {
  const { id, name, surveyCaseId } = cube;
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'survey',
    cubeType: cube.type,
    pathname: '',
  };
  params.pathname = toPath(params);
  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    switch (cubeStudent.extraWork.surveyStatus) {
      case 'SAVE':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'SUBMIT':
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }

  return {
    id: surveyCaseId || '',
    name,
    type: 'SURVEY',
    params,
    path: params.pathname,
    can: cubeStudent !== undefined,
    state,
    order: cubeOrder,
    student: cubeStudent,
  };
}

function parseCardTestItem(
  card: Card,
  cardStudent: Student | null
): LectureStructureTestItem {
  const { id, name } = card;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'test',
    pathname: '',
  };
  params.pathname = toPath(params);

  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    switch (cardStudent.extraWork.testStatus) {
      case 'SAVE':
      case 'SUBMIT':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }
  return {
    id: `test-${id}`,
    name,
    type: 'EXAM',
    params,
    path: params.pathname,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    order: -1,
    student: cardStudent,
  };
}

function parseCardReportItem(
  card: Card,
  cardContents: CardContents,
  cardStudent: Student | null
): LectureStructureReportItem {
  const { id, name } = card;
  const {
    reportFileBox: { reportName },
  } = cardContents;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'report',
    pathname: '',
  };
  params.pathname = toPath(params);
  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    switch (cardStudent.extraWork.testStatus) {
      case 'SAVE':
      case 'SUBMIT':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }

  return {
    id: `report-${id}`,
    name: reportName,
    type: 'REPORT',
    params,
    path: params.pathname,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    order: -1,
    student: cardStudent,
  };
}

function parseCardSurveyItem(
  card: Card,
  cardContents: CardContents,
  cardStudent: Student | null
): LectureStructureSurveyItem {
  const { name } = card;
  const { surveyCaseId } = cardContents;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'survey',
    pathname: '',
  };
  params.pathname = toPath(params);
  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    switch (cardStudent.extraWork.surveyStatus) {
      case 'SAVE':
      case 'FAIL':
        state = 'Progress';
        break;
      case 'SUBMIT':
      case 'PASS':
        state = 'Completed';
      default:
        break;
    }
  }

  return {
    id: surveyCaseId,
    name,
    type: 'SURVEY',
    params,
    path: params.pathname,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    order: -1,
    student: cardStudent,
  };
}

function parseCardItem(
  card: Card,
  cardContents: CardContents,
  cardStudent: Student | null
): LectureStructureCardItem {
  const { id, name } = card;
  const { tests, reportFileBox, surveyCaseId } = cardContents;
  const params: LectureParams = {
    cardId: id,
    viewType: 'view',
    pathname: '',
  };
  params.pathname = toPath(params);
  const item: LectureStructureCardItem = {
    cardId: id,
    cubes: [],
    name,
    learningState: cardStudent?.learningState,
    student: cardStudent === null ? undefined : cardStudent,
    order: -1,
    params,
    path: params.pathname,
    type: 'CARD',
    can: true,
    state: convertLearningStateToState(cardStudent?.learningState),
  };
  if (tests !== null && tests.length > 0) {
    item.test = parseCardTestItem(card, cardStudent);
  }
  if (reportFileBox?.report === true) {
    item.report = parseCardReportItem(card, cardContents, cardStudent);
  }
  if (surveyCaseId !== null && surveyCaseId !== '') {
    item.survey = parseCardSurveyItem(card, cardContents, cardStudent);
  }
  return item;
}

function parseDiscussionItem(
  card: Card,
  cardContents: CardContents,
  learningContent: LearningContent,
  order: number,
  cardStudent: Student | null
): LectureStructureDiscussionItem {
  const { contentId, name } = learningContent;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'discussion',
    contentId: contentId.substring(contentId.length - 4),
    pathname: '',
  };
  params.pathname = toPath(params);
  return {
    id: contentId,
    name: name ? name : '',
    type: 'DISCUSSION',
    params,
    path: params.pathname,
    can: cardStudent !== null && cardStudent !== undefined,
    state: 'None',
    order,
    time: cardContents.time,
    creator: cardContents.creatorName,
    creatorAudienceId: card.patronKey.keyString,
  };
}

function parseDurationableCubeItem(
  card: Card,
  cube: Cube,
  order: number,
  cubeStudent?: Student
): LectureStructureDurationableCubeItem {
  const {
    id,
    name,
    type,
    learningTime,
    surveyCaseId,
    hasTest,
    reportName,
  } = cube;
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'view',
    cubeType: cube.type,
    pathname: '',
  };
  params.pathname = toPath(params);
  const item: LectureStructureDurationableCubeItem = {
    cardId: card.id,
    name,
    cubeId: id,
    cubeType: type,
    learningState: cubeStudent?.learningState,
    learningTime,
    student: cubeStudent === null ? undefined : cubeStudent,
    order,
    params,
    path: params.pathname,
    type: 'CUBE',
    can: true,
    state: convertLearningStateToState(cubeStudent?.learningState),
    cube,
    duration: !isNaN(parseInt(cubeStudent?.durationViewSeconds || ''))
      ? parseInt(cubeStudent?.durationViewSeconds || '')
      : undefined,
  };
  if (hasTest) {
    item.test = parseCubeTestItem(card, cube, order, cubeStudent);
  }
  if (reportName !== null && reportName !== '') {
    item.report = parseCubeReportItem(card, cube, order, cubeStudent);
  }
  if (surveyCaseId !== null && surveyCaseId !== '') {
    item.survey = parseCubeSurveyItem(card, cube, order, cubeStudent);
  }
  return item;
}

function parseCubeItem(
  card: Card,
  cube: Cube,
  order: number,
  cubeStudent?: Student
): LectureStructureCubeItem {
  const {
    id,
    name,
    type,
    learningTime,
    surveyCaseId,
    hasTest,
    reportName,
  } = cube;
  if (type === 'Audio' || type === 'Video') {
    return parseDurationableCubeItem(card, cube, order, cubeStudent);
  }
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'view',
    cubeType: cube.type,
    pathname: '',
  };
  params.pathname = toPath(params);
  const item: LectureStructureCubeItem = {
    cardId: card.id,
    name,
    cubeId: id,
    cubeType: type,
    learningState: cubeStudent?.learningState,
    learningTime,
    student: cubeStudent === null ? undefined : cubeStudent,
    order,
    params,
    path: params.pathname,
    type: 'CUBE',
    can: true,
    state: convertLearningStateToState(cubeStudent?.learningState),
    cube,
  };
  if (hasTest) {
    item.test = parseCubeTestItem(card, cube, order, cubeStudent);
  }
  if (reportName !== null && reportName !== '') {
    item.report = parseCubeReportItem(card, cube, order, cubeStudent);
  }
  if (surveyCaseId !== null && surveyCaseId !== '') {
    item.survey = parseCubeSurveyItem(card, cube, order, cubeStudent);
  }
  return item;
}

function parseChapterItem(
  card: Card,
  learningContent: LearningContent,
  order: number
): LectureStructureChapterItem {
  const { contentId, name } = learningContent;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'chapter',
    contentId: contentId.substring(contentId.length - 4),
    pathname: '',
  };
  params.pathname = toPath(params);
  return {
    id: contentId,
    name: name ? name : '',
    type: 'CHAPTER',
    params,
    path: params.pathname,
    can: true,
    state: 'None',
    order,
  };
}

function parseItems(lectureStructure: LectureStructure) {
  const items: LectureStructureItem[] = [
    ...lectureStructure.cubes,
    ...lectureStructure.discussions,
    ...lectureStructure.chapters,
  ].sort((a, b) => a.order - b.order);
  return items;
}

export async function requestCardLectureStructure(cardId: string) {
  setIsLoadingState({ isLoading: true });
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  const myCardRelatedStudentsRom = await findMyCardRelatedStudentsCache(cardId);
  if (
    cardWithContentsAndRelatedCountRom === undefined ||
    myCardRelatedStudentsRom === undefined
  ) {
    setIsLoadingState({ isLoading: false });
    return;
  }
  const { card, cardContents } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    setIsLoadingState({ isLoading: false });
    return;
  }
  const { cardStudent, cubeStudents } = myCardRelatedStudentsRom;
  const cubeIds = cardContents.learningContents
    .filter(({ learningContentType }) => learningContentType === 'Cube')
    .map(({ contentId }) => contentId);
  const cardItem = parseCardItem(card, cardContents, cardStudent);
  const cubes = await findCubesByIdsCache(cubeIds);
  const cubeItems: LectureStructureCubeItem[] = [];
  if (cubes !== undefined) {
    cubes.forEach(cube => {
      const cubeStudent = (cubeStudents != null ? cubeStudents : []).find(
        ({ lectureId }) => lectureId === cube.id
      );
      const order = cardContents.learningContents.findIndex(
        ({ contentId }) => contentId === cube.id
      );
      cubeItems.push(parseCubeItem(card, cube, order, cubeStudent));
    });
  }
  const discussionItems: LectureStructureDiscussionItem[] = [];
  cardContents.learningContents
    .filter(({ learningContentType }) => learningContentType === 'Discussion')
    .forEach(learningContent => {
      const order = cardContents.learningContents.findIndex(
        ({ contentId }) => contentId === learningContent.contentId
      );
      discussionItems.push(
        parseDiscussionItem(
          card,
          cardContents,
          learningContent,
          order,
          cardStudent
        )
      );
    });
  const chapterItems: LectureStructureChapterItem[] = [];
  cardContents.learningContents
    .filter(({ learningContentType }) => learningContentType === 'Chapter')
    .forEach(learningContent => {
      const order = cardContents.learningContents.findIndex(
        ({ contentId }) => contentId === learningContent.contentId
      );
      chapterItems.push(parseChapterItem(card, learningContent, order));
    });
  const lectureStructure: LectureStructure = {
    card: cardItem,
    cubes: cubeItems,
    discussions: discussionItems,
    chapters: chapterItems,
    items: [],
  };
  lectureStructure.items = parseItems(lectureStructure);
  setLectureStructure(lectureStructure);
  setIsLoadingState({ isLoading: false });
}
