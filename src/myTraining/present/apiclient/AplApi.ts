import { axiosApi as axios } from '@nara.platform/accent';
import { AplRdoModel } from '../../model/AplRdoModel';
import { AplRequestCdoModel } from '../../model/AplRequestCdoModel';
import { AplListViewModel } from '../../model/AplListViewModel';
import { AplCountModel } from '../../model/AplCountModel';
import OffsetElementList from '../../../shared/model/OffsetElementList';
import { AplCdoModel } from '../../model/AplCdoModel';
import { AplModel } from '../../model';
import AplUdoModel from '../../model/AplUdoModel';

export default class AplApi {

  serverUrl = '/api/mytraining/apl';
  devUrl = process.env.REACT_APP_MY_LEARNING_SUMMARY_API  === undefined || process.env.REACT_APP_MY_LEARNING_SUMMARY_API  === '' ?
    this.serverUrl : process.env.REACT_APP_MY_LEARNING_SUMMARY_API ;

  URL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl;

  static instance: AplApi;

  //Query
  findAllAplsByQuery(aplRdo: AplRdoModel) {
    //
    return axios
      .get<OffsetElementList<AplListViewModel>>(this.URL, {
        params: aplRdo,
      })
      .then(
        (response: any) =>
          (response &&
            response.data &&
            new OffsetElementList<AplListViewModel>(response.data)) ||
          new OffsetElementList()
      );
  }

  findApl(aplId: string | undefined) {
    //
    return axios
      .get<AplModel>(this.URL + `/${aplId}`)
      .then(
        (response) =>
          (response && response.data && new AplModel(response.data)) ||
          new AplModel()
      );
  }

  findAplCount(aplRdo: AplRdoModel) {
    return axios.get(this.URL + '/summary/count', { params: aplRdo })
      .then(response =>
        response && response.data && new AplCountModel(response.data) || new AplCountModel());
  }

  //Query
  findAplsTreeByQuery(aplRdo: AplRdoModel) {
    //
    return axios
      .get<OffsetElementList<AplListViewModel>>(
        this.URL + `/tree/apl`,
        { params: aplRdo }
      )
      .then(
        (response: any) =>
          (response &&
            response.data &&
            new OffsetElementList<AplListViewModel>(response.data)) ||
          new OffsetElementList()
      );
  }

  findCreateApl(
    aplType: string | undefined,
    company: string | null | undefined
  ) {
    //
    return axios
      .get<AplModel>(this.URL + `/${aplType}/${company}`)
      .then(
        (response) =>
          (response && response.data && new AplModel(response.data)) ||
          new AplModel()
      );
  }


  aplCountAll() {
    //
    return axios
      .get<AplCountModel>(this.URL + '/count')
      .then((response) => (response && response.data) || null);
  }

  findAllAplsExcel(aplRdo: AplRdoModel) {
    //
    return axios
      .get<AplListViewModel[]>(this.URL + `/excelWithJoinedValue`, {
        params: aplRdo,
      })
      .then(
        (response: any) =>
          response &&
          response.data &&
          response.data.map(
            (apl: AplListViewModel) =>
              new AplListViewModel(apl)
          )
      );
  }

  /* 2020 10 28 SAVE */
  saveApl(aplCdo: AplCdoModel) {
    return axios
      .post<string>(this.URL, aplCdo)
      .then((response) => (response && response.data) || null);
  }

  modifyApl(aplId: number | undefined, isUse: boolean) {
    return axios
      .put<string>(this.URL + `/${aplId}/${isUse}`)
      .then((response) => (response && response.data) || null);
  }

  findCountMainCheck(
    company: string,
    aplType: string,
    startDate: number,
    endDate: number
  ) {
    //
    return axios
      .get<number>(this.URL + `/countSaveCheck`, {
        params: { company, aplType, startDate, endDate },
      })
      .then((response) => response.data);
  }

  ///////////////////////// 개편 /////////////////////////
  modifyAplWithApprovalState(aplUdo: AplUdoModel) {
    return axios
      .put(`${this.devUrl}/approvals`, aplUdo)
      .then(response => response && response.data || null)
      .catch(err => err && null);
  }

  findAllAplsForApproval(aplRdo: AplRdoModel) {
    return axios
      .get<OffsetElementList<AplListViewModel>>(`${this.devUrl}/approval-list`, { params: aplRdo })
      .then(response => response && new OffsetElementList<AplListViewModel>(response.data) || null)
      .catch(err => err && null);
  }
  ///////////////////////// 개편 /////////////////////////
}

Object.defineProperty(AplApi, 'instance', {
  value: new AplApi(),
  writable: false,
  configurable: false,
});
