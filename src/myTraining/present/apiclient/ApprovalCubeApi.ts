
import { axiosApi as axios } from '@nara.platform/accent';

import { OffsetElementList, ProposalState } from '../../../shared/model';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { ApprovedResponse } from '../../model/ApprovedResponse';

import { ContentsProviderModel } from '../../../college/model/ContentsProviderModel';

import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';

export default class ApprovalCubeApi {
  //
  static instance: ApprovalCubeApi;

  devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';

  lectureApprovalURL = this.devUrl + '/api/lecture/studentApproval';
  // baseUrl = this.devUrl + '/api/lecture/studentApproval';

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
  findApprovalCubesForSearch(offset: number, limit: number, orderBy: string, proposalState?: ProposalState, approvalCube?: ApprovalCubeModel) {
    //
    const lectureCardId = approvalCube?.lectureCardId || '';
    const params = {
      offset,
      limit,
      orderBy,
      proposalState,
      lectureCardId,
    };

    return axios.get<OffsetElementList<ApprovalCubeModel>>(this.lectureApprovalURL + `/searchKey`, { params })
      .then((response: any) => ApprovalCubeApi.convertOffsetElementList(response));

  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios.get<ApprovalCubeModel>(this.lectureApprovalURL + `/${personalCubeId}`)
      .then(response => response && response.data || null);
  }

  findApprovalCube(studentId: string) {
    //
    return axios.get<ApprovalCubeModel>(this.lectureApprovalURL + `/${studentId}`)
      .then(response => response && response.data || null);
  }

  findLectureApprovalSelect() {
    return axios.get<ContentsProviderModel[]>(this.lectureApprovalURL + '/lectures')
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  studentRequestOpen(studentRequestCdo: StudentRequestCdoModel) {
    return axios.post<ApprovedResponse>(this.lectureApprovalURL + '/requestOpen', studentRequestCdo)
      .then(response => response && response.data || null);
  }

  studentRequestReject(studentRequestCdo: StudentRequestCdoModel) {
    return axios.post<ApprovedResponse>(this.lectureApprovalURL + '/requestReject', studentRequestCdo)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(ApprovalCubeApi, 'instance', {
  value: new ApprovalCubeApi(),
  writable: false,
  configurable: false,
});
