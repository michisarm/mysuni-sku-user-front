import LangStrings from './LangStrings';
import SurveyRespondentCount from './SurveyRespondentCount';

// 간략화 되었음
export default interface SurveySummary {
  id: string,
  surveyCaseId: string;
  titles: LangStrings;
  round: number;
  respondentCount: SurveyRespondentCount;
}
