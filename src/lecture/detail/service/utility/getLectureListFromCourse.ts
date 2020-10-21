import { findCoursePlanContents, studentInfoView } from '../../api/lectureApi';
import CoursePlanComplex from '../../model/CoursePlanComplex';
import {
  LectureList,
  LectureListCourseItem,
  LectureListCubeItem,
} from '../../store/LectureListStore';
import { CourseParams } from '../useLectureList';
import { getLectureListFromCube } from './getLectureListFromCube';

// Side Effect - Call by Ref
function parseCoursePlanComplex(
  coursePlanComplex: CoursePlanComplex,
  params: CourseParams,
  courseLectureIds: string[],
  lectureCardIds: string[],
  preLectureCardIds: string[]
): LectureList {
  const { serviceId: rootServiceId } = params;
  const lectureList: LectureList = { courses: [], cubes: [] };
  coursePlanComplex.lectureViews.forEach(
    ({
      id,
      name,
      coursePlanId,
      cubeId,
      cubeType,
      learningTime,
      serviceType,
      serviceId,
    }) => {
      if (coursePlanId !== null) {
        lectureList.courses.push({
          id,
          name,
          url: { coursePlanId, serviceType, serviceId },
          serviceId,
        });
        courseLectureIds.push(serviceId);
      }
      if (cubeId !== null) {
        lectureList.cubes.push({
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          url: {
            cubeId,
            programLectureUsid: rootServiceId,
            lectureCardId: serviceId,
          },
          serviceId,
        });
        lectureCardIds.push(serviceId);
      }
    }
  );
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureList.courses.find(c => c.id === lectureId);
    if (course !== undefined) {
      const cubes: LectureListCubeItem[] = lectureViews.map<
        LectureListCubeItem
      >(({ id, name, cubeId, cubeType, learningTime, serviceId }) => {
        return {
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          url: {
            cubeId,
            lectureCardId: serviceId,
            programLectureUsid: rootServiceId,
          },
          serviceId,
        };
      });
      (course as LectureListCourseItem).cubes = cubes;
    }
  });

  return lectureList;
}
// Side Effect - Call by Ref
async function parseLectureStudentView(
  params: CourseParams,
  courseLectureIds: string[],
  lectureCardIds: string[],
  preLectureCardIds: string[],
  lectureList: LectureList
): Promise<void> {
  const { serviceId } = params;
  const { courses, lectures } = await studentInfoView({
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    serviceId,
  });

  courses.forEach(({ lectures, courseLectureId }) => {
    const course = lectureList.courses.find(
      ({ serviceId }) => serviceId === courseLectureId
    );
    if (course !== undefined && course.cubes !== undefined) {
      course.state = 'Passed';
      course.cubes.forEach(cube => {
        const lecture = lectures.find(
          ({ lectureUsid }) => lectureUsid === cube.serviceId
        );
        if (lecture === undefined) {
          course.state = 'Progress';
          return;
        }
        switch (lecture.learningState) {
          case 'Passed':
            cube.state = 'Passed';
            break;
          case 'Progress':
          case 'TestPassed':
          case 'TestWaiting':
          case 'HomeworkWaiting':
            cube.state = 'Progress';
          default:
            course.state = 'Progress';
            break;
        }
      });
    }
  });
  lectures.forEach(({ lectureUsid, learningState }) => {
    const cube = lectureList.cubes.find(
      ({ serviceId }) => serviceId === lectureUsid
    );
    if (cube === undefined) {
      return;
    }
    cube.learningState = learningState;
    switch (learningState) {
      case 'Passed':
        cube.state = 'Passed';
        break;
      case 'Progress':
      case 'TestPassed':
      case 'TestWaiting':
      case 'HomeworkWaiting':
        cube.state = 'Progress';
      default:
        break;
    }
  });
}

async function getLecutureListByCoursePlanComplex(
  coursePlanComplex: CoursePlanComplex,
  params: CourseParams
): Promise<LectureList> {
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];
  const lectureList = parseCoursePlanComplex(
    coursePlanComplex,
    params,
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds
  );

  if (lectureList.courses.length === 0 && lectureList.cubes.length === 0) {
    return Promise.resolve(lectureList);
  }

  await parseLectureStudentView(
    params,
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    lectureList
  );

  return lectureList;
}

function getCoursePlanComplexByParams(
  params: CourseParams
): Promise<CoursePlanComplex> {
  const { coursePlanId, serviceId } = params;
  return findCoursePlanContents(coursePlanId, serviceId);
}

export async function getLectureListFromCourse(
  params: CourseParams
): Promise<LectureList> {
  const coursePlanComplex = await getCoursePlanComplexByParams(params);
  const lectureList = await getLecutureListByCoursePlanComplex(
    coursePlanComplex,
    params
  );
  return lectureList;
}
