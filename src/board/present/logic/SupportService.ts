import SupportApi from '../apiclient/SupportApi';
import { action, observable, runInAction } from 'mobx';
import _ from 'lodash';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';
import PageModel from '../../../shared/components/Pagination/model/PageModel';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import CategoryModel from '../../model/vo/CategoryModel';
import { parsePolyglotString, PolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { autobind } from '@nara.platform/accent';
import QnaAnswerUdo from '../../model/vo/QnaAnswerUdo';
import OperatorModel from '../../model/vo/OperatorModel';
import QuestionQueryModel from '../../model/QuestionQueryModel';

@autobind
class SupportService {
  //
  static instance: SupportService;

  supportApi: SupportApi;

  @observable
  qnaQueryModel: QuestionQueryModel = new QuestionQueryModel();

  @observable
  qna: QnAModel = new QnAModel();

  @observable
  qnas: QnAModel[] = [];

  @observable
  finalOperator: OperatorModel = new OperatorModel();

  @observable
  emailOperator: OperatorModel = new OperatorModel();

  @observable
  categories: CategoryModel[] = [];

  @observable
  categoriesMap: Map<string, PolyglotString> = new Map<
    string,
    PolyglotString
  >();

  constructor(supportApi: SupportApi) {
    this.supportApi = supportApi;
  }

  @action
  changeQuestionQueryProps(name: string, value: any): void {
    //
    this.qnaQueryModel = _.set(this.qnaQueryModel, name, value);
  }

  @action
  async findMainCategory() {
    //
    const categories = await this.supportApi.findMainCategoies();

    runInAction(() => {
      const map = new Map<string, PolyglotString>();

      categories?.forEach((category: CategoryModel) => {
        map.set(category.id, category.name);
      });

      this.categoriesMap = map;
      this.categories = categories;
    });
  }

  @action
  async findAllCategories() {
    //
    const categories = await this.supportApi.findAllCategories();

    runInAction(() => {
      const map = new Map<string, PolyglotString>();

      categories?.forEach((category: CategoryModel) => {
        map.set(category.id, category.name);
      });

      this.categoriesMap = map;
      this.categories = categories;
    });
  }

  @action
  async findQnaMyOperator(pageModel: PageModel, state?: QnaState) {
    //
    const qnas = await this.supportApi.findQnAsMyOperator(
      QnAOperatorRdo.asQnaOperatorRdo(pageModel, state)
    );

    runInAction(() => {
      this.qnas = qnas.results.map((qna) => new QnAModel(qna));
    });

    return qnas.totalCount;
  }

  @action
  async findQnaById(qnaId: string) {
    //
    const qna = await this.supportApi.findQnaById(qnaId);

    runInAction(() => {
      this.qna = new QnAModel(qna);
    });

    return this.qna;
  }

  @action
  async findOperatorById(id: string) {
    //
    const operator = await this.supportApi.findOperatorById(id);

    return operator;
  }

  @action
  async modifiedAnswer(answerId: string) {
    //
    await this.supportApi.modifiedAnswer(
      answerId,
      QnaAnswerUdo.asQnaAnswerUdoByQnaModel(this.qna)
    );
  }

  @action
  setFinalOperator(operatorModel: OperatorModel) {
    //
    this.finalOperator = operatorModel;
  }

  @action
  setEmailOperator(operatorModel: OperatorModel) {
    //
    this.emailOperator = operatorModel;
  }

  @action
  changeQnaProps(name: string, value: any) {
    //
    this.qna = _.set(this.qna, name, value);
  }

  getCategoryName(categoryId: string): string {
    return parsePolyglotString(this.categoriesMap.get(categoryId));
  }
}

SupportService.instance = new SupportService(SupportApi.instance);
export default SupportService;
