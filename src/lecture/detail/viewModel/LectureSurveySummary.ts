import LangStrings from '../model/LangStrings';


export interface LectureSurveyRespondentCount {
  targetCount: number;
  respondentCount: number;
}
export default interface LectureSurveySummary {
  surveyCaseId: string;
  titles: LangStrings;
  round: number;  
  respondentCount: LectureSurveyRespondentCount;
}