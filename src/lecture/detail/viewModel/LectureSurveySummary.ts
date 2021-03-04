import LangStrings from '../model/LangStrings';


export interface LectureSurveyRespondentCount {
  targetCount: number;
  respondentCount: number;
}
export default interface LectureSurveySummary {
  titles: LangStrings;
  round: number;  
  respondentCount: LectureSurveyRespondentCount;
}