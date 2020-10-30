/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import { findExamination } from '../../../api/examApi';
import { findCubeIntro } from '../../../api/mPersonalCubeApi';
import {
  findAnswerSheetBySurveyCaseId,
  findSurveyForm,
} from '../../../api/surveyApi';
import Student from '../../../model/Student';
import { State } from '../../../viewModel/LectureState';
import {
  LectureReport,
  StudentReport,
  ReportFileBox,
} from 'lecture/detail/viewModel/LectureReport';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

export async function getReportItem(
  cubeIntroId: string,
  studentId: string,
  student?: Student
): Promise<LectureReport> {
  const cubeIntro = await findCubeIntro(cubeIntroId);
  const lectureReport: LectureReport = {};
  const studentReport: StudentReport = {};
  const reportFileBox: ReportFileBox = {};
  if (cubeIntro.reportFileBox.reportName !== '') {
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
