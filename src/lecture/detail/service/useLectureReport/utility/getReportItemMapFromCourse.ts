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
  student?: Student
): Promise<LectureReport> {
  const coursePlan = await findCoursePlan(coursePlanId);
  const lectureReport: LectureReport = { reportId: coursePlanId };
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};
  if (coursePlan.reportFileBox.reportName !== '' && coursePlan.reportFileBox.reportName !== null) {
    let state: State = 'None';

    reportFileBox.fileBoxId = coursePlan.reportFileBox.fileBoxId;
    reportFileBox.report = coursePlan.reportFileBox.report;
    reportFileBox.reportName = coursePlan.reportFileBox.reportName;
    reportFileBox.reportQuestion = coursePlan.reportFileBox.reportQuestion;

    if (student !== undefined && student !== null) {
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
      studentReport.id = student.id;
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
