import { axiosApi as axios } from '@nara.platform/accent';
import { AplRdoModel } from '../../model/AplRdoModel';
import { AplRequestCdoModel } from '../../model/AplRequestCdoModel';
import { AplListViewModel } from '../../model/AplListViewModel';
import { AplCountModel } from '../../model/AplCountModel';
import OffsetElementList from '../../../shared/model/OffsetElementList';
import { AplModel } from '../..';

export default class AplApi {
  URL = 'http://localhost:8233/apl';

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

  findAplCount(aplRdo: AplRdoModel) {
    return axios.get(this.URL + '/summary/count', { params: aplRdo })
      .then(response =>
        response && response.data && new AplCountModel(response.data) || new AplCountModel());
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
}

Object.defineProperty(AplApi, 'instance', {
  value: new AplApi(),
  writable: false,
  configurable: false,
});
