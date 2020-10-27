/* eslint-disable consistent-return */
import {
  findIsJsonStudentByCube,
  findStudent,
  modifyStudent,
} from '../../../api/lectureApi';

import { findAllTranscript } from '../../../api/mPersonalCubeApi';
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
import { getTranscriptItem } from './getTranscriptItemMapFromCube';
import {
  LectureReport,
  LectureReportCubeItemParams,
  LectureStructureCubeItemParams,
  LectureStructureCubeItem,
  State,
  StudentStateMap,
} from 'lecture/detail/viewModel/LectureReport';
import {
  setLectureTranscripts,
  getLectureTranscripts,
} from 'lecture/detail/store/LectureTranscriptStore';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import LectureParams, { toPath } from 'lecture/detail/viewModel/LectureParams';

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

export async function getCubeLectureTranscript(
  params: LectureRouterParams
): Promise<void> {
  // const personalCube = await getPersonalCubeByParams(params);
  // const cube = await getLectureStructureCubeItemByPersonalCube(
  //   personalCube,
  //   params
  // );
  // if (cube !== undefined) {
  //   const stateMap = await getStateMapByParams(params);
  //   let student: Student;
  //   if (stateMap !== undefined) {
  //     cube.state = stateMap.state;
  //     cube.learningState = stateMap.learningState;
  //     student = await findStudent(stateMap.studentId);
  //     const cubeIntroId = personalCube.cubeIntro.id;
  //     setLectureReport(
  //       await getReportItem(cubeIntroId, stateMap.studentId, student)
  //     );
  //   }
  // }

  //TODO :   contentType: ContentType;contentId: string; lectureId: string; 를 이용하여 deliveryId 조회

  //스크립트 api 조회: http://localhost:8090/api/personalCube/transcripts/0b24e458-bd52-408d-a18c-abd50023dde9/ko
  const deliveryId = '5413f05b-d04e-47d9-a302-aba600128122';

  const transcript = await findAllTranscript(deliveryId, 'ko');

  //조회 결과 viewmodel setting
  setLectureTranscripts(await getTranscriptItem(transcript));

  console.log(getLectureTranscripts);
}
