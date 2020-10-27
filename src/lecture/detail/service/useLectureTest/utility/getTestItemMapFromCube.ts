/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import { findExamination, findExamPaperForm } from '../../../api/examApi';
import {
  LectureTestItem,
  LectureTestAnswerItem,
} from '../../../viewModel/LectureTest';
import {
  setLectureTestAnswerItem,
  setLectureTestItem,
} from 'lecture/detail/store/LectureTestStore';
import { findPersonalCube } from 'lecture/detail/api/mPersonalCubeApi';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import PersonalCube from '../../../model/PersonalCube';
import {
  findIsJsonStudentByCube,
  findStudent,
} from 'lecture/detail/api/lectureApi';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

function getPersonalCubeByParams(cubeId: string): Promise<PersonalCube> {
  return findPersonalCube(cubeId);
}

async function getTestItem(examId: string) {
  if (examId !== '') {
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

    const item: LectureTestItem = {
      id: examination.id,
      name: examination.examPaperTitle,
      questionCount: examination.questionCount,
      questions: examPaperForm.questions,
      successPoint: examination.successPoint,
      totalPoint: examTotalPoint,
    };
    return item;
  }
}

async function getTestAnswerItem(examId: string) {
  const item: LectureTestAnswerItem = {
    id: '',
    answers: [],
    submitted: false,
    submitAnswers: [],
  };

  if (examId !== '') {
    const denizenId = patronInfo.getDenizenId(); // denizenId는 파라메터로 넘기지 않고 서버단에서 해결할 것
    if (denizenId !== undefined) {
      const findAnswerSheetData = await findAnswerSheet(examId, denizenId);

      if (findAnswerSheetData.result !== null) {
        item.id = findAnswerSheetData.result.id;
        item.answers = findAnswerSheetData.result.answers!;
        item.submitted = findAnswerSheetData.result.submitted!;
        item.submitAnswers = findAnswerSheetData.result.submitAnswers!;
      }
    }

    return item;
  }
}

export async function getTestItemMapFromCube(
  cubeId: string,
  lectureCardId: string
): Promise<void> {
  // void : return이 없는 경우 undefined

  const personalCube = await getPersonalCubeByParams(cubeId);
  const examId =
    personalCube && personalCube.contents && personalCube.contents.examId;

  if (lectureCardId !== undefined) {
    const studentJoins = await findIsJsonStudentByCube(lectureCardId);
    if (studentJoins.length > 0 && studentJoins[0].studentId !== null) {
      const student = await findStudent(studentJoins[0].studentId);
      const learningState = studentJoins[0].learningState;

      if (examId !== undefined) {
        const testItem = await getTestItem(examId);
        if (testItem !== undefined) {
          testItem.student = {
            serviceType: student.serviceType,
            learningState,
          };
          setLectureTestItem(testItem);
          const answerItem = await getTestAnswerItem(examId);
          if (answerItem !== undefined) {
            if (answerItem.answers.length < 1) {
              testItem.questions.forEach((result, index) => {
                answerItem.answers.push({
                  questionNo: result.questionNo,
                  answer: '',
                });
              });
            }

            setLectureTestAnswerItem(answerItem);
          }
        }
      }
    }
  }
}
