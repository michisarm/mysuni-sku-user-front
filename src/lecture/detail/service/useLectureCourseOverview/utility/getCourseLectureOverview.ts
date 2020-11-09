import { findCoursePlanContents, findMenuArrange } from '../../../api/lectureApi';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import {
  setInMyLectureCdo,
  setLectureComment,
  setLectureCourseSummary,
  setLectureDescription,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureRelations,
  setLectureReview,
  setLectureSubcategory,
  setLectureTags,
} from '../../../store/LectureOverviewStore';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CoursePlanComplex from '../../../model/CoursePlanComplex';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';
import LectureCourseSummary from '../../../viewModel/LectureOverview/LectureCourseSummary';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import InMyLectureCdo from '../../../model/InMyLectureCdo';
import LectureParams from '../../../viewModel/LectureParams';
import { CourseSetModel } from '../../../../../course/model';
import { findInMyLecture } from '../../../api/mytrainingApi';
import Instructor from '../../../model/Instructor';

function getEmpty(text?: string) {
  if (text === undefined || text === null || text == '') {
    return undefined;
  }
  return text;
}

async function getLectureSummary(
  params: LectureParams,
  coursePlanComplex: CoursePlanComplex
): Promise<LectureCourseSummary> {
  const { serviceType, serviceId, lectureType, lectureId } = params;
  const category = coursePlanComplex.coursePlan.category;
  const learningTime = timeToHourMinuteFormat(
    coursePlanComplex.coursePlan.learningTime
  );
  const operator = coursePlanComplex.coursePlan.courseOperator;
  const iconBox = coursePlanComplex.coursePlan.iconBox;
  const mylecture = await findInMyLecture(
    lectureId || serviceId!,
    lectureType !== undefined ? 'Course' : serviceType!
  );
  return {
    name: coursePlanComplex.coursePlan.name,
    category: {
      college: category.college,
      channel: category.channel,
    },
    learningTime,
    operator,
    stampCount: coursePlanComplex.coursePlan.stamp.stampCount,
    passedCount: coursePlanComplex.courseLecture.passedStudentCount,
    studentCount: coursePlanComplex.courseLecture.studentCount,
    iconBox,
    mytrainingId: getEmpty(mylecture && mylecture.id),
  };
}

function getLectureDescription(
  coursePlanComplex: CoursePlanComplex
): LectureDescription {
  const { description } = coursePlanComplex.coursePlanContents;
  return { description };
}

function getLectureSubcategory(
  coursePlanComplex: CoursePlanComplex
): LectureSubcategory {
  const { subCategories } = coursePlanComplex.coursePlan;
  return {
    categories: subCategories.map(({ channel, college }) => ({
      channel,
      college,
    })),
  };
}

function getLectureTags(coursePlanComplex: CoursePlanComplex): LectureTags {
  const { tags } = coursePlanComplex.coursePlan.courseOpen;
  return {
    tags,
  };
}

function getLectureInstructor(
  coursePlanComplex: CoursePlanComplex
): LectureInstructor {
  const { instructor } = coursePlanComplex.coursePlanContents;
  return {
    instructors: instructor === null ? [] : instructor,
  };
}

function getLecturePrecourse(
  coursePlanComplex: CoursePlanComplex,
  path: string
): LecturePrecourse {
  const { preCourseLectures } = coursePlanComplex;
  return {
    path,
    courses: preCourseLectures.map(
      ({ required, name, coursePlanId, serviceType, serviceId }) => ({
        isRequired: required === 1,
        name,
        coursePlanId,
        serviceType,
        serviceId,
      })
    ),
  };
}

function getLectureComment(
  coursePlanComplex: CoursePlanComplex
): LectureComment {
  const {
    commentCountRdo: { feedbackId, count },
    reviewSummary,
  } = coursePlanComplex;
  return {
    commentId: feedbackId,
    reviewId: reviewSummary !== null ? reviewSummary.id : '',
    commentsCount: count,
  };
}

function getLectureReview(coursePlanComplex: CoursePlanComplex): LectureReview {
  if (coursePlanComplex.reviewSummary === null) {
    return {
      id: '',
      average: 0,
    };
  }
  const {
    reviewSummary: { id, average },
  } = coursePlanComplex;
  return {
    id,
    average,
  };
}

async function getLectureRelations(coursePlanComplex: CoursePlanComplex): Promise<LectureRelations | void> {
  const { coursePlanContents: { relations } } = coursePlanComplex
  if (Array.isArray(relations) && relations.length > 0) {
    const serviceIds = relations.map(c => c.lectureCardId);
    const arrange = await findMenuArrange(serviceIds);
    if (arrange !== null && arrange !== undefined && Array.isArray(arrange.results)) { return { lectures: arrange.results } }
  }
}

function makeInMyLectureCdo(
  params: LectureParams,
  coursePlanComplex: CoursePlanComplex
): InMyLectureCdo {
  const { serviceType, serviceId, lectureType, lectureId } = params;
  const lecture =
    coursePlanComplex.courseLecture.usid !== null
      ? coursePlanComplex.courseLecture
      : coursePlanComplex.programLecture;
  return {
    baseUrl: coursePlanComplex.coursePlan.iconBox.baseUrl,
    category: coursePlanComplex.coursePlan.category,
    courseLectureUsids: lecture.courseLectureUsids,
    lectureCardUsids: lecture.lectureCardUsids,
    coursePlanId: coursePlanComplex.coursePlan.coursePlanId,
    courseSetJson: (coursePlanComplex.coursePlanContents
      .courseSet as unknown) as CourseSetModel,
    cubeId: '',
    description: coursePlanComplex.coursePlanContents.description,
    learningTime: coursePlanComplex.coursePlan.learningTime,
    name: coursePlanComplex.coursePlan.name,
    requiredSubsidiaries: [],
    reviewId:
      coursePlanComplex.reviewSummary !== null
        ? coursePlanComplex.reviewSummary.id
        : '',
    serviceId: lectureId || serviceId!,
    servicePatronKeyString: coursePlanComplex.coursePlan.patronKey.keyString,
    serviceType: lectureType !== undefined ? 'Course' : serviceType!,
    stampCount: coursePlanComplex.coursePlan.stamp.stampCount,
  };
}

function findCoursePlanComplex(coursePlanId: string, serviceId: string) {
  return findCoursePlanContents(coursePlanId, serviceId);
}

export async function getCourseLectureOverview(
  params: LectureParams,
  coursePlanId: string,
  serviceId: string,
  collegeId: string,
  cineroomId?: string
) {
  const coursePlanComplex = await findCoursePlanComplex(
    coursePlanId,
    serviceId
  );
  let path = `/lecture/college/${collegeId}`;
  if (cineroomId !== undefined) {
    path = `/lecture/cineroom/${cineroomId}/college/${collegeId}`;
  }
  const lectureSummary = await getLectureSummary(params, coursePlanComplex);
  setLectureCourseSummary(lectureSummary);
  const lectureDescription = getLectureDescription(coursePlanComplex);
  setLectureDescription(lectureDescription);
  const lectureSubcategory = getLectureSubcategory(coursePlanComplex);
  setLectureSubcategory(lectureSubcategory);
  const lectureTags = getLectureTags(coursePlanComplex);
  setLectureTags(lectureTags);
  const lectureInstructor = getLectureInstructor(coursePlanComplex);
  if (lectureInstructor.instructors.length > 0) {
    const instructors: Instructor[] = [];
    lectureInstructor.instructors.forEach(instructor => {
      if (!instructors.some(c => c.usid === instructor.usid)) {
        instructors.push(instructor);
      }
    })
    lectureInstructor.instructors = instructors;
  }
  setLectureInstructor(lectureInstructor);
  const lecturePrecourse = getLecturePrecourse(coursePlanComplex, path);
  setLecturePrecourse(lecturePrecourse);
  const lectureComment = getLectureComment(coursePlanComplex);
  setLectureComment(lectureComment);
  const lectureReview = getLectureReview(coursePlanComplex);
  setLectureReview(lectureReview);
  setInMyLectureCdo(makeInMyLectureCdo(params, coursePlanComplex));
  const lectureRelations = await getLectureRelations(coursePlanComplex);
  if (lectureRelations === undefined) {
    setLectureRelations();
  } else {
    setLectureRelations(lectureRelations);
  }
}
