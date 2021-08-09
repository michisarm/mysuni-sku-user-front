/* eslint-disable consistent-return */

import { State } from '../../../viewModel/LectureReport';
import {
  LectureReport,
  StudentReport,
} from 'lecture/detail/viewModel/LectureReport';
import { CubeContents } from '../../../../model/CubeContents';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { Cube } from 'lecture/model/Cube';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

export async function getReportItem(
  cube: Cube,
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
    if (reportFileBox !== null && reportFileBox !== undefined) {
      lectureReport.reportFileBox = {
        report: reportFileBox.report,
        fileBoxId: reportFileBox.fileBoxId,
        reportName: parsePolyglotString(
          reportFileBox.reportName,
          getDefaultLang(cube.langSupports)
        ),
        reportQuestion: parsePolyglotString(
          reportFileBox.reportQuestion,
          getDefaultLang(cube.langSupports)
        ),
      };
    }
    lectureReport.studentReport = studentReport;
    if (lectureStructureItem?.student?.extraWork.reportStatus === 'PASS') {
      state = 'Completed';
    }
    lectureReport.state = state;
  }

  return lectureReport;
}
