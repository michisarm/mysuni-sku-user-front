
import { axiosApi as axios, NameValueList } from '@nara.platform/accent';

import { OffsetElementList, CubeState, ProposalState } from '../../../shared/model';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { PersonalCubeCdoModel } from '../../model/PersonalCubeCdoModel';

export default class ApprovalCubeApi {
  //
  static instance: ApprovalCubeApi;

  devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';

  lectureApprovalURL = this.devUrl + '/api/lecture/studentApproval';

  static convertOffsetElementList(response: any): OffsetElementList<ApprovalCubeModel> {
    //
    if (!response || !response.data) {
      return new OffsetElementList<ApprovalCubeModel>();
    }
    const offsetElementList = new OffsetElementList<ApprovalCubeModel>(response.data);

    offsetElementList.results = offsetElementList.results.map((result) => new ApprovalCubeModel(result));
    return offsetElementList;
  }

  // Query
  findApprovalCubesForSearch(offset: number, limit: number, proposalState?: ProposalState) {

    console.log('ApprovalCubeApi findApprovalCubesForSearch offset ::' + offset);
    console.log('ApprovalCubeApi findApprovalCubesForSearch limit ::' + limit);
    console.log('ApprovalCubeApi findApprovalCubesForSearch proposalState ::' + proposalState);

    //
    const params = {
      offset,
      limit,
      proposalState,
    };
    return axios.get<OffsetElementList<ApprovalCubeModel>>(this.lectureApprovalURL + `/searchKey`, { params })
      .then((response: any) => ApprovalCubeApi.convertOffsetElementList(response));
  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios.get<ApprovalCubeModel>(this.lectureApprovalURL + `/${personalCubeId}`)
      .then(response => response && response.data || null);
  }

  findFileBox(depotIds: string) {
    //
    return axios.get<string>(this.lectureApprovalURL + `?depotIds=%255B%2522${depotIds}%2522%255D`)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(ApprovalCubeApi, 'instance', {
  value: new ApprovalCubeApi(),
  writable: false,
  configurable: false,
});
