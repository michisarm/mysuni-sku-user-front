import SupportApi from '../apiclient/SupportApi';
import { action, observable, runInAction } from 'mobx';
import _ from 'lodash';
import QnAModel from '../../model/QnAModel';
import { QnaState } from '../../model/vo/QnaState';
import PageModel from '../../../shared/components/Pagination/model/PageModel';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import CategoryModel from '../../model/vo/CategoryModel';
import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';
import { autobind } from '@nara.platform/accent';
import QnaAnswerUdo from '../../model/vo/QnaAnswerUdo';
import OperatorModel from '../../model/vo/OperatorModel';
import QuestionQueryModel from '../../model/QuestionQueryModel';
import QuestionSdo from '../../model/sdo/QuestionSdo';
import QuestionModel from '../../model/QuestionModel';
import SatisfactionCdo from '../../model/sdo/SatisfactionCdo';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { RequestChannel } from '../../model/vo/RequestChannel';

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
  questions: QuestionModel[] = [];

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
  async findQnaToMe(pageModel: PageModel, state?: QnaState) {
    //
    const questions = await this.supportApi.findQnasToMe(
      QnAOperatorRdo.asQnaOperatorRdo(pageModel, state)
    );

    runInAction(() => {
      this.questions = questions.results.map(
        (question) => new QuestionModel(question)
      );
    });

    return questions.totalCount;
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

  async registerQuestion(questionSdo: QuestionSdo): Promise<string> {
    //
    return this.supportApi.registerQuestion(questionSdo);
  }

  async registerSatisfaction(
    questionId: string,
    satisfactionCdo: SatisfactionCdo
  ): Promise<void> {
    //
    return this.supportApi.registerSatisfaction(questionId, satisfactionCdo);
  }

  @action
  async modifiedAnswer(questionId: string) {
    //
    await this.supportApi.modifiedAnswer(
      questionId,
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

  getMainCategorySelect() {
    //
    return this.categories
      .filter((category) => category.parentId === null)
      .map((category, index) => {
        return {
          key: index,
          value: category.id,
          text: parsePolyglotString(category.name),
        };
      });
  }

  getSubCategorySelect(mainCategoryId: string) {
    //
    return this.categories
      .filter(
        (category) =>
          category.parentId !== null && category.parentId === mainCategoryId
      )
      .map((category, index) => {
        return {
          key: index,
          value: category.id,
          text: parsePolyglotString(category.name),
        };
      });
  }

  getStateToString(state: QnaState): string {
    //
    if (state === QnaState.QuestionReceived) {
      return getPolyglotText('문의접수', 'support-qna-문의접수');
    } else if (state === QnaState.AnswerWaiting) {
      return getPolyglotText('답변대기', 'support-qna-답변대기');
    } else if (state === QnaState.AnswerCompleted) {
      return getPolyglotText('답변완료', 'support-qna-답변완료');
    }

    return '';
  }

  getChannelToString(requestChannel: RequestChannel): string {
    //
    if (requestChannel === RequestChannel.QnA) {
      return getPolyglotText('mySUNI', 'support-qna-QNA');
    } else if (requestChannel === RequestChannel.PHONE) {
      return getPolyglotText('전화', 'support-qna-PHONE');
    } else if (requestChannel === RequestChannel.MESSENGER) {
      return getPolyglotText('메신저', 'support-qna-MESSENGER');
    } else if (requestChannel === RequestChannel.EMAIL) {
      return getPolyglotText('이메일', 'support-qna-EMAIL');
    }

    return '';
  }
}

SupportService.instance = new SupportService(SupportApi.instance);
export default SupportService;
