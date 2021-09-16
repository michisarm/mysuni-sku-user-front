import SupportApi from '../apiclient/SupportApi';
import { action, observable, runInAction } from 'mobx';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';
import PageModel from '../../../shared/components/Pagination/model/PageModel';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import CategoryModel from '../../model/vo/CategoryModel';
import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

class SupportService {
  //
  static instance: SupportService;

  supportApi: SupportApi;

  @observable
  qna: QnAModel = new QnAModel();

  @observable
  qnas: QnAModel[] = [];

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
    console.log(this.supportApi);

    const qna = await this.supportApi.findQnaById(qnaId);

    runInAction(() => {
      this.qna = new QnAModel(qna);
    });
  }
}

SupportService.instance = new SupportService(SupportApi.instance);
export default SupportService;
