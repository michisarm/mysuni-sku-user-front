/* eslint-disable consistent-return */

import { findCoursePlan } from '../../../api/courseApi';
import Student from '../../../model/Student';
import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';

export async function getReportItem(
  coursePlanId: string,
  studentId: string,
  student?: Student
): Promise<LectureReport> {
  const coursePlan = await findCoursePlan(coursePlanId);
  const lectureReport: LectureReport = {};
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};
  if (coursePlan.reportFileBox.reportName !== '') {
    let state: State = 'None';

    reportFileBox.fileBoxId = coursePlan.reportFileBox.fileBoxId;
    reportFileBox.report = coursePlan.reportFileBox.report;
    reportFileBox.reportName = coursePlan.reportFileBox.reportName;
    reportFileBox.reportQuestion = coursePlan.reportFileBox.reportQuestion;

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
        // TODO : 담당자 답변시 완료 상태가 맞는지 확인
        state = 'Completed';
        studentReport.homeworkOperatorComment = student.homeworkOperatorComment;
        studentReport.homeworkOperatorFileBoxId =
          student.homeworkOperatorFileBoxId;
      }
      studentReport.id = studentId;
    }
    lectureReport.reportFileBox = reportFileBox;
    lectureReport.studentReport = studentReport;
    lectureReport.state = state;
  }

  return lectureReport;
}
