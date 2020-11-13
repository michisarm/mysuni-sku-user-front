/* eslint-disable consistent-return */

/**
 * 
 export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  url: LectureStructureCubeItemUrl;
  learningState?: LearningState;
  state?: State;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}
 */

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
  const { id, name } = personalCube;
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
  };
  if (cubeIntro !== undefined) {
    const learningTime = cubeIntro.learningTime;
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
      can: true
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
    const sortedStudentJoins = studentJoins.sort((a, b) => b.updateTime - a.updateTime);
    if (sortedStudentJoins.length > 0 && sortedStudentJoins[0].studentId !== null) {
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
      return { state, learningState, studentId: sortedStudentJoins[0].studentId };
    }
  }
}

export async function getCubeLectureStructure(
  params: LectureParams
): Promise<LectureStructure> {
  const lectureStructure: LectureStructure = {
    courses: [],
    cubes: [],
    type: 'Cube',
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
      const cubeIntroId = personalCube.cubeIntro.id;
      const examId = personalCube.contents.examId;
      const surveyId = personalCube.contents.surveyId;
      const surveyCaseId = personalCube.contents.surveyCaseId;
      const itemMap = await getItemMapFromCube(
        { cubeIntroId, examId, surveyId, surveyCaseId },
        params,
        student
      );
      let stateCan = cube.state === 'Completed'
      if (itemMap.report !== undefined) {
        lectureStructure.report = itemMap.report;
        lectureStructure.report.can = stateCan;
        stateCan = lectureStructure.report.state === 'Completed'
      }
      if (itemMap.survey !== undefined) {
        lectureStructure.survey = itemMap.survey;
        lectureStructure.survey.can = stateCan;
        stateCan = lectureStructure.survey.state === 'Completed'
      }
      if (itemMap.test !== undefined) {
        lectureStructure.test = itemMap.test;
        lectureStructure.test.can = stateCan;
        stateCan = lectureStructure.test.state === 'Completed'
      }
    }

    lectureStructure.cube = cube;
  }
  return lectureStructure;
}
