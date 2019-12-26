import { axiosApi as axios, NameValueList, OffsetElementList } from '@nara.platform/accent';
import { PersonalCubeModel } from '../../model/PersonalCubeModel';
import { PersonalCubeRdoModel } from '../../model/PersonalCubeRdoModel';
import { PersonalCubeCdoModel } from '../../model/PersonalCubeCdoModel';
import { ExcelView } from '../../../../shared/model/ExcelView';
import { ApprovalContentsRdo } from '../../model/ApprovalContentsRdo';
import { ApprovalContents } from '../../model/ApprovalContents';
import { PersonalCubeRequestCdoModel } from '../../model/PersonalCubeRequestCdoModel';

export default class PersonalCubeApi {

  URL = '/api/personalCube/personalcubes';
  flowURL = '/api/personalCube/cubes/flow';
  approvalURL = '/api/personalCube/approval';


  static instance: PersonalCubeApi;

  registerCube(cubeCdo: PersonalCubeCdoModel) {
    //
    console.log(cubeCdo);
    return axios.post<string>(this.URL + `/regist`, cubeCdo)
      .then(response => response && response.data || null);
  }

  findPersonalCube(personalCubeId: string) {
    //
    return axios.get<PersonalCubeModel>(this.URL + `/${personalCubeId}`)
      .then(response => response && response.data || null);
  }

  modifyPersonalCube(personalCubeId: string, nameValues: NameValueList) {
    //
    return axios.put<void>(this.URL + `/${personalCubeId}`, nameValues);
  }

  removePersonalCube(personalCubeId: string) {
    //
    return axios.delete(this.URL + `/${personalCubeId}`);
  }

  // Todo: totalCount를 얻는 메소드가 필요함.
  findAllPersonalCubes(offset: number, limit: number) {
    //
    return axios.get<OffsetElementList<PersonalCubeModel>>(this.URL, { params: {
      offset,
      limit,
    }}).then((response: any) => response && response.data || null);
  }

  //Query
  findAllPersonalCubesByQuery(personalCubeRdo: PersonalCubeRdoModel) {
    //
    return axios.get<OffsetElementList<PersonalCubeModel>>(this.URL + `/searchKey`, { params: personalCubeRdo })
      .then((response: any) => response && response.data || null);
  }

  findAllApprovalContents(approvalContents: ApprovalContentsRdo) {
    //
    return axios.get<OffsetElementList<ApprovalContents>>(this.approvalURL, { params: approvalContents })
      .then(response => response && response.data || null);
  }

  personalCubeRequestOpen(personalCubeRequestCdo: PersonalCubeRequestCdoModel) {
    //
    return axios.post<string>(this.flowURL + `/requestOpen`, personalCubeRequestCdo)
      .then(response => response && response.data || null);
  }

  personalCubeRequestReject(personalCubeRequestCdo: PersonalCubeRequestCdoModel) {
    //
    return axios.post<string>(this.flowURL + `/requestReject`, personalCubeRequestCdo)
      .then(response => response && response.data || null);
  }


  // todo Domain 변경으로 Excel 메소드 확인 필요 to 왕선임님
  findAllPersonalCubesExcel(personalCubeRdo: PersonalCubeRdoModel) {
    //
    return axios.get<ExcelView>(this.URL + `/excel`, { params: personalCubeRdo })
      // .then((response: any) => window.location.href = response.request.responseURL);
      .then((response: any) => console.log(response));
  }
}

Object.defineProperty(PersonalCubeApi, 'instance', {
  value: new PersonalCubeApi(),
  writable: false,
  configurable: false,
});
