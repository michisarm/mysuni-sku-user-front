import { QnaState } from './vo/QnaState';
import { QueryModel } from '../../shared/model';
import { decorate, observable } from 'mobx';

export default class QuestionQueryModel extends QueryModel{
  //
  state: QnaState | QnaState[] | undefined = undefined;
}

decorate(QuestionQueryModel, {
  state: observable,
})
