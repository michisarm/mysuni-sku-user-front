import { axiosApi } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingTabModel from '../../model/MyTrainingTabModel';
import MyTrainingFilterRdoModel from '../../model/MyTrainingFilterRdoModel';
import { MyTrainingTableViewModel } from 'myTraining/model';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';

class MyTrainingApi {
  //
  static instance: MyTrainingApi;

  baseUrl =
    process.env.REACT_APP_ENVIRONMENT === undefined ||
    process.env.REACT_APP_ENVIRONMENT === 'server' ||
    process.env.REACT_APP_MY_TRAINING_API === undefined ||
    process.env.REACT_APP_MY_TRAINING_API === ''
      ? '/api/mytraining/mytraining/mytrainings'
      : process.env.REACT_APP_MY_TRAINING_API;

  saveAllLearningPassedToStorage(state: string, endDate: string) {
    const params = {
      state,
      endDate,
    };

    return axiosApi.get<any>(this.baseUrl + '/byState/lightWeight', { params });
  }

  getOffsetElementList(response: any) {
    //
    const offsetElementList = new OffsetElementList<MyTrainingModel>(
      response && response.data
    );

    offsetElementList.results = offsetElementList.results.map(
      (training) => new MyTrainingModel(training)
    );
    return offsetElementList;
  }

  // findAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
  //   //
  //   return axiosApi
  //     .post<OffsetElementList<MyTrainingModel>>(
  //       this.baseUrl + '/byState/filterWithJoinedValue',
  //       myTrainingRdo
  //     )
  //     .then(this.getOffsetElementList);
  // }

  fetchAllMyTrainings(myTrainingRdo: MyTrainingRdoModel) {
    //
    return axiosApi
      .post<OffsetElementList<MyTrainingModel>>(
        this.baseUrl + '/byState/fetchLearningTimeByUser',
        myTrainingRdo
      )
      .then(this.getOffsetElementList);
  }

  findAllMyTrainingsWithStamp(myTrainingRdo: MyTrainingRdoModel) {
    //
    const params = myTrainingRdo;

    return axiosApi
      .get<OffsetElementList<MyTrainingModel>>(this.baseUrl + '/stamps', {
        params,
      })
      .then(AxiosReturn);
  }

  findAllTabMyTraining() {
    return axiosApi
      .get<MyTrainingTabModel>(this.baseUrl + '/tab/counts')
      .then((response) => response.data);
  }

  //////////////////////// 개편 ////////////////////////

  findAllMyTrainingTableViewsSearch(
    myTrainingFilterRdo: MyTrainingFilterRdoModel
  ) {
    return axiosApi
      .post(
        `${this.baseUrl}/table/views/search?t=${Date.now()}`,
        myTrainingFilterRdo
      )
      .then((response) => (response && response.data) || null)
      .catch((error) => error && null);
  }

  findAllTableViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post(`${this.baseUrl}/table/views?t=${Date.now()}`, myTrainingFilterRdo)
      .then((response) => (response && response.data) || null)
      .catch((error) => error && null);
  }

  findEnrollTableViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .get<OffsetElementList<MyTrainingTableViewModel>>(
        '/api/cube/studentApprovals/enrolling'
      )
      .then((response) => (response && response.data) || null)
      .catch((error) => error && null);
  }

  findAllStampTableViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post<OffsetElementList<MyTrainingTableViewModel>>(
        `${this.baseUrl}/stamp/table/views`,
        myTrainingFilterRdo
      )
      .then((response) => (response && response.data) || null)
      .catch((error) => error && null);
  }

  findAllTableViewsForExcel(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post(`${this.baseUrl}/table/views/excel`, myTrainingFilterRdo)
      .then(
        (response) =>
          (response &&
            response.data.map(
              (myTrainingTableView: any) =>
                new MyTrainingTableViewModel(myTrainingTableView)
            )) ||
          null
      )
      .catch((error) => error && null);
  }

  findAllTabCount() {
    return axiosApi
      .get<MyTrainingTabModel>(`${this.baseUrl}/tab/counts/v2`)
      .then((response) => (response && response.data) || null)
      .catch((error) => error && null);
  }

  findAllFilterCountViews(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
    return axiosApi
      .post(`${this.baseUrl}/table/filter/count`, myTrainingFilterRdo)
      .then((response) => response.data || null)
      .catch((error) => error && null);
  }

  findCardNoteList(cardIds: string[]) {
    const splitedIds = (cardIds && cardIds.join(',')) || '';

    return axiosApi
      .get<any[]>(`/api/mytraining/note/list/cardInfo`, {
        params: {
          cardId: splitedIds,
        },
      })
      .then((response) => response.data || null)
      .catch((error) => error && null);
  }

  findCubeNoteList(cardIds: string[], cubeIds: string[]) {
    const splitedCardIds = (cardIds && cardIds.join(',')) || '';
    const splitedCubeIds = (cubeIds && cubeIds.join(',')) || '';

    return axiosApi
      .get<any[]>(`/api/mytraining/note/list/cubeInfo`, {
        params: {
          cardId: splitedCardIds,
          cubeId: splitedCubeIds,
        },
      })
      .then((response) => response.data || null)
      .catch((error) => error && null);
  }

  /*
    findAllMyTrainingsV2WithStamp(myTrainingFilterRdo: MyTrainingFilterRdoModel) {
      return axiosApi.post('http://localhost:8233/mytraining/mytrainings/stamps/v2', myTrainingFilterRdo)
        .then(response => response && response.data || null)
        .catch(error => error && null);
    }
  */
  //////////////////////// 개편 ////////////////////////
}

MyTrainingApi.instance = new MyTrainingApi();

export default MyTrainingApi;
