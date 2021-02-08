import LangStrings from '../model/LangStrings';


export interface LectureSurveyRespondentCount {
  targetCount: number;
  respondentCount: number;
}
export default interface LectureSurveySummary {
  id: string;
  surveyCaseId: string;
  titles: LangStrings;
  round: number;  
  respondentCount: LectureSurveyRespondentCount;
}