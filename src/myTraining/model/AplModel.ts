import { patronInfo } from '@nara.platform/dock';
import { computed, decorate, observable } from 'mobx';
import moment from 'moment';
import { AplCdoModel } from './AplCdoModel';
import { AplXlsxModel } from './AplXlsxModel';
import EnumUtil, { AplStateView } from '../../shared/ui/logic/EnumUtil';
import { AplState } from './AplState';
import {IconBoxModel, NameValueList, NewQueryModel} from '../../shared/model';
import SkProfileService from '../../profile/present/logic/SkProfileService';
import {AplType} from './AplType';
import SelectOptions from "../ui/model/SelectOptions";

class AplModel extends NewQueryModel {
  //
  id: string = '';
  title: string = '';
  type: string = '';
  typeName: string = '';
  collegeId: string = '';
  collegeName: string = '';
  channelId: string = '';
  channelName: string = '';
  startDate: number = 0;
  endDate : number = 0;
  institute: string = '';
  requestHour: number = 0;
  requestMinute: number = 0;
  allowHour: number = 0;
  allowMinute: number = 0;
  updateHour: number = 0;
  updateMinute: number = 0;
  content: string = '';
  state: string = '';
  creationTime: number = 0;
  creatorId: string = '';
  creatorName: string = '';
  fileIds: string = '';
  approvalYn: boolean | undefined;
  approvalId: string = '';
  approvalName: string = '';
  approvalTime: number = 0;
  updateId: string = '';
  updateName: string = '';
  updateTime: number = 0;
  causeOfReturn: string = '';
  cineroomId: string = '';
  patronKeyString: string = '';
  patronType: string = '';
  pavilionId: string = '';
  approvalCompany: string = '';
  approvalDepartment: string = '';

  // requiredSubsidiaries: IdName[] = [];

  constructor(aplModel?: AplModel) {
    super();
    if (aplModel) {
      // const cubeIntro = apl.cubeIntro && new IdName(apl.cubeIntro) || this.cubeIntro;
      // let tag = '';
      // if (apl.tags) apl.tags.forEach(tags => tag = `${tag ? `${tag},${tags}` : tags}`);
      Object.assign(this, { ...aplModel });
    }
  }

  @computed
  get getTime() {
    //
    return moment(this.creationTime).format('YYYY.MM.DD HH:mm:ss');
  }

  /*@computed
  get isNameShowAsYesNo() {
    if (this.isNameShow === undefined) return '';
    return this.isNameShow ? 'Yes' : 'No';
  }*/

  static isBlank(aplModel: AplModel): string {
    if (!aplModel.title) return '교육명';
    if (!aplModel.type) return '교육형태';
    /*if (!aplModel.typeName) return '교육형태명';*/
    if (aplModel.type===AplType.Etc&&!aplModel.typeName) return '교육형태명';
    if (!aplModel.collegeId) return 'College';
    if (!aplModel.channelId) return 'Channel';
    /*if (!aplModel.channelId) return 'Channel';*/
    if (!aplModel.period.startDateMoment) return '교육시작일자';
    if (!aplModel.period.endDateMoment) return '교육종료일자';
    if (!aplModel.institute) return '교육기관';
    if (!aplModel.requestHour) return '교육시간(시)';
    if (!aplModel.requestMinute) return '교육시간(분)';
    if (!aplModel.content) return '교육내용';
    if (!aplModel.approvalId) return '승인자';
    /*if (!aplModel.fileIds) return '첨부파일';*/
    return 'success';
  }

  static asNameValues(aplModel: AplModel): NameValueList {
    //const asNameValues = {
    return {
      nameValues: [
        {
          name: 'title',
          value: aplModel.title,
        },
        {
          name: 'type',
          value: aplModel.type,
        },
        {
          name: 'collegeId',
          value: aplModel.collegeId,
        },
        {
          name: 'channelId',
          value: aplModel.channelId,
        },
        {
          name: 'institute',
          value: aplModel.institute,
        },
        {
          name: 'state',
          value: aplModel.state,
        },
      ],
    };

    // return asNameValues;
  }

  static asCdo(aplModel: AplModel): AplCdoModel {
    //
    return {
      title: aplModel.title,
      type: aplModel.type,
      typeName: aplModel.typeName,
      collegeId: aplModel.collegeId,
      collegeName: aplModel.collegeName,
      channelId: aplModel.channelId,
      channelName: aplModel.channelName,
      startDate: aplModel && aplModel.period && aplModel.period.startDateLong,
      endDate : aplModel && aplModel.period && aplModel.period.endDateLong,
      institute: aplModel.institute,
      requestHour: aplModel.requestHour,
      requestMinute:aplModel.requestMinute,
      allowHour: aplModel.requestHour,
      allowMinute: aplModel.requestMinute,
      content: aplModel.content,
      state: aplModel.state,
      creationTime: aplModel.creationTime,
      creatorId:
        SkProfileService.instance.skProfile.member.email ||
        patronInfo.getPatronEmail() ||
        '',
      creatorName:
        SkProfileService.instance.skProfile.member.name ||
        patronInfo.getPatronName() ||
        '',
      fileIds: aplModel.fileIds||'',
      approvalYn: aplModel.approvalYn||false,
      approvalId: aplModel.approvalId||'',
      approvalName: aplModel.approvalName||'',
      updateTime: aplModel.updateTime,
      causeOfReturn: aplModel.causeOfReturn||'',
      approvalCompany: aplModel.approvalCompany||'',
      approvalDepartment: aplModel.approvalDepartment||'',
    };
  }

  /*
   * @deprecated use aplModelListViewModel.asXLSX
   */
  static asXLSX(aplModel: AplModel, index: number): AplXlsxModel {
    //
    return {
      No: String(index + 1),
      교육명: aplModel.title || '-',
      교육형태: aplModel.typeName || '-',
      Channel: aplModel.channelName || '-',
      교육기간: moment(aplModel.startDate).format('YYYY.MM.DD HH:mm:ss')+'~'+ moment(aplModel.endDate).format('YYYY.MM.DD HH:mm:ss') || '-',
      교육시간: aplModel.requestHour +':'+ aplModel.requestMinute|| '-',
      상태:
        EnumUtil.getEnumValue(AplStateView, aplModel.state).get(
          aplModel.state
        ) || '-',
      생성자: aplModel.creatorName || '-',
      승인일자:
        moment(aplModel.creationTime).format('YYYY.MM.DD HH:mm:ss') || '-',
    };
  }
}

decorate(AplModel, {
  title: observable,
  type: observable,
  typeName: observable,
  collegeId: observable,
  collegeName: observable,
  channelId: observable,
  channelName: observable,
  startDate: observable,
  endDate: observable,
  institute: observable,
  requestHour: observable,
  requestMinute: observable,
  allowHour: observable,
  allowMinute: observable,
  updateHour: observable,
  updateMinute: observable,
  content: observable,
  state: observable,
  creationTime: observable,
  creatorId: observable,
  creatorName: observable,
  fileIds: observable,
  approvalYn: observable,
  approvalId: observable,
  approvalName: observable,
  approvalTime: observable,
  updateId: observable,
  updateName: observable,
  updateTime: observable,
  causeOfReturn: observable,
  approvalCompany: observable,
  approvalDepartment: observable,
});

export default AplModel;
