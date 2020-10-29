import { patronInfo } from '@nara.platform/dock';
import { computed, decorate, observable } from 'mobx';
import moment from 'moment';
import { AplCdoModel } from './AplCdoModel';
import { AplXlsxModel } from './AplXlsxModel';
import EnumUtil, { AplStateView } from '../../shared/ui/logic/EnumUtil';
import { AplState } from './AplState';
import { NameValueList, QueryModel } from '../../shared/model';
import SkProfileService from '../../profile/present/logic/SkProfileService';
import { NewDatePeriod } from '../../shared/model/NewDatePeriod';

export class AplModel extends QueryModel {
  //
  id: string = '';
  title: string = '';
  type: string = '';
  typeName: string = '';
  channelId: string = '';
  channelName: string = '';
  startDate: number = 0;
  endDate : number = 0;
  institute: string = '';
  requestHour: number = 0;
  requestMinute: number = 0;
  allowHour: number = 0;
  allowMinute: number = 0;
  content: string = '';
  state: string = '';
  creationTime: number = 0;
  creatorId: string = '';
  creatorName: string = '';
  fileIds: string = '';
  approvalYn: boolean | undefined;
  approvalId: string = '';
  approvalName: string = '';
  updateTime: number = 0;
  causeOfReturn: string = '';
  cineroomId: string = '';
  patronKeyString: string = '';
  patronType: string = '';
  pavilionId: string = '';

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
    if (!aplModel.channelId) return 'Channel';
    if (!aplModel.period.startDateSub) return '교육시작일자';
    if (!aplModel.period.endDateSub) return '교육종료일자';
    if (!aplModel.institute) return '교육기관';
    if (!aplModel.requestHour) return '교육시간(시)';
    if (!aplModel.requestMinute) return '교육시간(분)';
    if (!aplModel.approvalId) return '승인자';
    // if (aplModel.subsidiaries.length === 0) return '관계사 공개 범위 설정';
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
      channelId: aplModel.channelId,
      channelName: aplModel.channelName,
      startDate: aplModel && aplModel.period && aplModel.period.startDateNumber,
      endDate: aplModel && aplModel.period && aplModel.period.endDateNumber,
      institute: aplModel.institute,
      requestHour: aplModel.requestHour,
      requestMinute: aplModel.requestMinute,
      allowHour: aplModel.allowHour,
      allowMinute: aplModel.allowMinute,
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
      cineroomId: aplModel.cineroomId||
        '',
      patronKeyString: aplModel.patronKeyString||
        '',
      patronType: aplModel.patronType||
        '',
      pavilionId: aplModel.pavilionId||
        '',
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
      교육기간: aplModel.channelName || '-',
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
  channelId: observable,
  channelName: observable,
  startDate: observable,
  endDate: observable,
  institute: observable,
  requestHour: observable,
  requestMinute: observable,
  allowHour: observable,
  allowMinute: observable,
  content: observable,
  state: observable,
  creationTime: observable,
  creatorId: observable,
  creatorName: observable,
  fileIds: observable,
  approvalYn: observable,
  approvalId: observable,
  approvalName: observable,
  updateTime: observable,
  causeOfReturn: observable,
});
