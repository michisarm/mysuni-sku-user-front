import { axiosApi as axios } from '@nara.platform/accent';

import { OffsetElementList, ProposalState } from '../../../shared/model';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { ApprovedResponse } from '../../model/ApprovedResponse';

import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';
import IdName from '../../../shared/model/IdName';
import ApprovalCubeRdoModel from '../../model/ApprovalCubeRdoModel';
import ApprovalCubeDetailModel from '../../model/ApprovalCubeDetailModel';

export default class ApprovalCubeApi {
  //
  static instance: ApprovalCubeApi;

  devUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEVELOPMENT_URL
      : '';

  lectureApprovalURL = '/api/lecture/studentApproval';
  lectureStudentURL = '/api/lecture/students';
  cubeApprovalURL = '/api/cube/studentApprovals';

  static convertOffsetElementList(
    response: any
  ): OffsetElementList<ApprovalCubeModel> {
    //
    if (!response || !response.data) {
      return new OffsetElementList<ApprovalCubeModel>();
    }
    const offsetElementList = new OffsetElementList<ApprovalCubeModel>(
      response.data
    );

    offsetElementList.results = offsetElementList.results.map(
      (result) => new ApprovalCubeModel(result)
    );
    return offsetElementList;
  }

  // Query
  findApprovalCubesForSearch(approvalCubeRdoModel: ApprovalCubeRdoModel) {
    //
    const params = approvalCubeRdoModel;

    return axios
      .get<OffsetElementList<ApprovalCubeModel>>(this.cubeApprovalURL, {
        params,
      })
      .then((response: any) =>
        ApprovalCubeApi.convertOffsetElementList(response)
      );
  }

  findApprovalCubesForExcel(
    orderBy: string,
    proposalState?: ProposalState,
    approvalCube?: ApprovalCubeModel
  ) {
    //
    const cubeId = approvalCube?.cubeId || '';
    const params = {
      orderBy,
      proposalState,
      cubeId,
    };

    return axios
      .get<ApprovalCubeModel[]>(this.lectureApprovalURL + `/excel`, { params })
      .then((response) => (response && response.data) || null);
  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios
      .get<ApprovalCubeModel>(this.lectureApprovalURL + `/${personalCubeId}`)
      .then((response) => (response && response.data) || null);
  }

  findApprovalCube(studentId: string) {
    //
    return axios
      .get<ApprovalCubeDetailModel>(
        this.cubeApprovalURL + `/${studentId}/detail`
      )
      .then((response) => (response && response.data) || null);
  }

  findLectureApprovalSelect() {
    return axios
      .get<IdName[]>(this.cubeApprovalURL + '/targetCubes')
      .then(
        (response) =>
          (response && Array.isArray(response.data) && response.data) || []
      );
  }

  // 미사용
  // studentRequestOpen(studentRequestCdo: StudentRequestCdoModel) {
  //   return axios
  //     .put<ApprovedResponse>(
  //       this.lectureStudentURL + '/accept',
  //       studentRequestCdo
  //     )
  //     .then(response => (response && response.data) || null);
  // }
  //
  // studentRequestReject(studentRequestCdo: StudentRequestCdoModel) {
  //   return axios
  //     .put<ApprovedResponse>(
  //       this.lectureStudentURL + '/reject',
  //       studentRequestCdo
  //     )
  //     .then(response => (response && response.data) || null);
  // }
}

Object.defineProperty(ApprovalCubeApi, 'instance', {
  value: new ApprovalCubeApi(),
  writable: false,
  configurable: false,
});
