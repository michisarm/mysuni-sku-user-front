/* eslint-disable consistent-return */
import {
  findIsJsonStudentByCube,
  findStudent,
  modifyStudent,
} from '../../../api/lectureApi';
import { findCubeIntro, findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import Student from '../../../model/Student';

// TODO : /viewModel/LectureStructure -> /viewModel/LectureReport 로 변경 예정
// import {
//   LectureStructure,
//   LectureStructureCubeItem,
//   State,
//   StudentStateMap,
// } from '../../../viewModel/LectureStructure';
import { getReportItem } from './getReportItemMapFromCube';
import {
  LectureReport,
  LectureReportCubeItemParams,
  LectureStructureCubeItemParams,
  LectureStructureCubeItem,
  StudentStateMap,
} from 'lecture/detail/viewModel/LectureReport';
import { setLectureReport } from 'lecture/detail/store/LectureReportStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';
import { State } from '../../../viewModel/LectureState';

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
  const cubeType = personalCube.contents.type;
  const cubeIntroId = personalCube.cubeIntro.id;
  const cubeIntro = await findCubeIntro(cubeIntroId);
  const routerParams: LectureRouterParams = {
    contentType: 'cube',
    contentId: cubeId!,
    lectureId: lectureCardId!,
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
    };
  }
}

async function getStateMapByParams(
  params: LectureParams
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
  params: LectureParams
): Promise<void> {
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
      setLectureReport(
        await getReportItem(cubeIntroId, stateMap.studentId, student)
      );
    }
  }
}
