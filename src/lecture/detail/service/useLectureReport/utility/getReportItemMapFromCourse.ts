/* eslint-disable consistent-return */

import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { findCardCache } from '../../../api/cardApi';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

export async function getReportItem(
  coursePlanId: string,
  paramsPathname?: string
): Promise<LectureReport | undefined> {
  let lectureStructureItem;
  if (paramsPathname) {
    lectureStructureItem = getActiveStructureItem(paramsPathname);
  }

  const student = lectureStructureItem?.student;

  const coursePlan = await findCardCache(coursePlanId);
  if (coursePlan === undefined) {
    return;
  }
  const lectureReport: LectureReport = { reportId: coursePlanId };
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};

  if (coursePlan.cardContents.reportFileBox.reportName !== null) {
    let state: State = 'None';

    reportFileBox.fileBoxId = coursePlan.cardContents.reportFileBox.fileBoxId;
    reportFileBox.report = coursePlan.cardContents.reportFileBox.report;
    reportFileBox.reportName = parsePolyglotString(
      coursePlan.cardContents.reportFileBox.reportName,
      getDefaultLang(coursePlan.card?.langSupports || [])
    );
    reportFileBox.reportQuestion = parsePolyglotString(
      coursePlan.cardContents.reportFileBox.reportQuestion,
      getDefaultLang(coursePlan.card?.langSupports || [])
    );

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
