export interface StudentScore {
  testScoreList: number[];
  testTotalScore: number;
  homeworkScore: number;
  numberOfTrials: number;
  latestScore: number;
  gotEssay: boolean;
  examId: string | null;
  paperId: string;
}
