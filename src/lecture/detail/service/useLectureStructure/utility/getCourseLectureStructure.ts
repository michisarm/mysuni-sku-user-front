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
import { getStateMapByParams } from './getCubeLectureStructure';
import { getItemMapFromCourse } from './getItemMapFromCourse';
import { getItemMapFromCube } from './getItemMapFromCube';
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
      can: true,
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
        can: true,
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
        lectureView,
        can: true,
      });
      lectureCardIds.push(serviceId);
    }
  });
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureStructure.courses.find(c => c.id === lectureId);
    if (course !== undefined) {
      const cubes: LectureStructureCubeItem[] = lectureViews.map<
        LectureStructureCubeItem
      >((lectureView) => {
        const { id, name, cubeId, cubeType, learningTime, serviceId } = lectureView
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
          lectureView,
          can: true,
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
  lectures.forEach((student) => {
    const { lectureUsid, learningState } = student;
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
    cube.student = student;
  });

  return lectureStudentView;


}
// Side Effect - Call by Ref
function parseCan(lectureStructure: LectureStructure) {
  let can = true;
  lectureStructure.courses.forEach(course => {
    can = can && (course.state === 'Completed')
    if (course.cubes !== undefined) {
      let cubeCan = can;
      course.cubes.forEach(cube => {
        cubeCan = cubeCan && (cube.state === 'Completed') && (cube.test === undefined || cube.test.state === 'Completed')
          && (cube.report === undefined || cube.report.state === 'Completed')
          && (cube.survey === undefined || cube.survey.state === 'Completed')
        cube.can = cubeCan;
      })
    }

    if (course.report !== undefined) {
      course.report.can = can;
      can = course.report.state === 'Completed'
    }
    if (course.survey !== undefined) {
      course.survey.can = can;
      can = course.survey.state === 'Completed'
    }
    if (course.test !== undefined) {
      course.test.can = can;
      can = course.test.state === 'Completed'
    }
    course.can = can;
  })
  return can;
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
  if (itemMap.discussion !== undefined) {
    lectureStructure.discussion = itemMap.discussion;
  }

  const getItemMapFromLectureArray: Promise<void>[] = [];
  let totalCubes = [...lectureStructure.cubes]
  lectureStructure.courses.forEach(course => {
    totalCubes = [...totalCubes, ...(course.cubes || [])]
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
        if (courseItemMap.discussion !== undefined) {
          course.discussion = courseItemMap.discussion;
        }
      }
    };
    getItemMapFromLectureArray.push(getItemMapFromLecturePromise());
  });

  await Promise.all(getItemMapFromLectureArray);

  const getItemMapFromCubeLectureArray: Promise<void>[] = [];
  totalCubes.forEach(cube => {
    if (cube.lectureView !== undefined && (cube.lectureView.cubeIntro != null || cube.lectureView.examination !== null || cube.lectureView.surveyCase !== null)) {
      const getItemMapFromCubePromise = async () => {
        const cubeIntroId = cube.lectureView!.cubeIntro === null ? '' : cube.lectureView!.cubeIntro.id
        const examId = cube.lectureView!.examination === null ? '' : cube.lectureView!.examination.id
        const surveyId = cube.lectureView!.surveyCase === null ? '' : cube.lectureView!.surveyCase.surveyFormId
        const surveyCaseId = cube.lectureView!.surveyCase === null ? '' : cube.lectureView!.surveyCase.id

        const cubeItemMap = await getItemMapFromCube(
          {
            cubeIntroId, examId, surveyId, surveyCaseId
          }, cube.params, cube.student
        );
        if (cubeItemMap.test !== undefined) {
          cube.test = cubeItemMap.test;
        }
        if (cubeItemMap.survey !== undefined) {
          cube.survey = cubeItemMap.survey;
        }
        if (cubeItemMap.report !== undefined) {
          cube.report = cubeItemMap.report;
        }
      }
      getItemMapFromCubeLectureArray.push(getItemMapFromCubePromise());
    }
  });

  await Promise.all(getItemMapFromCubeLectureArray);

  let can = parseCan(lectureStructure);
  if (lectureStructure.report !== undefined) {
    lectureStructure.report.can = can;
    can = lectureStructure.report.state === 'Completed'
  }
  if (lectureStructure.survey !== undefined) {
    lectureStructure.survey.can = can;
    can = lectureStructure.survey.state === 'Completed'
  }
  if (lectureStructure.test !== undefined) {
    lectureStructure.test.can = can;
    can = lectureStructure.test.state === 'Completed'
  }

  return lectureStructure;
}
