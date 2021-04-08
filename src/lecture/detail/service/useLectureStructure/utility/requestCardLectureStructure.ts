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
  };

  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    state = 'Progress';
    if (
      cubeStudent !== undefined &&
      cubeStudent !== null &&
      (cubeStudent.learningState === 'Passed' ||
        cubeStudent.learningState === 'TestPassed' ||
        cubeStudent.learningState === 'HomeworkWaiting')
    ) {
      state = 'Completed';
    }
  }
  return {
    id,
    name,
    type: 'EXAM',
    params,
    path: toPath(params),
    can: cubeStudent !== undefined,
    state,
    order: cubeOrder,
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
  };
  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    if (
      cubeStudent.homeworkContent !== null ||
      cubeStudent.homeworkFileBoxId !== null
    ) {
      state = 'Progress';
    }
    if (cubeStudent.learningState === 'Passed') {
      state = 'Completed';
    }
  }

  return {
    id,
    name,
    type: 'REPORT',
    params,
    path: toPath(params),
    can: cubeStudent !== undefined,
    state,
    order: cubeOrder,
  };
}

function parseCubeSurveyItem(
  card: Card,
  cube: Cube,
  cubeOrder: number,
  cubeStudent?: Student
): LectureStructureSurveyItem {
  const { id, name } = cube;
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'survey',
    cubeType: cube.type,
  };
  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    if (cubeStudent.extraWork.surveyStatus === 'SUBMIT') {
      state = 'Progress';
    } else if (cubeStudent.extraWork.surveyStatus === 'PASS') {
      state = 'Completed';
    }
  }

  return {
    id,
    name,
    type: 'SURVEY',
    params,
    path: toPath(params),
    can: cubeStudent !== undefined,
    state,
    order: cubeOrder,
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
  };

  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    state = 'Progress';
    if (
      cardStudent !== undefined &&
      cardStudent !== null &&
      (cardStudent.learningState === 'Passed' ||
        cardStudent.learningState === 'TestPassed' ||
        cardStudent.learningState === 'HomeworkWaiting')
    ) {
      state = 'Completed';
    }
  }
  return {
    id,
    name,
    type: 'EXAM',
    params,
    path: toPath(params),
    can: cardStudent !== undefined,
    state,
    order: -1,
  };
}

function parseCardReportItem(
  card: Card,
  cardStudent: Student | null
): LectureStructureReportItem {
  const { id, name } = card;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'report',
  };
  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    if (
      cardStudent.homeworkContent !== null ||
      cardStudent.homeworkFileBoxId !== null
    ) {
      state = 'Progress';
    }
    if (cardStudent.learningState === 'Passed') {
      state = 'Completed';
    }
  }

  return {
    id,
    name,
    type: 'REPORT',
    params,
    path: toPath(params),
    can: cardStudent !== undefined,
    state,
    order: -1,
  };
}

function parseCardSurveyItem(
  card: Card,
  cardStudent: Student | null
): LectureStructureSurveyItem {
  const { id, name } = card;
  const params: LectureParams = {
    cardId: card.id,
    viewType: 'survey',
  };
  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    if (cardStudent.extraWork.surveyStatus === 'SUBMIT') {
      state = 'Progress';
    } else if (cardStudent.extraWork.surveyStatus === 'PASS') {
      state = 'Completed';
    }
  }

  return {
    id,
    name,
    type: 'SURVEY',
    params,
    path: toPath(params),
    can: cardStudent !== undefined,
    state,
    order: -1,
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
  };
  const item: LectureStructureCardItem = {
    cardId: id,
    cubes: [],
    name,
    learningState: cardStudent?.learningState,
    student: cardStudent === null ? undefined : cardStudent,
    order: -1,
    params,
    path: toPath(params),
    type: 'CARD',
    can: true,
    state: convertLearningStateToState(cardStudent?.learningState),
  };
  if (tests !== null && tests.length > 0) {
    item.test = parseCardTestItem(card, cardStudent);
  }
  if (reportFileBox?.report === true) {
    item.report = parseCardReportItem(card, cardStudent);
  }
  if (surveyCaseId !== null || surveyCaseId !== '') {
    item.survey = parseCardSurveyItem(card, cardStudent);
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
    discussionId: contentId.substring(contentId.length - 4),
  };
  return {
    id: card.id,
    name: name ? name : '',
    type: 'DISCUSSION',
    params,
    path: toPath(params),
    can: cardStudent !== null,
    state: 'None',
    order,
    time: cardContents.time,
    creator: cardContents.creatorName,
    creatorAudienceId: card.patronKey.keyString,
  };
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
  const params: LectureParams = {
    cardId: card.id,
    cubeId: id,
    viewType: 'view',
    cubeType: cube.type,
  };
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
    path: toPath(params),
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
  if (surveyCaseId !== null || surveyCaseId !== '') {
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
    chapterId: contentId.substring(contentId.length - 4),
  };
  return {
    id: card.id,
    name: name ? name : '',
    type: 'CHAPTER',
    params,
    path: toPath(params),
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
