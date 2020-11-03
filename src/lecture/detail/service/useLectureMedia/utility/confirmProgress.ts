/* eslint-disable consistent-return */
import { findPersonalCube } from '../../../api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { registerWatchLog } from 'lecture/detail/api/WatchlogApi';
import LectureWatchLog, {
  State,
  StudentStateMap,
} from 'lecture/detail/viewModel/LectureWatchLog';
import Student from 'lecture/detail/model/Student';
import {
  findIsJsonStudentByCube,
  findStudent,
  progressByCardId,
} from 'lecture/detail/api/lectureApi';
import StudentCdo from 'lecture/detail/model/StudentCdo';
import { setLectureConfirmProgress } from 'lecture/detail/store/LectureConfirmProgressStore';

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

export async function confirmProgress(
  params: LectureRouterParams
): Promise<void> {
  const personalCube = await getPersonalCubeByParams(params);
  console.log('personalCube', personalCube);

  if (personalCube !== undefined) {
    const stateMap = await getStateMapByParams(params);
    let student: Student;
    if (stateMap !== undefined) {
      student = await findStudent(stateMap.studentId);

      const studentCdo: StudentCdo = {
        rollBookId: student.rollBookId,
        name: student.name,
        email: student.email,
        company: student.company,
        department: student.department,
        proposalState: student.proposalState,
        programLectureUsid: student.programLectureUsid,
        courseLectureUsid: student.courseLectureUsid,
        leaderEmails: student.leaderEmails,
        url: student.url,
        classroomId: '',
      };

      setLectureConfirmProgress(await progressByCardId(studentCdo));
    }
  }
}
