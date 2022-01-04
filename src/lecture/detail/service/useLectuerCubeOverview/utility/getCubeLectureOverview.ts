import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import { timeToHourMinuteFormat } from 'shared/helper/dateTimeHelper';
import { findInstructorCache } from '../../../../../expert/present/apiclient/InstructorApi';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { CubeDetail } from '../../../../model/CubeDetail';
import { getDefaultLang } from '../../../../model/LangSupport';
import { findCardCache } from '../../../api/cardApi';
import {
  findContentProviderCache,
  findCubeDetailCache,
} from '../../../api/cubeApi';
import { countByFeedbackId, findReviewSummary } from '../../../api/feedbackApi';
import { makeInMyLectureCdo } from '../../../model/InMyLectureCdo';
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
import { findInstructorWithIdentityCache } from 'expert/apis/instructorApi';
import { Instructor } from 'expert/model/Instructor';
import { SkProfileService } from '../../../../../profile/stores';

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

  const { id, name, langSupports, categories, type } = cube;
  const { difficultyLevel } = cubeContents;
  const { passedStudentCount, studentCount } = cubeReactiveModel;

  const category = categories.find((c) => c.mainCategory);
  const learningTime = timeToHourMinuteFormat(cube.learningTime);
  const operator = operators.find(
    ({ id }) => id === cubeContents?.operator?.keyString
  );
  return {
    name: parsePolyglotString(name, getDefaultLang(langSupports)),
    category: {
      collegeId: category?.collegeId || '',
      channelId: category?.channelId || '',
    },
    difficultyLevel,
    learningTime,
    operator: {
      email: operator?.email || '',
      name: parsePolyglotString(operator?.name, getDefaultLang(langSupports)),
      companyName: parsePolyglotString(
        operator?.companyName,
        getDefaultLang(langSupports)
      ),
    },
    passedStudentCount,
    studentCount,
    cubeType: type,
    cubeId: id,
    hasPinRole: SkProfileService.instance.skProfile.id === operator?.id,
  };
}

async function getLectureDescription(
  cubeDetail: CubeDetail
): Promise<LectureDescription> {
  const { langSupports } = cubeDetail.cube;
  const {
    description: { description, applicants, completionTerms, goal, guide },
    organizerId,
    otherOrganizerName,
  } = cubeDetail.cubeContents;
  const operator = cubeDetail.operators.find(
    ({ id }) => id === cubeDetail?.cubeContents?.operator?.keyString
  );
  let organizer = '';
  if (otherOrganizerName?.length > 0) {
    organizer = otherOrganizerName;
  } else if (organizerId?.length > 0) {
    const contentsProviderInfo = await findContentProviderCache(organizerId);
    if (contentsProviderInfo !== undefined) {
      organizer = parsePolyglotString(
        contentsProviderInfo.name,
        getDefaultLang(contentsProviderInfo.langSupports)
      );
    }
  }
  return {
    description: parsePolyglotString(description, getDefaultLang(langSupports)),
    applicants: parsePolyglotString(applicants, getDefaultLang(langSupports)),
    completionTerms: parsePolyglotString(
      completionTerms,
      getDefaultLang(langSupports)
    ),
    goal: parsePolyglotString(goal, getDefaultLang(langSupports)),
    guide: parsePolyglotString(guide, getDefaultLang(langSupports)),
    organizer,
  };
}

function getLectureSubcategory(cubeDetail: CubeDetail): LectureSubcategory {
  const {
    cube: { categories },
  } = cubeDetail;
  return {
    categories,
  };
}

function getLectureTags(cubeDetail: CubeDetail): LectureTags {
  const {
    cube: { langSupports },
    cubeContents: { tags },
  } = cubeDetail;
  if (tags === null || tags === undefined) {
    return {
      tags: [],
    };
  }
  return {
    tags: parsePolyglotString(tags, getDefaultLang(langSupports))
      .split(',')
      .map((c) => c.trim()),
  };
}

async function getLectureInstructor(
  cubeDetail: CubeDetail
): Promise<LectureInstructor> {
  const {
    cubeContents: { instructors },
  } = cubeDetail;
  const nextInstructors = instructors.slice(0, 0);
  instructors
    .filter((c) => c.representative === true)
    .forEach((instructor) => {
      if (
        !nextInstructors.some((c) => c.instructorId === instructor.instructorId)
      ) {
        nextInstructors.push(instructor);
      }
    });
  instructors
    .filter((c) => c.representative === false)
    .forEach((instructor) => {
      if (
        !nextInstructors.some((c) => c.instructorId === instructor.instructorId)
      ) {
        nextInstructors.push(instructor);
      }
    });
  const proimseArray = nextInstructors.map((c) => {
    return findInstructorWithIdentityCache(c.instructorId)
      .then((r) => {
        if (r !== undefined) {
          c.instructorWithIdentity = r;
        }
      })
      .catch(() => {});
  });
  await Promise.all(proimseArray);
  return {
    instructors: nextInstructors,
  };
}

function getLectureFile(cubeDetail: CubeDetail): Promise<LectureFile> {
  const {
    cubeContents: { fileBoxId },
  } = cubeDetail;
  const fileBoxIds = [fileBoxId];
  return getFiles(fileBoxIds).then((files) => ({ files }));
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
      return {
        average: isNaN(reviewSummary.average) ? 0 : reviewSummary.average,
        id: reviewSummary.id,
        reviewerCount: isNaN(reviewSummary.reviewerCount)
          ? 0
          : reviewSummary.reviewerCount,
      };
    }
  }
  return { id: '', average: 0, reviewerCount: 0 };
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
  const lectureDescription = await getLectureDescription(cubeDetail);
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
