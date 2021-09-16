import { axiosApi as axios } from '@nara.platform/accent';
import QnAOperatorRdo from '../../model/sdo/QnAOperatorRdo';
import OffsetElementList from '../../../shared/model/OffsetElementList';
import QnAModel from '../../model/QnAModel';

class SupportApi {
  //
  static instance: SupportApi;

  URL = '/api/support/qnas';
  CATEGORY_URL = '/api/support/categories';

  findQnAsMyOperator(qnAOperatorRdo: QnAOperatorRdo) {
    //
    return axios
      .get<OffsetElementList<QnAModel>>(this.URL, { params: qnAOperatorRdo })
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
}

SupportApi.instance = new SupportApi();
export default SupportApi;
