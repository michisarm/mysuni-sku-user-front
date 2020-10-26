import { findCoursePlanContents } from '../../../api/lectureApi';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureSummary from '../../../viewModel/LectureOverview/LectureSummary';
import {
  setLectureDescription,
  setLectureInstructor,
  setLecturePrecourse,
  setLectureSubcategory,
  setLectureSummary,
  setLectureTags,
} from '../../../store/LectureOverviewStore';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CoursePlanComplex from '../../../model/CoursePlanComplex';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';

function getLectureSummary(
  coursePlanComplex: CoursePlanComplex
): LectureSummary {
  const category = coursePlanComplex.coursePlan.category;
  const learningTime = timeToHourMinuteFormat(
    coursePlanComplex.coursePlan.learningTime
  );
  const operator = coursePlanComplex.coursePlan.courseOperator;
  const iconBox = coursePlanComplex.coursePlan.iconBox;
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
    iconBox,
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

function findCoursePlanComplex(coursePlanId: string, serviceId: string) {
  return findCoursePlanContents(coursePlanId, serviceId);
}

export async function getCourseLectureOverview(
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
  const lectureSummary = getLectureSummary(coursePlanComplex);
  setLectureSummary(lectureSummary);
  const lectureDescription = getLectureDescription(coursePlanComplex);
  setLectureDescription(lectureDescription);
  const lectureSubcategory = getLectureSubcategory(coursePlanComplex);
  setLectureSubcategory(lectureSubcategory);
  const lectureTags = getLectureTags(coursePlanComplex);
  setLectureTags(lectureTags);
  const lectureInstructor = getLectureInstructor(coursePlanComplex);
  setLectureInstructor(lectureInstructor);
  const lecturePrecourse = getLecturePrecourse(coursePlanComplex, path);
  setLecturePrecourse(lecturePrecourse);
}
