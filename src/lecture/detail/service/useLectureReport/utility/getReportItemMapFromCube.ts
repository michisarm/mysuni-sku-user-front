/* eslint-disable consistent-return */

import { findCubeIntro } from '../../../api/mPersonalCubeApi';
import Student from '../../../model/Student';
import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';

export async function getReportItem(
  cubeIntroId: string,
  studentId: string,
  student?: Student
): Promise<LectureReport> {
  const cubeIntro = await findCubeIntro(cubeIntroId);
  const lectureReport: LectureReport = { reportId: cubeIntroId };
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};
  if (cubeIntro !== undefined && cubeIntro.reportFileBox.reportName !== '' && cubeIntro.reportFileBox.reportName !== null) {
    let state: State = 'None';

    reportFileBox.fileBoxId = cubeIntro.reportFileBox.fileBoxId;
    reportFileBox.report = cubeIntro.reportFileBox.report;
    reportFileBox.reportName = cubeIntro.reportFileBox.reportName;
    reportFileBox.reportQuestion = cubeIntro.reportFileBox.reportQuestion;

    if (student !== undefined) {
      if (
        student.homeworkContent !== null ||
        student.homeworkFileBoxId !== null
      ) {
        state = 'Progress';
        studentReport.homeworkContent = student.homeworkContent;
        studentReport.homeworkFileBoxId = student.homeworkFileBoxId;
      }
      if (
        student.homeworkOperatorComment !== null ||
        student.homeworkOperatorFileBoxId !== null
      ) {
        studentReport.homeworkOperatorComment = student.homeworkOperatorComment;
        studentReport.homeworkOperatorFileBoxId =
          student.homeworkOperatorFileBoxId;
      }
      studentReport.id = studentId;
    }
    lectureReport.reportFileBox = reportFileBox;
    lectureReport.studentReport = studentReport;
    if (student?.learningState == 'Passed') {
      state = 'Completed';
    }
    lectureReport.state = state;
  }

  return lectureReport;
}
