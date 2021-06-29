export default interface ExamPaper {
  applyLimit: number;
  authorName: string;
  description: string;
  finalCopy: boolean;
  id: string;
  modifiedTime: number;
  modifier: string;
  //patronKey
  //questionSelectionConfig
  questionSelectionType: string;
  successPoint: number;
  time: number;
  title: string;
  totalPoint: number;
}
