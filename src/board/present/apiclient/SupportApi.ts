import { axiosApi as axios } from '@nara.platform/accent';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import OffsetElementList from '../../../shared/model/OffsetElementList';
import QnAModel from '../../model/QnAModel';
import { CategoryModel } from '../../model';
import QnaAnswerUdo from '../../model/vo/QnaAnswerUdo';
import OperatorModel from '../../model/vo/OperatorModel';
import QuestionSdo from '../../model/sdo/QuestionSdo';
import QuestionModel from '../../model/QuestionModel';
import SatisfactionCdo from '../../model/sdo/SatisfactionCdo';

class SupportApi {
  //
  static instance: SupportApi;

  URL = '/api/support/qnas';
  CATEGORY_URL = '/api/support/categories';
  OPERATOR_URL = '/api/support/operators';

  findQnAsMyOperator(qnAOperatorRdo: QnAOperatorRdo) {
    //
    return axios
      .get<OffsetElementList<QnAModel>>(this.URL, { params: qnAOperatorRdo })
      .then(
        (response) =>
          (response && response.data) || { results: [], totalCount: 0 }
      );
  }

  findQnasToMe(qnAOperatorRdo: QnAOperatorRdo) {
    //
    return axios
      .get<OffsetElementList<QuestionModel>>(this.URL + `/my`, { params: qnAOperatorRdo })
      .then(
        (response) =>
          (response && response.data) || { results: [], totalCount: 0 }
      );
  }

  findQnaById(qnaId: string) {
    //
    return axios
      .get<QnAModel>(this.URL + `/${qnaId}`)
      .then((response) => (response && response.data) || new QnAModel());
  }

  findMainCategoies() {
    //
    return axios
      .get(this.CATEGORY_URL + '/main', { params: { supportType: 'QNA' } })
      .then(
        (response) =>
          (response && response.data) || { results: [], totalCount: 0 }
      );
  }

  findAllCategories() {
    //
    return axios
      .get(this.CATEGORY_URL, { params: { supportType: 'QNA' } })
      .then((response) => (response && response.data) || new CategoryModel());
  }

  findOperatorById(id: string) {
    //
    return axios
      .get(this.OPERATOR_URL + `/${id}`)
      .then((response) => (response && response.data) || new OperatorModel());
  }

  registerQuestion(questionSdo: QuestionSdo): Promise<string> {
    //
    return axios.post(this.URL +  `/question`, questionSdo).then((response) => response && response.data || null)
  }

  registerSatisfaction(questionId: string, satisfactionCdo: SatisfactionCdo): Promise<void> {
    //
    return axios.put(this.URL + `/satisfaction/${questionId}`, satisfactionCdo).then((response) => response && response.data || null)
  }

  modifiedAnswer(answerId: string, qnaAnswerUdo: QnaAnswerUdo) {
    //
    return axios
      .put(this.URL + `/answer/${answerId}`, qnaAnswerUdo)
      .then((response) => response && response.data);
  }
}

SupportApi.instance = new SupportApi();
export default SupportApi;
