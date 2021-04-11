/* eslint-disable consistent-return */

import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';
import Student from '../../../../model/Student';
import { CubeContents } from '../../../../model/CubeContents';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

export async function getReportItem(
  cubeContents: CubeContents,
  paramsPathname?: string
): Promise<LectureReport> {
  const { reportFileBox, id } = cubeContents;
  const lectureReport: LectureReport = { reportId: id };
  const studentReport: StudentReport = {};

  let lectureStructureItem;
  if (paramsPathname) {
    lectureStructureItem = getActiveStructureItem(paramsPathname);
  }
  console.log('lectureStructureItem', lectureStructureItem);
  const student = lectureStructureItem?.student;

  if (lectureStructureItem !== undefined && lectureStructureItem.can === true) {
    let state: State = 'None';

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
