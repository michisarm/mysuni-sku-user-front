import Student from '../../../../model/Student';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import {
  findCubeDetailCache,
  findMyDiscussionCounts,
  findMyTaskConditionCounts,
} from '../../../api/cubeApi';
import {
  getLectureStructure,
  setLectureStructure,
} from '../../../store/LectureStructureStore';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import { State } from '../../../viewModel/LectureState';
import {
  isLectureStructureChapterItem,
  isLectureStructureCubeItem,
  isLectureStructureDiscussionItem,
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

function updateCubeTestItem(
  item: LectureStructureTestItem,
  cubeStudent?: Student
): LectureStructureTestItem {
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
    ...item,
    can: cubeStudent !== undefined,
    state,
    student: cubeStudent,
  };
}

function updateCubeReportItem(
  item: LectureStructureReportItem,
  cubeStudent?: Student
): LectureStructureReportItem {
  let state: State = 'None';
  if (cubeStudent !== undefined && cubeStudent !== null) {
    switch (cubeStudent.extraWork.reportStatus) {
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
    ...item,
    can: cubeStudent !== undefined && cubeStudent !== null,
    state,
    student: cubeStudent,
  };
}

function updateCubeSurveyItem(
  item: LectureStructureSurveyItem,
  cubeStudent?: Student
): LectureStructureSurveyItem {
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
    ...item,
    can: cubeStudent !== undefined,
    state,
    student: cubeStudent,
  };
}

function updateCardTestItem(
  item: LectureStructureTestItem,
  cardStudent: Student | null
): LectureStructureTestItem {
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
    ...item,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    student: cardStudent,
  };
}

function updateCardReportItem(
  item: LectureStructureReportItem,
  cardStudent: Student | null
): LectureStructureReportItem {
  let state: State = 'None';
  if (cardStudent !== undefined && cardStudent !== null) {
    switch (cardStudent.extraWork.reportStatus) {
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
    ...item,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    student: cardStudent,
  };
}

function updateCardSurveyItem(
  item: LectureStructureSurveyItem,
  cardStudent: Student | null
): LectureStructureSurveyItem {
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
    ...item,
    can: cardStudent !== undefined && cardStudent !== null,
    state,
    student: cardStudent,
  };
}

function updateCardItem(
  card: LectureStructureCardItem,
  cardStudent: Student | null
) {
  if (JSON.stringify(cardStudent) === JSON.stringify(card.student)) {
    return card;
  }
  card.learningState = cardStudent?.learningState;
  card.student = cardStudent === null ? undefined : cardStudent;
  card.state = convertLearningStateToState(cardStudent?.learningState);
  if (card.test !== undefined) {
    card.test = updateCardTestItem(card.test, cardStudent);
  }
  if (card.report !== undefined) {
    card.report = updateCardReportItem(card.report, cardStudent);
  }
  if (card.survey !== undefined) {
    card.survey = updateCardSurveyItem(card.survey, cardStudent);
  }
  return { ...card };
}

function updateDiscussionItem(
  card: LectureStructureCardItem,
  item: LectureStructureDiscussionItem,
  cardStudent: Student | null
): LectureStructureDiscussionItem {
  if (JSON.stringify(cardStudent) === JSON.stringify(card.student)) {
    return item;
  }

  return {
    ...item,
    can: cardStudent !== null && cardStudent !== undefined,
  };
}

function updateDurationableCubeItem(
  item: LectureStructureDurationableCubeItem,
  cubeStudent?: Student
): LectureStructureDurationableCubeItem {
  const cube: LectureStructureDurationableCubeItem = {
    ...item,
    learningState: cubeStudent?.learningState,
    student: cubeStudent === null ? undefined : cubeStudent,
    state: convertLearningStateToState(cubeStudent?.learningState),
    duration: !isNaN(parseInt(cubeStudent?.durationViewSeconds || ''))
      ? parseInt(cubeStudent?.durationViewSeconds || '')
      : undefined,
  };
  if (cube.test !== undefined) {
    cube.test = updateCubeTestItem(cube.test, cubeStudent);
    cube.test.can = cube.test.can && cube.duration === 100;
  }
  if (cube.report !== undefined) {
    cube.report = updateCubeReportItem(cube.report, cubeStudent);
    cube.report.can = cube.report.can && cube.duration === 100;
  }
  if (cube.survey !== undefined) {
    cube.survey = updateCubeSurveyItem(cube.survey, cubeStudent);
  }
  return cube;
}

async function updateDiscussionCubeItem(
  item: LectureStructureCubeItem,
  cubeStudent?: Student
): Promise<LectureStructureCubeItem> {
  if (item.test === undefined && item.report === undefined) {
    return item;
  }
  const cubeDetail = await findCubeDetailCache(item.cubeId);
  if (cubeDetail !== undefined) {
    const {
      cubeMaterial: { cubeDiscussion },
    } = cubeDetail;
    if (
      cubeDiscussion?.automaticCompletion === true &&
      cubeStudent !== undefined &&
      cubeStudent !== null
    ) {
      const {
        completionCondition: { commentCount, subCommentCount },
      } = cubeDiscussion;
      const myDiscussionCounts = await findMyDiscussionCounts(cubeStudent.id);
      if (myDiscussionCounts === undefined) {
        if (item.test !== undefined) {
          item.test.can = false;
        }
        if (item.report !== undefined) {
          item.report.can = false;
        }
      } else {
        if (item.test !== undefined) {
          item.test.can =
            item.test.can &&
            myDiscussionCounts.commentCount >= commentCount &&
            myDiscussionCounts.subCommentCount >= subCommentCount;
        }
        if (item.report !== undefined) {
          item.report.can =
            item.report.can &&
            myDiscussionCounts.commentCount >= commentCount &&
            myDiscussionCounts.subCommentCount >= subCommentCount;
        }
      }
    }
  }
  return item;
}

async function updateTaskCubeItem(
  item: LectureStructureCubeItem,
  cubeStudent?: Student
): Promise<LectureStructureCubeItem> {
  if (item.test === undefined && item.report === undefined) {
    return item;
  }
  const cubeDetail = await findCubeDetailCache(item.cubeId);
  if (cubeDetail !== undefined) {
    const {
      cubeMaterial: { board },
    } = cubeDetail;
    if (
      board?.automaticCompletion === true &&
      cubeStudent !== undefined &&
      cubeStudent !== null
    ) {
      const {
        completionCondition: { postCount, commentCount, subCommentCount },
      } = board;
      const myTaskCounts = await findMyTaskConditionCounts(cubeStudent.id);
      if (myTaskCounts === undefined) {
        if (item.test !== undefined) {
          item.test.can = false;
        }
        if (item.report !== undefined) {
          item.report.can = false;
        }
      } else {
        if (item.test !== undefined) {
          item.test.can =
            item.test.can &&
            myTaskCounts.postCount >= postCount &&
            myTaskCounts.commentCount >= commentCount &&
            myTaskCounts.subCommentCount >= subCommentCount;
        }
        if (item.report !== undefined) {
          item.report.can =
            item.report.can &&
            myTaskCounts.postCount >= postCount &&
            myTaskCounts.commentCount >= commentCount &&
            myTaskCounts.subCommentCount >= subCommentCount;
        }
      }
    }
  }
  return item;
}

async function updateCubeItem(
  item: LectureStructureCubeItem,
  cubeStudent?: Student
) {
  if (JSON.stringify(item.student) === JSON.stringify(cubeStudent)) {
    return item;
  }
  if (item.isDurationable === true) {
    return updateDurationableCubeItem(item, cubeStudent);
  }
  const cube: LectureStructureCubeItem = {
    ...item,
    learningState: cubeStudent?.learningState,
    student: cubeStudent === null ? undefined : cubeStudent,
    state: convertLearningStateToState(cubeStudent?.learningState),
  };
  if (cube.test !== undefined) {
    cube.test = updateCubeTestItem(cube.test, cubeStudent);
  }
  if (cube.report !== undefined) {
    cube.report = updateCubeReportItem(cube.report, cubeStudent);
  }
  if (cube.survey !== undefined) {
    cube.survey = updateCubeSurveyItem(cube.survey, cubeStudent);
  }
  if (cube.cubeType === 'Discussion') {
    const discussionCubeItem = await updateDiscussionCubeItem(
      cube,
      cubeStudent
    );
    return discussionCubeItem;
  }
  if (cube.cubeType === 'Task') {
    const taskCubeItem = await updateTaskCubeItem(cube, cubeStudent);
    return taskCubeItem;
  }
  return cube;
}

function updateItems(
  lectureStructure: LectureStructure
): LectureStructureItem[] {
  const items = lectureStructure.items
    .map((item) => {
      if (isLectureStructureCubeItem(item)) {
        return lectureStructure.cubes.find(
          (c) => c.cubeId === item.cubeId
        ) as LectureStructureItem;
      }
      if (isLectureStructureChapterItem(item)) {
        return lectureStructure.chapters.find(
          (c) => c.id === item.id
        ) as LectureStructureItem;
      }
      if (isLectureStructureDiscussionItem(item)) {
        return lectureStructure.discussions.find(
          (c) => c.id === item.id
        ) as LectureStructureItem;
      }
    })
    .filter((c) => c !== undefined) as LectureStructureItem[];
  return items;
}

export async function updateCardLectureStructure(cardId: string) {
  const lectureStructure = getLectureStructure();
  if (lectureStructure === undefined || !lectureStructure.card.cardId) {
    return;
  }
  const myCardRelatedStudentsRom = await findMyCardRelatedStudentsCache(cardId);
  if (myCardRelatedStudentsRom === undefined) {
    return;
  }
  const { cardStudent, cubeStudents } = myCardRelatedStudentsRom;
  lectureStructure.cubes = await Promise.all(
    lectureStructure.cubes.map((item) => {
      const cubeStudent = findCubeStudent(item.cubeId, cubeStudents);
      return updateCubeItem(item, cubeStudent);
    })
  );
  lectureStructure.discussions = lectureStructure.discussions.map((item) => {
    return updateDiscussionItem(lectureStructure.card, item, cardStudent);
  });

  lectureStructure.items = updateItems(lectureStructure);

  lectureStructure.card = updateCardItem(lectureStructure.card, cardStudent);

  lectureStructure.card.canSubmit = lectureStructure.cubes.every(
    (c) => c.state === 'Completed'
  );

  setLectureStructure({ ...lectureStructure });
}
