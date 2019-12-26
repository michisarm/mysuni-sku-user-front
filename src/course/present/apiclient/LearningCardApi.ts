import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { LearningCardModel } from '../../model/LearningCardModel';
import { NameValueList } from '../../../shared/model/NameValueList';
import { LearningCardRdoModel } from '../../model/LearningCardRdoModel';

export default class LearningCardApi {
  //
  URL = '/api/course/learningCards';

  static instance: LearningCardApi;

  registerLearningCard(learningCard: LearningCardModel) {
    //
    return axios.post<string>(this.URL, learningCard)
      .then(response => response && response.data || null)
      .catch((reason) => {
        console.log(reason);
      });
  }

  findLearningCard(learningCardId: string) {
    //
    return axios.get<LearningCardModel>(this.URL + `/${learningCardId}`)
      .then(response => response && response.data || null);
  }

  findAllLearningCardByQuery(learningCardRdo: LearningCardRdoModel) {
    //
    return axios.get<OffsetElementList<LearningCardModel>>(this.URL + `/searchKey`, { params: learningCardRdo })
      .then(response => response && response.data || null);
  }

  modifyLearningCard(learningCardId: string, nameValues: NameValueList) {
    //
    return axios.put<void>(this.URL + `/${learningCardId}`, nameValues);
  }

  removeLearningCard(learningCardId: string) {
    //
    return axios.delete(this.URL + `/${learningCardId}`);
  }
}

Object.defineProperty(LearningCardApi, 'instance', {
  value: new LearningCardApi(),
  writable: false,
  configurable: false,
});
