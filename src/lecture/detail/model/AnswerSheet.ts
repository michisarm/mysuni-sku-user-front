export default interface AnswerSheet {
  answerState: string; // SAVE, SUBMIT, PASS, FAIL
  answers: ItemAnswer[];
  appliedDate: string;
  applyCount: number;
  denizenId: string;
  finished: boolean;
  //grader
  graderComment: string;
  id: string;
  lectureId: string;
  obtainedScore: number;
  paperId: string;
  scoreList: number[];
  trials: number;
}

export interface AnswerSheetSdo {
  answerState: string; // SAVE, SUBMIT, PASS, FAIL
  answers: ItemAnswer[];
  examPaperId: string;
  lectureId: string;
}

export interface ItemAnswer {
  answer: string;
  obtainedScore?: number;
  sequence: number;
}
