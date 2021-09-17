import SupportApi from '../apiclient/SupportApi';
import { action, observable, runInAction } from 'mobx';
import _ from 'lodash';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';
import PageModel from '../../../shared/components/Pagination/model/PageModel';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import CategoryModel from '../../model/vo/CategoryModel';
import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { autobind } from '@nara.platform/accent';
import QnaAnswerUdo from '../../model/vo/QnaAnswerUdo';
import OperatorModel from '../../model/vo/OperatorModel';

@autobind
class SupportService {
  //
  static instance: SupportService;

  supportApi: SupportApi;

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
}

SupportService.instance = new SupportService(SupportApi.instance);
export default SupportService;
