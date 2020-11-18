import {
  findCoursePlanContents,
  studentInfoView,
  StudentInfoViewBody,
} from '../../../api/lectureApi';
import CoursePlanComplex from '../../../model/CoursePlanComplex';
import IdNameSequence from '../../../model/IdNameSequence';
import LectureStudentView from '../../../model/LectureStudentView';
import ProgramSet from '../../../model/ProgramSet';
import { parseLectureParams } from '../../../utility/lectureRouterParamsHelper';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructure,
  LectureStructureCubeItem,
  LectureStructureDiscussionItem,
  LectureStructureDurationableCubeItem,
} from '../../../viewModel/LectureStructure';
import { getItemMapFromCourse } from './getItemMapFromCourse';
import { getItemMapFromCube } from './getItemMapFromCube';
import { getItemMapFromLecture } from './getItemMapFromLecture';

function getCoursePlanComplexByParams(
  params: LectureParams
): Promise<CoursePlanComplex> {
  const { coursePlanId, serviceId } = params;
  return findCoursePlanContents(coursePlanId!, serviceId!);
}

function parseDiscussion(
  coursePlanComplex: CoursePlanComplex,
  params: LectureParams,
  idNameSequnece: IdNameSequence
): LectureStructureDiscussionItem {
  const { id, name, sequence } = idNameSequnece;
  const routerParams = parseLectureParams(
    params,
    `${toPath(params)}/discussion`
  );
  const state: State = 'None';
  const item: LectureStructureDiscussionItem = {
    id,
    name,
    order: sequence,
    time: coursePlanComplex.coursePlan.time,
    creator: coursePlanComplex.coursePlan.creator.name,
    creatorAudienceId: coursePlanComplex.coursePlan.patronKey.keyString,
    params,
    routerParams,
    path: `${toPath(params)}/discussion`,
    state,
    type: 'DISCUSSION',
    can: true,
  };
  return item;
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
      order: -1,
      type: serviceType === 'Program' ? 'PROGRAM' : 'COURSE',
    },
    items: [],
  };
  const courseLectureIds: string[] = [];
  const lectureCardIds: string[] = [];
  const preLectureCardIds: string[] = [];

  coursePlanComplex.lectureViews.forEach(lectureView => {
    const {
      id,
      name,
      coursePlanId,
      learningCardId,
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
        learningCardId,
        params: cubeParams,
        routerParams: parseLectureParams(cubeParams, toPath(cubeParams)),
        path: toPath(cubeParams),
        serviceId,
        lectureView,
        can: true,
        order: 0,
        type: 'CUBE',
      });
      lectureCardIds.push(serviceId);
    }
  });
  coursePlanComplex.subLectureViews.forEach(({ lectureId, lectureViews }) => {
    const course = lectureStructure.courses.find(c => c.id === lectureId);
    if (course !== undefined) {
      let cubeOrder = 0;
      const cubes: LectureStructureCubeItem[] = lectureViews.map<
        LectureStructureCubeItem
      >(lectureView => {
        const {
          id,
          name,
          cubeId,
          cubeType,
          learningTime,
          serviceId,
        } = lectureView;
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
          order: cubeOrder++,
          type: 'CUBE',
        };
      });
      course.cubes = cubes;
    }
  });
  const programSets: ProgramSet =
    serviceType === 'Program'
      ? coursePlanComplex.coursePlanContents.courseSet.programSet
      : coursePlanComplex.coursePlanContents.courseSet.learningCardSet;
  lectureStructure.discussions = (programSets.discussions || []).map(idNameSequence =>
    parseDiscussion(coursePlanComplex, params, idNameSequence)
  );
  const idNameSequences = [
    ...(programSets.courses || []),
    ...(programSets.cards || []),
    ...(programSets.discussions || []),
  ].sort((a, b) => a.sequence - b.sequence);
  idNameSequences.forEach(({ id, sequence }) => {
    if (lectureStructure.courses.some(c => c.coursePlanId === id)) {
      const item = lectureStructure.courses.find(c => c.coursePlanId === id)!;
      item.order = sequence;
      lectureStructure.items.push(item);
    }
    if (lectureStructure.cubes.some(c => c.learningCardId === id)) {
      const item = lectureStructure.cubes.find(c => c.learningCardId === id)!;
      item.order = sequence;
      lectureStructure.items.push(item);
    }
    if (lectureStructure.discussions.some(c => c.id === id)) {
      const item = lectureStructure.discussions.find(c => c.id === id)!;
      item.order = sequence;
      lectureStructure.items.push(item);
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

  courses.forEach(({ lectures, courseLectureId, student: courseStudent }) => {
    const course = lectureStructure.courses.find(
      ({ serviceId }) => serviceId === courseLectureId
    );
    if (course !== undefined && course.cubes !== undefined) {
      course.student = courseStudent;
      course.state = 'None';
      switch (courseStudent.learningState) {
        case 'Passed':
          course.state = 'Completed';
          break;
        default:
          course.state = 'Progress';
          break;
      }

      course.cubes.forEach(cube => {
        const lecture = lectures.find(
          ({ lectureUsid }) => lectureUsid === cube.lectureView?.serviceId
        );
        cube.student = lecture;
        if (lecture === undefined) {
          course.state = 'Progress';
          return;
        }
        switch (lecture.learningState) {
          case 'Passed':
            cube.state = 'Completed';
            break;
          default:
            cube.state = 'Progress';
            break;
        }
      });
    }
  });
  lectures.forEach(student => {
    const { lectureUsid, learningState } = student;
    const cube = lectureStructure.cubes.find(
      ({ serviceId }) => serviceId === lectureUsid
    );
    if (cube === undefined) {
      return;
    }
    cube.learningState = learningState;
    cube.canSubmit = true;
    switch (learningState) {
      case 'Passed':
        cube.state = 'Completed';
        break;
      default:
        cube.state = 'Progress';
        break;
    }
    cube.student = student;
  });

  return lectureStudentView;
}
// Side Effect - Call by Ref
function parseCoursesCan(lectureStructure: LectureStructure) {
  lectureStructure.courses.forEach(course => {
    const can = (course.state === 'Progress' || course.state === 'Completed');
    if (course.cubes !== undefined && course.cubes.length > 0) {
      const canSubmit = course.cubes.reduce((r, c) => r && c.state === 'Completed', true)
      course.canSubmit = canSubmit;
    }
    // Cube 순차 학습 요건
    // if (course.cubes !== undefined) {
    //   let cubeCan = can;
    //   course.cubes.forEach(cube => {
    //     cubeCan =
    //       cubeCan &&
    //       cube.state === 'Completed' &&
    //       (cube.test === undefined || cube.test.state === 'Completed') &&
    //       (cube.report === undefined || cube.report.state === 'Completed') &&
    //       (cube.survey === undefined || cube.survey.state === 'Completed');
    //     cube.can = cubeCan;
    //   });
    // }

    if (course.report !== undefined) {
      course.report = { ...course.report, can }
      // can = course.report.state === 'Completed';
    }
    if (course.survey !== undefined) {
      course.survey = { ...course.survey, can }
      // can = course.survey.state === 'Completed';
    }
    if (course.test !== undefined) {
      course.test = { ...course.test, can }
      // can = course.test.state === 'Completed';
    }
    if (course.cubes !== undefined && course.cubes.length > 0) {
      course.cubes.forEach(cube => {
        cube.canSubmit = (cube.state === 'Progress' || cube.state === 'Completed')
      })
    }
    course.can = can;
  });
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
  if (lectureStructure.course !== undefined) {
    const itemMap = await getItemMapFromCourse(
      coursePlanComplex,
      params,
      student
    );
    lectureStructure.course.student = student;
    lectureStructure.course.state = 'None';
    if (student !== null) {
      switch (student.learningState) {
        case 'Passed':
          lectureStructure.course.state = 'Completed';
          break;
        default:
          lectureStructure.course.state = 'Progress';
          break;
      }
    }

    if (itemMap.test !== undefined) {
      lectureStructure.course.test = itemMap.test;
    }
    if (itemMap.survey !== undefined) {
      lectureStructure.course.survey = itemMap.survey;
    }
    if (itemMap.report !== undefined) {
      lectureStructure.course.report = itemMap.report;
    }
  }

  const getItemMapFromLectureArray: Promise<void>[] = [];
  let totalCubes = [
    ...(lectureStructure.course?.cubes || []),
    ...lectureStructure.cubes,
  ];
  lectureStructure.courses.forEach(course => {
    totalCubes = [...totalCubes, ...(course.cubes || [])];
    const getItemMapFromLecturePromise = async () => {
      if (course.lectureView !== undefined) {
        const courseStudent = lectureStudentView.courses.find(
          ({ courseLectureId }) => courseLectureId === course.serviceId
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

  const getItemMapFromCubeLectureArray: Promise<void>[] = [];
  totalCubes.forEach(cube => {
    if (
      cube.lectureView !== undefined &&
      (cube.lectureView.cubeIntro != null ||
        cube.lectureView.examination !== null ||
        cube.lectureView.surveyCase !== null)
    ) {
      const getItemMapFromCubePromise = async () => {
        const cubeIntroId =
          cube.lectureView!.cubeIntro === null
            ? ''
            : cube.lectureView!.cubeIntro.id;
        const examId =
          cube.lectureView!.examination === null
            ? ''
            : cube.lectureView!.examination.id;
        const surveyId =
          cube.lectureView!.surveyCase === null
            ? ''
            : cube.lectureView!.surveyCase.surveyFormId;
        const surveyCaseId =
          cube.lectureView!.surveyCase === null
            ? ''
            : cube.lectureView!.surveyCase.id;

        const stateCan =
          cube.state === 'Progress' || cube.state === 'Completed';
        const cubeItemMap = await getItemMapFromCube(
          {
            cubeIntroId,
            examId,
            surveyId,
            surveyCaseId,
          },
          cube.params,
          cube.student
        );
        if (cubeItemMap.test !== undefined) {
          cube.test = cubeItemMap.test;
          cube.test.can = stateCan;
        }
        if (cubeItemMap.survey !== undefined) {
          cube.survey = cubeItemMap.survey;
          cube.survey.can = stateCan;
        }
        if (cubeItemMap.report !== undefined) {
          cube.report = cubeItemMap.report;
          cube.report.can = stateCan;
        }
      };
      getItemMapFromCubeLectureArray.push(getItemMapFromCubePromise());
    }
    if (cube.cubeType === 'Audio' || cube.cubeType === 'Video') {
      (cube as LectureStructureDurationableCubeItem).duration = 0;
      if (cube.student !== undefined) {
        (cube as LectureStructureDurationableCubeItem).duration =
          cube.student.durationViewSeconds === null
            ? undefined
            : parseInt(cube.student.durationViewSeconds);
      }
    }
  });

  await Promise.all(getItemMapFromCubeLectureArray);

  parseCoursesCan(lectureStructure);
  if (lectureStructure.course !== undefined) {
    const can = (lectureStructure.course.state === 'Progress' || lectureStructure.course.state === 'Completed');
    const canSubmit = lectureStructure.cubes.reduce((r, c) => r && c.state === 'Completed', true) && lectureStructure.courses.reduce((r, c) => r && c.state === 'Completed', true)
    lectureStructure.course.canSubmit = canSubmit;
    if (lectureStructure.course.report !== undefined) {
      lectureStructure.course.report = { ...lectureStructure.course.report, can }
      // can = lectureStructure.course.report.state === 'Completed';
    }
    if (lectureStructure.course.survey !== undefined) {
      lectureStructure.course.survey = { ...lectureStructure.course.survey, can }
      // can = lectureStructure.course.survey.state === 'Completed';
    }
    if (lectureStructure.course.test !== undefined) {
      lectureStructure.course.test = { ...lectureStructure.course.test, can }
      // can = lectureStructure.course.test.state === 'Completed';
    }
  }

  return lectureStructure;
}
