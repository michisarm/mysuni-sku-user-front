import { observable, action, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';
import _ from 'lodash';
import LearningCardApi from '../apiclient/LearningCardApi';
import { LearningCardModel } from '../../model/LearningCardModel';
import { LearningCardQueryModel } from '../../model/LearningCardQueryModel';

@autobind
export default class LearningCardService {
  //
  static instance: LearningCardService;

  learningCardApi: LearningCardApi;

  @observable
  learningCard: LearningCardModel = new LearningCardModel();

  @observable
  learningCards: OffsetElementList<LearningCardModel> = { results: [], totalCount: 0 };

  @observable
  learningCardQuery: LearningCardQueryModel = new LearningCardQueryModel();

  @observable
  learningCardListModalOpen: boolean = false;

  constructor(learningCardApi: LearningCardApi) {
    this.learningCardApi = learningCardApi;
  }

  registerLearningCard(learningCard: LearningCardModel) {
    //
    return this.learningCardApi.registerLearningCard(learningCard);
  }

  @action
  async findLearningCard(learningCardId: string) {
    //
    const learningCard = await this.learningCardApi.findLearningCard(learningCardId);
    return runInAction(() => {
      this.learningCard = new LearningCardModel(learningCard);
      return learningCard;
    });
  }

  @action
  async findAllLearningCardByQuery(learningCardQuery: LearningCardQueryModel) {
    //
    const learningCards = await this.learningCardApi.findAllLearningCardByQuery(LearningCardQueryModel.asLearningCardRdo(learningCardQuery));
    return runInAction(() => this.learningCards = learningCards);
  }

  modifyLearningCard(learningCardId: string, learningCard: LearningCardModel) {
    //
    this.learningCardApi.modifyLearningCard(learningCardId, LearningCardModel.asNameValues(learningCard));
  }

  removeLearningCard(learningCardId: string) {
    //
    this.learningCardApi.removeLearningCard(learningCardId);
  }

  @action
  changeLearningCardProps(name: string, value: string) {
    //
    this.learningCard = _.set(this.learningCard, name, value);
  }

  @action
  clearLearningCard() {
    //
    this.learningCard = new LearningCardModel();
  }

  @action
  changeLearningCardQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    //
    this.learningCardQuery = _.set(this.learningCardQuery, name, value);
    if (typeof value === 'object' && nameSub) {
      this.learningCardQuery = _.set(this.learningCardQuery, nameSub, valueSub);
    }
  }

  @action
  changeCubeListModalOpen(open: boolean) {
    //
    this.learningCardListModalOpen = open;
  }

}

Object.defineProperty(LearningCardService, 'instance', {
  value: new LearningCardService(LearningCardApi.instance),
  writable: false,
  configurable: false,
});
