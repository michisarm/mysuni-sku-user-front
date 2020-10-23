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

import { findExamination } from 'lecture/detail/api/examApi';
import Examination from 'lecture/detail/model/Examination';
import { findIsJsonStudentByCube, findStudent } from '../../../api/lectureApi';
import { findCubeIntro, findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import Student from '../../../model/Student';
import {
  LectureReport,
  LectureStructureCubeItem,
  LectureStructureCubeItemParams,
  State,
  StudentStateMap,
} from '../../../viewModel/LectureReport';
import { getItemMapFromCube } from './getItemMapFromCube';

async function getLectureStructureCubeItemByPersonalCube(
  personalCube: PersonalCube,
  params: LectureStructureCubeItemParams
): Promise<LectureStructureCubeItem | void> {
  const { cubeId } = params;
  const { id, name } = personalCube;
  const cubeType = personalCube.contents.type;
  const cubeIntroId = personalCube.cubeIntro.id;
  const cubeIntro = await findCubeIntro(cubeIntroId);
  if (cubeIntro !== undefined) {
    const learningTime = cubeIntro.learningTime;
    return {
      id,
      name,
      cubeId,
      cubeType,
      learningTime,
      params,
    };
  }
}

async function getStateMapByParams(
  params: LectureStructureCubeItemParams
): Promise<StudentStateMap | void> {
  const { lectureCardId } = params;
  if (lectureCardId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureCardId);
    if (studentJoins.length > 0 && studentJoins[0].studentId !== null) {
      const learningState = studentJoins[0].learningState;
      let state: State = 'None';
      if (studentJoins[0].proposalState === 'Approved') {
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
      return { state, learningState, studentId: studentJoins[0].studentId };
    }
  }
}

export async function getCubeLectureReport(
  params: LectureStructureCubeItemParams
): Promise<LectureReport> {
  const lectureStructure: LectureReport = {
    courses: [],
    cubes: [],
    type: 'Cube',
  };

  const examination = await getItemMapFromCube(params.examId);
  if (examination !== undefined) {
    lectureStructure.test = examination;
  }
  return lectureStructure;
}
