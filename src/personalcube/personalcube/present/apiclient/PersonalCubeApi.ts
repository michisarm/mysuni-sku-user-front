import { axiosApi as axios, NameValueList } from '@nara.platform/accent';

import { OffsetElementList, CubeState } from 'shared/model';
import { PersonalCubeModel } from '../../model/PersonalCubeModel';
import { PersonalCubeRdoModel } from '../../model/PersonalCubeRdoModel';
import { PersonalCubeCdoModel } from '../../model/PersonalCubeCdoModel';
import { ExcelView } from '../../../../shared/model/ExcelView';
import { ApprovalContentsRdo } from '../../model/ApprovalContentsRdo';
import { ApprovalContents } from '../../model/ApprovalContents';
import { PersonalCubeRequestCdoModel } from '../../model/PersonalCubeRequestCdoModel';
import LearningTabCountViewModel from 'lecture/model/learning/LearningTabCountViewModel';

const BASE_URL = '/api/personalCube/personalcubes';

export function findPersonalCube(
  personalCubeId: string
): Promise<PersonalCubeModel | undefined> {
  const url = `${BASE_URL}/${personalCubeId}`;
  return axios
    .get<PersonalCubeModel>(url)
    .then((response) => (response && response.data) || null);
}

export default class PersonalCubeApi {
  //
  static instance: PersonalCubeApi;

  // devUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT_URL : '';
  devUrl = '';
  URL = this.devUrl + '/api/personalCube/personalcubes';
  flowURL = this.devUrl + '/api/personalCube/cubes/flow';
  approvalURL = this.devUrl + '/api/personalCube/approval';
  depotURL = this.devUrl + '/api/depot/depotFile/multiple';

  // serverUrl = '/api/personalCube';
  // devUrl = process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === undefined || process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === '' ?
  //   this.serverUrl : process.env.REACT_APP_DEV_PERSONAL_CUBE_API ;
  //
  // baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
  //   this.serverUrl : this.devUrl;

  // baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  // process.env.REACT_APP_PERSONAL_CUBE_API === undefined || process.env.REACT_APP_PERSONAL_CUBE_API === '' ?
  //   '/api/personalCube' : process.env.REACT_APP_PERSONAL_CUBE_API;

  /*URL = this.baseUrl + '/personalcubes';
  flowURL = this.baseUrl + '/cubes/flow';
  approvalURL = this.baseUrl + '/approval';
  depotURL = 'http://localhost:8080/depotFile/multiple';*/

  static convertOffsetElementList(
    response: any
  ): OffsetElementList<PersonalCubeModel> {
    //
    if (!response || !response.data) {
      return new OffsetElementList<PersonalCubeModel>();
    }
    const offsetElementList = new OffsetElementList<PersonalCubeModel>(
      response.data
    );

    offsetElementList.results = offsetElementList.results.map(
      (result) => new PersonalCubeModel(result)
    );
    return offsetElementList;
  }

  findCubeCount() {
    //
    return axios
      .get<LearningTabCountViewModel>('/api/cube/cubes/cubeCount')
      .then((response) => (response && response.data) || null);
  }

  registerCube(cubeCdo: PersonalCubeCdoModel) {
    //
    return axios
      .post<string>('/api/cube/userCubes', cubeCdo)
      .then((response) => (response && response.data) || null);
  }

  registerUserCube(cubeCdo: PersonalCubeCdoModel) {
    //
    return axios
      .post<string>('/api/cube/userCubes', cubeCdo)
      .then((response) => (response && response.data) || null);
  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios
      .get<PersonalCubeModel>(this.URL + `/${personalCubeId}`)
      .then((response) => (response && response.data) || null);
  }

  modifyPersonalCube(personalCubeId: string, nameValues: NameValueList) {
    //
    return axios.put<void>(this.URL + `/${personalCubeId}`, nameValues);
  }

  removePersonalCube(personalCubeId: string) {
    //
    return axios.delete(this.URL + `/${personalCubeId}`);
  }

  // Todo: totalCount ??? ?????? ???????????? ?????????.
  findAllPersonalCubes(offset: number, limit: number) {
    //
    return axios
      .get<OffsetElementList<PersonalCubeModel>>('/api/cube/userCubes', {
        params: {
          offset,
          limit,
        },
      })
      .then((response: any) => (response && response.data) || null);
  }

  // Query
  findAllPersonalCubesByQuery(personalCubeRdo: PersonalCubeRdoModel) {
    //
    return axios
      .get<OffsetElementList<PersonalCubeModel>>(this.URL + `/searchKey`, {
        params: personalCubeRdo,
      })
      .then((response: any) => (response && response.data) || null);
  }

  // Query
  findPersonalCubesForCreator(
    offset: number,
    limit: number,
    cubeState?: CubeState
  ) {
    //
    const params = {
      offset,
      limit,
      cubeState,
    };
    return axios
      .get<OffsetElementList<PersonalCubeModel>>(`/api/cube/userCubes`, {
        params,
      })
      .then((response: any) =>
        PersonalCubeApi.convertOffsetElementList(response)
      );
  }

  findAllApprovalContents(approvalContents: ApprovalContentsRdo) {
    //
    return axios
      .get<OffsetElementList<ApprovalContents>>(this.approvalURL, {
        params: approvalContents,
      })
      .then((response) => (response && response.data) || null);
  }

  personalCubeRequestOpen(personalCubeRequestCdo: PersonalCubeRequestCdoModel) {
    //
    return axios
      .post<string>(this.flowURL + `/requestOpen`, personalCubeRequestCdo)
      .then((response) => (response && response.data) || null);
  }

  personalCubeRequestReject(
    personalCubeRequestCdo: PersonalCubeRequestCdoModel
  ) {
    //
    return axios
      .post<string>(this.flowURL + `/requestReject`, personalCubeRequestCdo)
      .then((response) => (response && response.data) || null);
  }

  // todo Domain ???????????? Excel ????????? ?????? ?????? to ????????????
  findAllPersonalCubesExcel(personalCubeRdo: PersonalCubeRdoModel) {
    //
    return (
      axios
        .get<ExcelView>(this.URL + `/excel`, { params: personalCubeRdo })
        // .then((response: any) => window.location.href = response.request.responseURL);
        .then(() => {})
    );
  }

  findFileBox(depotIds: string) {
    //
    return axios
      .get<string>(this.depotURL + `?depotIds=%255B%2522${depotIds}%2522%255D`)
      .then((response) => (response && response.data) || null);
  }
}

Object.defineProperty(PersonalCubeApi, 'instance', {
  value: new PersonalCubeApi(),
  writable: false,
  configurable: false,
});
