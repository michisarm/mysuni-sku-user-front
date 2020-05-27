
import { axiosApi as axios, NameValueList } from '@nara.platform/accent';

import { OffsetElementList, CubeState, ProposalState } from '../../../shared/model';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { ApprovedResponse } from '../../model/ApprovedResponse';

import { PersonalCubeCdoModel } from '../../model/PersonalCubeCdoModel';
import LectureApprovalRdo from '../../model/LectureApprovalRdo';
import { ContentsProviderModel } from '../../../college/model/ContentsProviderModel';
import { IdNameApproval } from '../../../shared/model/IdNameApproval';
// import { NameValueListApproval } from '../../../shared/model/NameValueListApproval';

import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';

export default class ApprovalCubeApi {
  //
  static instance: ApprovalCubeApi;

  devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';

  lectureApprovalURL = this.devUrl + '/api/lecture/studentApproval';
  // baseUrl = this.devUrl + '/api/lecture/studentApproval';

  baseUrlApproved = this.devUrl + '/api/lecture/studentApproval/requestOpen';
  baseUrlRejected = this.devUrl + '/api/lecture/studentApproval/requestReject';

  static convertOffsetElementList(response: any): OffsetElementList<ApprovalCubeModel> {
    //
    if (!response || !response.data) {
      return new OffsetElementList<ApprovalCubeModel>();
    }
    const offsetElementList = new OffsetElementList<ApprovalCubeModel>(response.data);

    offsetElementList.results = offsetElementList.results.map((result) => new ApprovalCubeModel(result));
    return offsetElementList;
  }

  addApprovedLectureSingle() {

    const remark = '승인 테스트 입니다.';
    const proposalState = 'Approved';

    const idNameApproval = new IdNameApproval();
    idNameApproval.id = '05526';
    idNameApproval.name = 'name';
    const actor = IdNameApproval;

    // const nameValueListApproval = new NameValueListApproval();
    // nameValueListApproval.nameValues

    const studentArr = '["db1aebb4-ca22-45a4-bdc6-a63171670601"]';
    const students = studentArr;

    const params = {
      remark,
      proposalState,
      actor,
      students,
    };

    console.log('addApprovedLectureSingle params.remark :: ' + params.remark);

    return axios.post<ApprovedResponse>(this.baseUrlApproved, { params })
      .then(response => response && response.data);
  }

  addRejectedLectureSingle() {

    const remark = '반려 테스트 입니다.';
    const proposalState = 'Rejected';

    const idNameApproval = new IdNameApproval();
    idNameApproval.id = '05526';
    idNameApproval.name = 'name';
    const actor = IdNameApproval;

    // const nameValueListApproval = new NameValueListApproval();
    // nameValueListApproval.nameValues

    const studentArr = '["db1aebb4-ca22-45a4-bdc6-a63171670601"]';
    const students = studentArr;

    const params = {
      remark,
      proposalState,
      actor,
      students,
    };

    console.log('addRejectedLectureSingle params.remark :: ' + params.remark);

    return axios.post<ApprovedResponse>(this.baseUrlRejected, { params })
      .then(response => response && response.data);
  }

  // Query
  findApprovalCubesForSearch(offset: number, limit: number, proposalState?: ProposalState, approvalCube?: ApprovalCubeModel) {
    //
    console.log('ApprovalCubeApi findApprovalCubesForSearch offset ::' + offset);
    console.log('ApprovalCubeApi findApprovalCubesForSearch limit ::' + limit);
    console.log('ApprovalCubeApi findApprovalCubesForSearch proposalState ::' + proposalState);
    console.log('ApprovalCubeApi findApprovalCubesForSearch lectureCardId ::' + approvalCube?.lectureCardId);

    const lectureCardIdStr = approvalCube?.lectureCardId;

    // undefined 처리
    if ( typeof lectureCardIdStr === 'undefined' ) {
      console.log('ApprovalCubeApi if lectureCardIdStr ::' + lectureCardIdStr);
      //
      const params = {
        offset,
        limit,
        proposalState,
      };

      console.log('ApprovalCubeApi params.proposalState :: ' + params.proposalState);

      return axios.get<OffsetElementList<ApprovalCubeModel>>(this.lectureApprovalURL + `/searchKey`, { params })
        .then((response: any) => ApprovalCubeApi.convertOffsetElementList(response));
    } else {
      const lectureCardId = lectureCardIdStr;
      console.log('ApprovalCubeApi else lectureCardId ::' + lectureCardId);

      //
      const params = {
        offset,
        limit,
        proposalState,
        lectureCardId,
      };

      console.log('ApprovalCubeApi params.proposalState :: ' + params.proposalState);
      console.log('ApprovalCubeApi params.lectureCardId :: ' + params.lectureCardId);

      return axios.get<OffsetElementList<ApprovalCubeModel>>(this.lectureApprovalURL + `/searchKey`, { params })
        .then((response: any) => ApprovalCubeApi.convertOffsetElementList(response));
    }

  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios.get<ApprovalCubeModel>(this.lectureApprovalURL + `/${personalCubeId}`)
      .then(response => response && response.data || null);
  }

  findApprovalCube(studentId: string) {
    console.log('ApprovalCubeApi findApprovalCube studentId ::' + studentId);
    //
    return axios.get<ApprovalCubeModel>(this.lectureApprovalURL + `/${studentId}`)
      .then(response => response && response.data || null);
  }

  findFileBox(depotIds: string) {
    //
    return axios.get<string>(this.lectureApprovalURL + `?depotIds=%255B%2522${depotIds}%2522%255D`)
      .then(response => response && response.data || null);
  }

  findLectureApprovalSelect() {
    console.log('findLectureApprovalSelect ::');

    return axios.get<ContentsProviderModel[]>(this.lectureApprovalURL + '/lectures')
      .then(response => response && Array.isArray(response.data) && response.data || []);
  }

  studentRequestOpen(studentRequestCdo: StudentRequestCdoModel) {
    console.log('studentRequestOpen studentRequestCdo remark ::' + studentRequestCdo.remark);
    console.log('studentRequestOpen studentRequestCdo proposalState ::' + studentRequestCdo.proposalState);
    console.log('studentRequestOpen studentRequestCdo actor.id ::' + studentRequestCdo.actor.id);
    console.log('studentRequestOpen studentRequestCdo actor.name ::' + studentRequestCdo.actor.name);
    console.log('studentRequestOpen studentRequestCdo students ::' + studentRequestCdo.students);
    //
    const remark = studentRequestCdo.remark;
    const proposalState = studentRequestCdo.proposalState;
    const actor = studentRequestCdo.actor;
    const students = studentRequestCdo.students;

    const params = {
      remark,
      proposalState,
      actor,
      students,
    };

    console.log('studentRequestOpen params.remark ::' + params.remark);
    console.log('studentRequestOpen params.proposalState ::' + params.proposalState);
    console.log('studentRequestOpen params.actor.id ::' + params.actor.id);
    console.log('studentRequestOpen params.actor.name ::' + params.actor.name);
    console.log('studentRequestOpen params.students ::' + params.students);

    const paramJson = JSON.stringify(params);

    console.log('studentRequestOpen paramJson ::' + paramJson);

    return axios.post<ApprovedResponse>(this.lectureApprovalURL + '/requestOpen', studentRequestCdo)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(ApprovalCubeApi, 'instance', {
  value: new ApprovalCubeApi(),
  writable: false,
  configurable: false,
});
