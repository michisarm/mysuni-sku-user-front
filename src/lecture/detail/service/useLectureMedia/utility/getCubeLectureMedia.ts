/* eslint-disable consistent-return */
import {
  findIsJsonStudentByCube,
  findStudent,
  modifyStudent,
} from '../../../api/lectureApi';

import { findAllTranscript, findMedia } from '../../../api/mPersonalCubeApi';
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
import { setLectureMedia } from 'lecture/detail/store/LectureMediaStore';
import { getMediaItem } from './getMediaItemMapFromCube';

function getPersonalCubeByParams(
  params: LectureRouterParams
): Promise<PersonalCube> {
  const { contentId } = params;
  return findPersonalCube(contentId!);
}

async function getStateMapByParams(
  params: LectureRouterParams
): Promise<StudentStateMap | void> {
  const { lectureId } = params;
  if (lectureId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureId);
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

export async function getCubeLectureMedia(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  if (personalCube !== undefined) {
    // const stateMap = await getStateMapByParams(params);
    // let student: Student;
    // if (stateMap !== undefined) {
    //   student = await findStudent(stateMap.studentId);

    if (
      personalCube.contents.type == 'Audio' ||
      personalCube.contents.type == 'Video'
    ) {
      //TODO :   contentType: ContentType;contentId: string; lectureId: string; 를 이용하여 deliveryId 조회
      // deliveryId => panoptoSessionId 로 수정 필요함
      const mediaId = personalCube.contents.contents.id;
      const media = await findMedia(mediaId);
      //TODO : 0번 배열 조회가 항상 맞는지 확인 필요함
      const panoptoSessionId =
        media.mediaContents.internalMedias[0].panoptoSessionId;

      //스크립트 api 조회: http://localhost:8090/api/personalCube/transcripts/0b24e458-bd52-408d-a18c-abd50023dde9/ko
      const transcript = await findAllTranscript(panoptoSessionId, 'ko');
      console.log('transcript', transcript)
      // transcript.push({})
      //조회 결과 viewmodel setting
      setLectureTranscripts(await getTranscriptItem(transcript));
      setLectureMedia(await getMediaItem(media));
    }

    // }
  }
}
