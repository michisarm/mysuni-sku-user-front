import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import { timeToHourMinuteFormat } from 'shared/helper/dateTimeHelper';
import { findInstructorCache } from '../../../../../expert/present/apiclient/InstructorApi';
import { Card } from '../../../../model/Card';
import { CubeDetail } from '../../../../model/CubeDetail';
import {
  findCardCache,
  findCardWithLearningContentCounts,
} from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import { countByFeedbackId, findReviewSummary } from '../../../api/feedbackApi';
import { findInMyLecture } from '../../../api/mytrainingApi';
import InMyLectureCdo, {
  makeInMyLectureCdo,
} from '../../../model/InMyLectureCdo';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCubeSummary,
  setLectureDescription,
  setLectureFile,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../../store/LectureOverviewStore';
import { getFiles } from '../../../utility/depotFilesHelper';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import { getEmptyLecturePrecourse } from '../../../viewModel/LectureOverview/LecturePrecourse';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';

function getEmpty(text?: string) {
  if (text === undefined || text === null || text == '') {
    return undefined;
  }
  return text;
}

async function getLectureSummary(
  cubeDetail: CubeDetail
): Promise<LectureCubeSummary> {
  const { cube, cubeContents, cubeReactiveModel, operators } = cubeDetail;

  const { id, name, categories, type } = cube;
  const { difficultyLevel } = cubeContents;
  const { passedStudentCount, studentCount } = cubeReactiveModel;

  const category = categories.find(c => c.mainCategory);
  const learningTime = timeToHourMinuteFormat(cube.learningTime);
  const mylecture = await findInMyLecture(cube.id, 'Cube');
  const operator = operators.find(
    ({ id }) => id === cubeContents?.operator?.keyString
  );
  return {
    name,
    category: {
      collegeId: category?.collegeId || '',
      channelId: category?.channelId || '',
    },
    difficultyLevel,
    learningTime,
    operator: {
      email: operator?.email || '',
      name: operator?.names?.langStringMap.ko || '',
      companyName: operator?.companyNames?.langStringMap.ko || '',
    },
    passedStudentCount,
    studentCount,
    cubeType: type,
    mytrainingId: getEmpty(mylecture && mylecture.id),
    cubeId: id,
  };
}

function getLectureDescription(cubeDetail: CubeDetail): LectureDescription {
  const {
    description: { description, applicants, completionTerms, goal, guide },
  } = cubeDetail.cubeContents;
  const operator = cubeDetail.operators.find(
    ({ id }) => id === cubeDetail?.cubeContents?.operator?.keyString
  );
  const organizer = operator?.companyNames?.langStringMap.ko || '';
  return { description, applicants, completionTerms, goal, guide, organizer };
}

function getLectureSubcategory(cubeDetail: CubeDetail): LectureSubcategory {
  const {
    cube: { categories },
  } = cubeDetail;
  return {
    categories: categories.filter(c => !c.mainCategory),
  };
}

function getLectureTags(cubeDetail: CubeDetail): LectureTags {
  const {
    cubeContents: { tags },
  } = cubeDetail;
  if (tags === null || tags === undefined) {
    return {
      tags: [],
    };
  }
  return {
    tags,
  };
}

async function getLectureInstructor(cubeDetail: CubeDetail) {
  const {
    cubeContents: { instructors },
  } = cubeDetail;
  const proimseArray = instructors.map(c => {
    return findInstructorCache(c.instructorId)
      .then(r => {
        if (r !== undefined) {
          c.memberSummary = {
            department: r.memberSummary.department,
            email: r.memberSummary.email,
            name: r.memberSummary.name,
            photoId: r.memberSummary.photoId,
          };
        }
      })
      .catch(() => {});
  });
  await Promise.all(proimseArray);
  return {
    instructors,
  };
}

function getLectureFile(cubeDetail: CubeDetail): Promise<LectureFile> {
  const {
    cubeContents: { fileBoxId },
  } = cubeDetail;
  const fileBoxIds = [fileBoxId];
  return getFiles(fileBoxIds).then(files => ({ files }));
}

async function getLectureComment(
  cubeDetail: CubeDetail
): Promise<LectureComment> {
  const {
    cubeContents: { commentFeedbackId, reviewFeedbackId },
  } = cubeDetail;
  if (commentFeedbackId !== null) {
    const { count } = await countByFeedbackId(commentFeedbackId);
    return {
      commentId: commentFeedbackId,
      reviewId: reviewFeedbackId,
      commentsCount: count,
    };
  }
  return {
    commentId: commentFeedbackId,
    reviewId: reviewFeedbackId,
    commentsCount: 0,
  };
}

async function getLectureReview(
  cubeDetail: CubeDetail
): Promise<LectureReview> {
  const {
    cubeContents: { reviewFeedbackId },
  } = cubeDetail;
  if (reviewFeedbackId !== null) {
    const reviewSummary = await findReviewSummary(reviewFeedbackId);
    if (
      reviewSummary !== null &&
      reviewSummary !== undefined &&
      reviewSummary.average !== undefined
    ) {
      return { average: reviewSummary.average, id: reviewSummary.id };
    }
  }
  return { id: '', average: 0 };
}

export async function getCubeLectureOverview(cardId: string, cubeId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail === undefined) {
    return;
  }
  const lectureSummary = await getLectureSummary(cubeDetail);
  setLectureCubeSummary(lectureSummary);
  const lectureDescription = getLectureDescription(cubeDetail);
  setLectureDescription(lectureDescription);
  const lectureSubcategory = getLectureSubcategory(cubeDetail);
  setLectureSubcategory(lectureSubcategory);
  const lectureTags = getLectureTags(cubeDetail);
  setLectureTags(lectureTags);
  const lectureInstructor = await getLectureInstructor(cubeDetail);
  setLectureInstructor(lectureInstructor);
  setLecturePrecourse(getEmptyLecturePrecourse());
  if (
    cubeDetail.cubeContents.fileBoxId !== null &&
    cubeDetail.cubeContents.fileBoxId !== ''
  ) {
    const lectureFile = await getLectureFile(cubeDetail);
    setLectureFile(lectureFile);
  } else {
    setLectureFile();
  }
  const lectureComment = await getLectureComment(cubeDetail);
  if (
    lectureComment.commentId === undefined ||
    lectureComment.commentId === null
  ) {
    setLectureComment();
  } else {
    setLectureComment(lectureComment);
  }
  const lectureReview = await getLectureReview(cubeDetail);
  setLectureReview(lectureReview);
  setInMyLectureCdo(makeInMyLectureCdo(card));
}
