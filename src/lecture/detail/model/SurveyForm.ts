import { CriteriaItemModel } from '../../../survey/form/model/CriteriaItemModel';
import { CriterionModel } from '../../../survey/form/model/CriterionModel';
import { CriteriaItem } from '../viewModel/LectureSurveyState';
import LangStrings from './LangStrings';
import Question from './SurveyQuestion';

// 간략화 되었음
export default interface SurveyForm {
  id: string;
  titles: LangStrings;
  questions: Question[];
  criterionList: CriterionModel[];
}
