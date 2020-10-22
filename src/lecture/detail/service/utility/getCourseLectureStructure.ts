import {
  findCoursePlanContents,
  studentInfoView,
  StudentInfoViewBody,
} from '../../api/lectureApi';
import CoursePlanComplex from '../../model/CoursePlanComplex';
import {
  LectureStructure,
  LectureStructureCourseItemParams,
  LectureStructureCubeItem,
} from '../../viewModel/LectureStructure';

function getCoursePlanComplexByParams(
  params: LectureStructureCourseItemParams
): Promise<CoursePlanComplex> {
  const { coursePlanId, serviceId } = params;
  return findCoursePlanContents(coursePlanId, serviceId);
}

function parseCoursePlanComplex(
  coursePlanComplex: CoursePlanComplex,
  params: LectureStructureCourseItemParams
): {
  lectureStructure: LectureStructure;
  stuendentInfoViewBody: StudentInfoViewBody;
} {
  const { serviceId: rootServiceId } = params;
  const lectureStructure: LectureStructure = { courses: [], cubes: [] };
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];

  coursePlanComplex.lectureViews.forEach(
    ({ id, name, coursePlanId, cubeId, cubeType, learningTime, serviceId }) => {
      if (coursePlanId !== null) {
        lectureStructure.courses.push({
          id,
          name,
          params,
          serviceId,
        });
        courseLectureIds.push(serviceId);
      }
      if (cubeId !== null) {
        lectureStructure.cubes.push({
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          params: { ...params, cubeId },
          serviceId,
        });
        lectureCardIds.push(serviceId);
      }
    }
  );
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureStructure.courses.find(c => c.id === lectureId);
    if (course !== undefined) {
      const cubes: LectureStructureCubeItem[] = lectureViews.map<
        LectureStructureCubeItem
      >(({ id, name, cubeId, cubeType, learningTime, serviceId }) => {
        return {
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          params: { ...params, cubeId },
        };
      });
      course.cubes = cubes;
    }
  });

  return {
    lectureStructure,
    stuendentInfoViewBody: {
      courseLectureIds,
      lectureCardIds,
      preLectureCardIds,
      serviceId: params.serviceId,
    },
  };
}
// Side Effect - Call by Ref
async function parseLectureStudentView(
  params: LectureStructureCourseItemParams,
  courseLectureIds: string[],
  lectureCardIds: string[],
  preLectureCardIds: string[],
  lectureStructure: LectureStructure
): Promise<void> {
  const { serviceId } = params;
  const { courses, lectures } = await studentInfoView({
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    serviceId,
  });

  courses.forEach(({ lectures, courseLectureId }) => {
    const course = lectureStructure.courses.find(
      ({ serviceId }) => serviceId === courseLectureId
    );
    if (course !== undefined && course.cubes !== undefined) {
      course.state = 'Completed';
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
            cube.state = 'Completed';
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
    const cube = lectureStructure.cubes.find(
      ({ serviceId }) => serviceId === lectureUsid
    );
    if (cube === undefined) {
      return;
    }
    cube.learningState = learningState;
    switch (learningState) {
      case 'Passed':
        cube.state = 'Completed';
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

export async function getCourseLectureStructure(
  params: LectureStructureCourseItemParams
): Promise<LectureStructure> {
  const coursePlanComplex = await getCoursePlanComplexByParams(params);
  const { lectureStructure, stuendentInfoViewBody } = parseCoursePlanComplex(
    coursePlanComplex,
    params
  );
  const {
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
  } = stuendentInfoViewBody;
  await parseLectureStudentView(
    params,
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    lectureStructure
  );

  return lectureStructure;
}
