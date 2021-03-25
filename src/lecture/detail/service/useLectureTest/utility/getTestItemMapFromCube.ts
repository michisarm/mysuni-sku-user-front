/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findExamination, findExamPaperForm } from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { setLectureTestItem } from 'lecture/detail/store/LectureTestStore';
import { cacheableFindPersonalCube } from 'lecture/detail/api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import {
  findIsJsonStudentByCube,
  findStudent,
  setCubeStudentExamId,
} from 'lecture/detail/api/lectureApi';
import { findGradeSheet } from 'lecture/detail/api/assistantApi';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import { getEssayScores } from 'lecture/detail/model/GradeSheet';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

function getPersonalCubeByParams(cubeId: string): Promise<PersonalCube> {
  return cacheableFindPersonalCube(cubeId);
}

async function getTestItem(examId: string) {
  if (examId !== '' && examId !== null) {
    let examination = null;
    {
      const { result } = await findExamination(examId);
      examination = result;
    }

    let examPaperForm = null;
    let examTotalPoint = 0;
    {
      const { result } = await findExamPaperForm(examination.paperId);
      examPaperForm = result;
      examPaperForm.questions.map((result, index) => {
        examTotalPoint += result.allocatedPoint;
      });
    }

    const denizenId = patronInfo.getDenizenId() || '';
    const gradeSheet = await findGradeSheet(examId, denizenId);
    const graderComment = (gradeSheet && gradeSheet.graderComment) || '';
    const essayScores = (gradeSheet && getEssayScores(gradeSheet)) || [];

    const item: LectureTestItem = {
      id: examination.id,
      name: examination.examPaperTitle,
      questionCount: examination.questionCount,
      questions: examPaperForm.questions,
      successPoint: examination.successPoint,
      totalPoint: examTotalPoint,
      graderComment,
      essayScores,
      description: examPaperForm.description,
    };
    return item;
  }
}

export async function getTestItemMapFromCube(
  params: LectureRouterParams
): Promise<LectureTestItem | undefined> {
  // void : return이 없는 경우 undefined

  const personalCube = await getPersonalCubeByParams(params.contentId);

  const studentJoins = await findIsJsonStudentByCube(params.lectureId);
  let examId = '';
  if (studentJoins.length > 0 && studentJoins[0].studentId !== null) {
    const student = await findStudent(studentJoins[0].studentId);
    examId = student && student.studentScore && student.studentScore.examId;

    if (examId === undefined || examId === null || examId === '') {
      // examId set
      await setCubeStudentExamId(
        params.contentId,
        studentJoins[0].studentId
      ).then(response => {
        examId = response.testId;
      });
    }
  }

  if (examId !== undefined && examId !== null && examId !== '') {
    const testItem = await getTestItem(examId);
    if (testItem !== undefined) {
      setLectureTestItem(testItem);
    }
    return testItem;
  }
  return undefined;
}
