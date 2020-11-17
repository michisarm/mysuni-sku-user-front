/* eslint-disable consistent-return */
import {
  LectureStructure,
  LectureStructureCubeItem,
} from '../../../viewModel/LectureStructure';
import { getReportItem } from './getReportItemMapFromCourse';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import CoursePlanComplex from 'lecture/detail/model/CoursePlanComplex';
import {
  findCoursePlanContents,
  studentInfoView,
  StudentInfoViewBody,
} from '../../../api/lectureApi';
import { parseLectureParams } from '../../../utility/lectureRouterParamsHelper';
import LectureStudentView from 'lecture/detail/model/LectureStudentView';

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
    discussions: [],
    items: [],
    type: serviceType!,
    course: {
      coursePlanId: coursePlanComplex.coursePlan.coursePlanId,
      id: coursePlanComplex.coursePlan.contentsId,
      name: coursePlanComplex.coursePlan.name,
      params,
      routerParams: parseLectureParams(params, toPath(params)),
      path: toPath(params),
      serviceId: params.serviceId!,
      can: false,
      order: 0,
      type: 'REPORT',
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
        can: false,
        order: 0,
        type: 'COURSE',
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
        can: false,
        order: 0,
        type: 'CUBE',
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
          can: false,
          order: 0,
          type: 'CUBE',
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

export async function getCourseLectureReport(
  params: LectureParams
): Promise<void> {
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

  setLectureReport(
    await getReportItem(
      coursePlanComplex.coursePlan.coursePlanId,
      student
    )
  );
}
