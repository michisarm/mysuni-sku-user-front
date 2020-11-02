import {
  findCoursePlanContents,
  studentInfoView,
  StudentInfoViewBody,
} from '../../../api/lectureApi';
import CoursePlanComplex from '../../../model/CoursePlanComplex';
import LectureStudentView from '../../../model/LectureStudentView';
import { parseLectureParams } from '../../../utility/lectureRouterParamsHelper';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import {
  LectureStructure,
  LectureStructureCubeItem,
} from '../../../viewModel/LectureStructure';
import { getItemMapFromCourse } from './getItemMapFromCourse';
import { getItemMapFromLecture } from './getItemMapFromLecture';

function getCoursePlanComplexByParams(
  params: LectureParams
): Promise<CoursePlanComplex> {
  const { coursePlanId, serviceId } = params;
  return findCoursePlanContents(coursePlanId!, serviceId!);
}

function parseCoursePlanComplex(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams
): {
  lectureStructure: LectureStructure;
  stuendentInfoViewBody: StudentInfoViewBody;
} {
  const { serviceId: rootServiceId, serviceType } = params;
  const lectureStructure: LectureStructure = {
    courses: [],
    cubes: [],
    type: serviceType!,
    course: {
      coursePlanId: coursePlanComplex.coursePlan.coursePlanId,
      id: coursePlanComplex.coursePlan.contentsId,
      name: coursePlanComplex.coursePlan.name,
      params,
      routerParams: parseLectureParams(params, toPath(params)),
      path: toPath(params),
      serviceId: params.serviceId!,
    },
  };
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];

  coursePlanComplex.lectureViews.forEach(lectureView => {
    const {
      id,
      name,
      coursePlanId,
      cubeId,
      cubeType,
      learningTime,
      serviceId,
    } = lectureView;
    if (coursePlanId !== null) {
      const courseParams: LectureParams = {
        ...params,
        lectureType: 'coures',
        contentId: coursePlanId,
        lectureId: serviceId,
      };
      lectureStructure.courses.push({
        id,
        coursePlanId,
        name,
        params: courseParams,
        routerParams: parseLectureParams(courseParams, toPath(courseParams)),
        path: toPath(courseParams),
        serviceId,
        lectureView,
      });
      courseLectureIds.push(serviceId);
    }
    if (cubeId !== null) {
      const cubeParams: LectureParams = {
        ...params,
        lectureType: 'cube',
        contentId: cubeId,
        lectureId: serviceId,
      };
      lectureStructure.cubes.push({
        id,
        name,
        cubeId,
        cubeType,
        learningTime,
        params: cubeParams,
        routerParams: parseLectureParams(cubeParams, toPath(cubeParams)),
        path: toPath(cubeParams),
        serviceId,
      });
      lectureCardIds.push(serviceId);
    }
  });
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureStructure.courses.find(c => c.id === lectureId);
    if (course !== undefined) {
      const cubes: LectureStructureCubeItem[] = lectureViews.map<
        LectureStructureCubeItem
      >(({ id, name, cubeId, cubeType, learningTime, serviceId }) => {
        const cubeParams: LectureParams = {
          ...params,
          lectureType: 'cube',
          contentId: cubeId,
          lectureId: serviceId,
        };
        return {
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          params: cubeParams,
          routerParams: parseLectureParams(cubeParams, toPath(cubeParams)),
          path: toPath(cubeParams),
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
      serviceId: params.serviceId!,
    },
  };
}
// Side Effect - Call by Ref
async function parseLectureStudentView(
  params: LectureParams,
  courseLectureIds: string[],
  lectureCardIds: string[],
  preLectureCardIds: string[],
  lectureStructure: LectureStructure
): Promise<LectureStudentView> {
  const { serviceId } = params;
  const lectureStudentView = await studentInfoView({
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    serviceId: serviceId!,
  });

  const { courses, lectures } = lectureStudentView;

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

  return lectureStudentView;
}

export async function getCourseLectureStructure(
  params: LectureParams
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
  const lectureStudentView = await parseLectureStudentView(
    params,
    courseLectureIds,
    lectureCardIds,
    preLectureCardIds,
    lectureStructure
  );

  const student = lectureStudentView.own;
  const itemMap = await getItemMapFromCourse(
    coursePlanComplex,
    params,
    student
  );
  if (itemMap.test !== undefined) {
    lectureStructure.test = itemMap.test;
  }
  if (itemMap.survey !== undefined) {
    lectureStructure.survey = itemMap.survey;
  }
  if (itemMap.report !== undefined) {
    lectureStructure.report = itemMap.report;
  }

  const getItemMapFromLectureArray: Promise<void>[] = [];
  lectureStructure.courses.forEach(course => {
    const getItemMapFromLecturePromise = async () => {
      if (course.lectureView !== undefined) {
        const courseStudent = lectureStudentView.courses.find(
          ({ courseLectureId }) => (courseLectureId = course.serviceId)
        );
        const courseItemMap = await getItemMapFromLecture(
          course.lectureView,
          course.params,
          courseStudent && courseStudent.student
        );
        if (courseItemMap.test !== undefined) {
          course.test = courseItemMap.test;
        }
        if (courseItemMap.survey !== undefined) {
          course.survey = courseItemMap.survey;
        }
        if (courseItemMap.report !== undefined) {
          course.report = courseItemMap.report;
        }
      }
    };
    getItemMapFromLectureArray.push(getItemMapFromLecturePromise());
  });

  await Promise.all(getItemMapFromLectureArray);

  return lectureStructure;
}
