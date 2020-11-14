/* eslint-disable consistent-return */
import { findIsJsonStudentByCube, findStudent } from '../../../api/lectureApi';
import { findCubeIntro, findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import Student from '../../../model/Student';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import { State } from '../../../viewModel/LectureState';
import {
  LectureStructure,
  LectureStructureCubeItem,
  LectureStructureDurationableCubeItem,
  StudentStateMap,
} from '../../../viewModel/LectureStructure';
import { getItemMapFromCube } from './getItemMapFromCube';

function getPersonalCubeByParams(params: LectureParams): Promise<PersonalCube> {
  const { cubeId } = params;
  return findPersonalCube(cubeId!);
}

async function getLectureStructureCubeItemByPersonalCube(
  personalCube: PersonalCube,
  params: LectureParams
): Promise<LectureStructureCubeItem | void> {
  const { cubeId, lectureCardId } = params;
  const {
    id,
    name,
    contents: { type },
  } = personalCube;
  if (personalCube === undefined) {
    return;
  }
  if (personalCube.contents === undefined) {
    return;
  }
  const cubeType = personalCube.contents.type;
  const cubeIntroId = personalCube.cubeIntro.id;
  const cubeIntro = await findCubeIntro(cubeIntroId);
  const routerParams: LectureRouterParams = {
    contentType: 'cube',
    contentId: cubeId!,
    lectureId: lectureCardId!,
    pathname: toPath(params),
    lectureParams: params,
  };
  if (cubeIntro !== undefined) {
    const learningTime = cubeIntro.learningTime;
    if (type === 'Audio' || type === 'Video') {
      const lectureStructureDurationableCubeItem: LectureStructureDurationableCubeItem = {
        id,
        name,
        cubeId: cubeId!,
        cubeType,
        learningTime,
        params,
        routerParams,
        path: toPath(params),
        serviceId: lectureCardId,
        can: true,
        duration: 0,
        order: 0,
        type: 'CUBE',
      };
      return lectureStructureDurationableCubeItem;
    }
    return {
      id,
      name,
      cubeId: cubeId!,
      cubeType,
      learningTime,
      params,
      routerParams,
      path: toPath(params),
      serviceId: lectureCardId,
      can: true,
      order: 0,
      type: 'CUBE',
    };
  }
}

export async function getStateMapByParams(
  params: LectureParams
): Promise<StudentStateMap | void> {
  const { lectureCardId } = params;
  if (lectureCardId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureCardId);
    if (!Array.isArray(studentJoins)) {
      return;
    }
    const sortedStudentJoins = studentJoins.sort(
      (a, b) => b.updateTime - a.updateTime
    );
    if (
      sortedStudentJoins.length > 0 &&
      sortedStudentJoins[0].studentId !== null
    ) {
      const learningState = sortedStudentJoins[0].learningState;
      let state: State = 'None';
      if (sortedStudentJoins[0].proposalState === 'Approved') {
        switch (learningState) {
          case 'Progress':
          case 'TestPassed':
          case 'TestWaiting':
          case 'HomeworkWaiting':
            state = 'Progress';
            break;
          case 'Passed':
            state = 'Completed';
            break;

          default:
            break;
        }
      }
      return {
        state,
        learningState,
        studentId: sortedStudentJoins[0].studentId,
      };
    }
  }
}

export async function getCubeLectureStructure(
  params: LectureParams
): Promise<LectureStructure> {
  const lectureStructure: LectureStructure = {
    courses: [],
    cubes: [],
    discussions: [],
    type: 'Cube',
    items: [],
  };
  const personalCube = await getPersonalCubeByParams(params);
  const cube = await getLectureStructureCubeItemByPersonalCube(
    personalCube,
    params
  );
  if (cube !== undefined) {
    const stateMap = await getStateMapByParams(params);
    let student: Student;
    if (stateMap !== undefined) {
      cube.state = stateMap.state;
      cube.learningState = stateMap.learningState;
      student = await findStudent(stateMap.studentId);
      cube.student = student;
      if (cube.cubeType === 'Audio' || cube.cubeType === 'Video') {
        (cube as LectureStructureDurationableCubeItem).duration = 0;
        if (student !== undefined) {
          (cube as LectureStructureDurationableCubeItem).duration =
            student.durationViewSeconds === null
              ? undefined
              : parseInt(student.durationViewSeconds);
        }
      }
      const cubeIntroId = personalCube.cubeIntro.id;
      const examId = personalCube.contents.examId;
      const surveyId = personalCube.contents.surveyId;
      const surveyCaseId = personalCube.contents.surveyCaseId;
      const itemMap = await getItemMapFromCube(
        { cubeIntroId, examId, surveyId, surveyCaseId },
        params,
        student
      );
      const stateCan = cube.state === 'Progress' || cube.state === 'Completed';
      let order = 0;
      if (itemMap.report !== undefined) {
        cube.report = itemMap.report;
        cube.report.can = stateCan;
        cube.report.order = ++order;
        // stateCan = cube.report.state === 'Completed';
      }
      if (itemMap.survey !== undefined) {
        cube.survey = itemMap.survey;
        cube.survey.can = stateCan;
        cube.survey.order = ++order;
        // stateCan = cube.survey.state === 'Completed';
      }
      if (itemMap.test !== undefined) {
        cube.test = itemMap.test;
        cube.test.can = stateCan;
        // stateCan = cube.test.state === 'Completed';
        cube.test.order = ++order;
      }
    }

    lectureStructure.cube = cube;
  }
  return lectureStructure;
}
