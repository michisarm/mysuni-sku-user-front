import QuestionType from "./QuestionType";


export interface GradeSheet {
  id: string;
  examId: string;
  examineeId: string;
  examineeEmail: string;
  examineeName: string;
  graderId: string;
  graderName: string;
  graderComment: string;
  obtainedScore: number;
  questionCount: number;
  finished: boolean;
  grades: ItemGrade[];
}


export interface ItemGrade {
  questionNo: string;
  questionType: QuestionType;
  examineeAnswer: string;
  correctAnswer: string;
  allocatedPoint: number;
  obtainedPoint: number;
  comment: string;
}


export interface EssayScore {
  questionNo: string;
  score: number;
}


export function getEssayScores(gradeSheet: GradeSheet): EssayScore[] {
  return gradeSheet.grades
    .filter(grade => grade.questionType === 'Essay')
    .map(essayGrade => {
      return {
        questionNo: essayGrade.questionNo,
        score: essayGrade.obtainedPoint,
      }
    });
}