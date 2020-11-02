import { AnswerItemType } from './AnswerItemType';
import { CriteriaItemModel } from '../../form/model/CriteriaItemModel';
import { MatrixItem } from '../../../lecture/detail/viewModel/LectureSurveyState';

export class AnswerItemModel {
  //
  answerItemType: AnswerItemType = AnswerItemType.Choice;
  itemNumbers: string[] = [];
  criteriaItem: CriteriaItemModel = new CriteriaItemModel();
  sentence: string = '';
  matrixItem: MatrixItem | null = null;

  constructor(answerItem?: AnswerItemModel) {
    if (answerItem) {
      Object.assign(this, answerItem);
      switch (answerItem.answerItemType) {
        case 'Criterion':
          this.criteriaItem = new CriteriaItemModel(answerItem.criteriaItem);
          break;
      }
    }
  }

  containsAnswer(number: string) {
    return !!this.itemNumbers.find(itemNumber => itemNumber === number);
  }
}
