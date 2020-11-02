import EvaluationSheetModel from '../../../survey/answer/model/EvaluationSheetModel';
import AnswerProgress from './AnswerProgress';

// 간략화 되었음
export default interface AnswerSheet {
  progress: AnswerProgress;
  evaluationSheet: EvaluationSheetModel;
  round: number;
  serviceId: string;
}
