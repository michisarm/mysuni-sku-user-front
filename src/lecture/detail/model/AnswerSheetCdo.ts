export default interface AnswerSheetCdo {
  id?: string;
  serviceId: string;
  round: number;
  surveyCaseId: string;
  progress: string;
  respondent?: any;
  evaluationSheet?: any;
}
