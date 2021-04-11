/* eslint-disable consistent-return */

import { cacheableFindCoursePlan } from '../../../api/courseApi';
import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';
import Student from '../../../../model/Student';
import {
  getActiveCourseStructureItem,
  getActiveStructureItem,
} from '../../../utility/lectureStructureHelper';
import { findCardCache } from '../../../api/cardApi';

export async function getReportItem(
  coursePlanId: string,
  paramsPathname?: string
): Promise<LectureReport | undefined> {
  let lectureStructureItem;
  if (paramsPathname) {
    lectureStructureItem = getActiveStructureItem(paramsPathname);
  }
  console.log('lectureStructureItem', lectureStructureItem);
  const student = lectureStructureItem?.student;

  const coursePlan = await findCardCache(coursePlanId);
  console.log('coursePlan', coursePlan);
  //const coursePlan = await cacheableFindCoursePlan(coursePlanId);
  if (coursePlan === undefined) {
    return;
  }
  const lectureReport: LectureReport = { reportId: coursePlanId };
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};

  if (
    coursePlan.cardContents.reportFileBox.reportName !== '' &&
    coursePlan.cardContents.reportFileBox.reportName !== null
  ) {
    let state: State = 'None';

    reportFileBox.fileBoxId = coursePlan.cardContents.reportFileBox.fileBoxId;
    reportFileBox.report = coursePlan.cardContents.reportFileBox.report;
    reportFileBox.reportName = coursePlan.cardContents.reportFileBox.reportName;
    reportFileBox.reportQuestion =
      coursePlan.cardContents.reportFileBox.reportQuestion;

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
    if (lectureStructureItem?.student?.extraWork.reportStatus === 'PASS') {
      state = 'Completed';
    }
    lectureReport.state = state;
  }

  return lectureReport;
}
