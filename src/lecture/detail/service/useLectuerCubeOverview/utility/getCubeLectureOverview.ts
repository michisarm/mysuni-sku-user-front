import { findLectureCard } from 'lecture/detail/api/lectureApi';
import {
  findCubeIntro,
  findPersonalCube,
} from 'lecture/detail/api/mPersonalCubeApi';
import CubeIntro from 'lecture/detail/model/CubeIntro';
import LectureCard from 'lecture/detail/model/LectureCard';
import PersonalCube from 'lecture/detail/model/PersonalCube';
import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
import { timeToHourMinuteFormat } from 'shared/helper/dateTimeHelper';
import { CourseSetModel } from '../../../../../course/model';
import { countByFeedbackId, findReviewSummary } from '../../../api/feedbackApi';
import { findInMyLecture } from '../../../api/mytrainingApi';
import InMyLectureCdo from '../../../model/InMyLectureCdo';
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
  personalCube: PersonalCube,
  cubeIntro: CubeIntro,
  lectureCard: LectureCard
): Promise<LectureCubeSummary> {
  const category = personalCube.category;
  const difficultyLevel = cubeIntro.difficultyLevel;
  const learningTime = timeToHourMinuteFormat(cubeIntro.learningTime);
  const operator = cubeIntro.operation.operator;
  const mylecture = await findInMyLecture(lectureCard.usid, 'Card');
  return {
    name: personalCube.name,
    category: {
      college: category.college,
      channel: category.channel,
    },
    difficultyLevel,
    learningTime,
    operator,
    passedCount: lectureCard.passedStudentCount,
    studentCount: lectureCard.studentCount,
    cubeType: personalCube.contents.type,
    mytrainingId: getEmpty(mylecture && mylecture.id),
  };
}

function getLectureDescription(cubeIntro: CubeIntro): LectureDescription {
  const {
    description,
    applicants,
    completionTerms,
    goal,
    guide,
  } = cubeIntro.description;
  const organizer = cubeIntro.operation.organizer.name;
  return { description, applicants, completionTerms, goal, guide, organizer };
}

function getLectureSubcategory(personalCube: PersonalCube): LectureSubcategory {
  const { subCategories } = personalCube;
  return {
    categories: subCategories.map(({ channel, college }) => ({
      channel,
      college,
    })),
  };
}

function getLectureTags(personalCube: PersonalCube): LectureTags {
  const { tags } = personalCube;
  return {
    tags,
  };
}

function getLectureInstructor(cubeIntro: CubeIntro): LectureInstructor {
  const { instructor } = cubeIntro;
  return {
    instructors: instructor === null ? [] : instructor,
  };
}

function getLectureFile(fileBoxId: string): Promise<LectureFile> {
  const fileBoxIds = [fileBoxId];
  return getFiles(fileBoxIds).then(files => ({ files }));
}

async function getLectureComment(
  lectureCard: LectureCard
): Promise<LectureComment> {
  const { commentId, reviewId } = lectureCard;
  if (commentId !== null) {
    const { count } = await countByFeedbackId(commentId);
    return { commentId, reviewId, commentsCount: count };
  }
  return { commentId, reviewId, commentsCount: 0 };
}

async function getLectureReview(
  lectureCard: LectureCard
): Promise<LectureReview> {
  const { reviewId } = lectureCard;
  if (reviewId !== null) {
    const reviewSummary = await findReviewSummary(reviewId);
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

function makeInMyLectureCdo(
  personalCube: PersonalCube,
  cubeIntro: CubeIntro,
  lectureCard: LectureCard
): InMyLectureCdo {
  return {
    serviceType: 'Card',
    serviceId: lectureCard.usid,
    category: personalCube.category,
    name: personalCube.name,
    description: cubeIntro.description.description,
    cubeType: personalCube.contents.type,
    learningTime: cubeIntro.learningTime,
    stampCount: 0,
    coursePlanId: '',
    requiredSubsidiaries: personalCube.requiredSubsidiaries,
    cubeId: personalCube.personalCubeId,
    courseSetJson: new CourseSetModel(),
    courseLectureUsids: [],
    lectureCardUsids: [],
    reviewId: lectureCard.reviewId,
    baseUrl: personalCube.iconBox.baseUrl,
    servicePatronKeyString: personalCube.patronKey.keyString,
  };
}

function findCube(personalCubeId: string) {
  return findPersonalCube(personalCubeId);
}

function findIntro(cubeIntroId: string) {
  return findCubeIntro(cubeIntroId);
}

export async function getCubeLectureOverview(
  personalCubeId: string,
  lectureCardId: string
) {
  const personalCube = await findCube(personalCubeId);
  const cubeIntro = await findIntro(personalCube.cubeIntro.id);
  if (cubeIntro === undefined) {
    return
  }
  const lectureCard = await findLectureCard(lectureCardId);
  const lectureSummary = await getLectureSummary(
    personalCube,
    cubeIntro,
    lectureCard
  );
  setLectureCubeSummary(lectureSummary);
  const lectureDescription = getLectureDescription(cubeIntro);
  setLectureDescription(lectureDescription);
  const lectureSubcategory = getLectureSubcategory(personalCube);
  setLectureSubcategory(lectureSubcategory);
  const lectureTags = getLectureTags(personalCube);
  setLectureTags(lectureTags);
  const lectureInstructor = getLectureInstructor(cubeIntro);
  setLectureInstructor(lectureInstructor);
  setLecturePrecourse(getEmptyLecturePrecourse());
  if (personalCube.contents.fileBoxId !== '') {
    const lectureFile = await getLectureFile(personalCube.contents.fileBoxId);
    setLectureFile(lectureFile);
  }
  const lectureComment = await getLectureComment(lectureCard);
  if (
    lectureComment.commentId === undefined ||
    lectureComment.commentId === null
  ) {
    setLectureComment();
  } else {
    setLectureComment(lectureComment);
  }
  const lectureReview = await getLectureReview(lectureCard);
  setLectureReview(lectureReview);
  setInMyLectureCdo(makeInMyLectureCdo(personalCube, cubeIntro, lectureCard));
}
