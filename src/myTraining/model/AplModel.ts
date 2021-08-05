import { patronInfo } from '@nara.platform/dock';
import { computed, decorate, observable } from 'mobx';
import moment from 'moment';
import { AplCdoModel } from './AplCdoModel';
import { AplXlsxModel } from './AplXlsxModel';
import EnumUtil, { AplStateView } from '../../shared/ui/logic/EnumUtil';
import { AplState } from './AplState';
import { NameValueList, NewQueryModel } from '../../shared/model';
import SkProfileService from '../../profile/present/logic/SkProfileService';
import { AplType } from './AplType';
import { AplStateName } from './AplStateName';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

class AplModel extends NewQueryModel {
  //
  id: string = '';
  title: PolyglotString = { ko: '', en: '', zh: '' };
  type: string = '';
  typeName: string = '';
  collegeId: string = '';
  collegeName: PolyglotString = { ko: '', en: '', zh: '' };
  channelId: string = '';
  channelName: PolyglotString = { ko: '', en: '', zh: '' };
  startDate: number = 0;
  endDate: number = 0;
  institute: string = '';
  requestHour: number = 0;
  requestMinute: number = 0;
  allowHour: number = 0;
  allowMinute: number = 0;
  allowTime: number = 0;
  updateHour: number = 0;
  updateMinute: number = 0;
  content: string = '';
  state: AplState = AplState.Created;
  creationTime: number = 0;
  creatorId: string = '';
  creatorName: string = '';
  fileIds: string = '';
  approvalYn: boolean | undefined;
  approvalId: string = '';
  approvalName: PolyglotString = { ko: '', en: '', zh: '' };
  approvalEmail: string = '';
  approvalTime: number = 0;
  updateId: string = '';
  updateName: string = '';
  updateTime: number = 0;
  causeOfReturn: string = '';
  cineroomId: string = '';
  patronKeyString: string = '';
  patronType: string = '';
  pavilionId: string = '';
  approvalCompany: PolyglotString = { ko: '', en: '', zh: '' };
  approvalDepartment: PolyglotString = { ko: '', en: '', zh: '' };

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

  /* 등록일자 */
  @computed get displayCreationTime() {
    return this.creationTime
      ? moment(this.creationTime).format('YYYY.MM.DD')
      : '-';
  }

  @computed get displayCreationDateTime() {
    return this.creationTime
      ? moment(this.creationTime).format('YYYY.MM.DD HH:mm:ss')
      : '-';
  }

  /* 교육시간(교육인정시간) */
  @computed get displayAllowTime() {
    let allowLearningTime = '-';

    if (this.state === AplState.Opened) {
      if (this.updateHour || this.updateMinute) {
        allowLearningTime = `${this.updateHour}시 ${this.updateMinute}분`;
      } else {
        allowLearningTime =
          this.allowHour || this.allowMinute
            ? `${this.allowHour}시 ${this.allowMinute}분`
            : '-';
      }
    }

    if (this.state === AplState.Rejected) {
      allowLearningTime =
        this.allowHour || this.allowMinute
          ? `${this.allowHour}시 ${this.allowMinute}분`
          : '-';
    }

    return allowLearningTime;
  }

  /* 교육기간 ex) 2020.10.12~2020.11.12 */
  @computed get displayLearningTime() {
    return `${moment(this.startDate).format('YYYY.MM.DD')}~${moment(
      this.endDate
    ).format('YYYY.MM.DD')}`;
  }

  /* 처리일자 :: 승인일자 */
  @computed get displayApprovalDateTime() {
    let approvalDateTime = '-';

    if (this.state === AplState.Opened) {
      if (this.updateTime) {
        approvalDateTime = moment(this.updateTime).format(
          'YYYY.MM.DD HH:mm:ss'
        );
      } else {
        approvalDateTime = this.allowTime
          ? moment(this.allowTime).format('YYYY.MM.DD HH:mm:ss')
          : '-';
      }
    }

    if (this.state === AplState.Rejected) {
      approvalDateTime = this.allowTime
        ? moment(this.allowTime).format('YYYY.MM.DD HH:mm:ss')
        : '-';
    }

    return approvalDateTime;
  }

  /* 승인상태 */
  @computed get displayStateName() {
    const stateName = AplStateName[this.state];
    return stateName;
  }

  @computed get displayTypeName() {
    /* 교육형태가 Etc 인 경우 :: 기타-직접입력 > On-Line Video 특강 */
    if (this.type === 'Etc') {
      return `기타-직접입력 > ${this.typeName}`;
    }

    return this.typeName;
  }

  @computed get displayCollegeChannelName() {
    return `${this.collegeName} | ${this.channelName}`;
  }

  /*@computed
  get isNameShowAsYesNo() {
    if (this.isNameShow === undefined) return '';
    return this.isNameShow ? 'Yes' : 'No';
  }*/

  static isBlank(aplModel: AplModel): string {
    if (!aplModel.title) {
      return getPolyglotText('교육명', '개학등록-승인요청-필수1');
    }
    if (!aplModel.type) {
      return getPolyglotText('교육형태', '개학등록-승인요청-필수2');
    }
    /*if (!aplModel.typeName) return '교육형태명';*/
    if (aplModel.type === AplType.Etc && !aplModel.typeName) {
      return getPolyglotText('교육형태명', '개학등록-승인요청-필수3');
    }
    if (!aplModel.collegeId) {
      return getPolyglotText('College', '개학등록-승인요청-필수4');
    }
    if (!aplModel.channelId) {
      return getPolyglotText('Channel', '개학등록-승인요청-필수5');
    }
    /*if (!aplModel.channelId) return 'Channel';*/
    if (!aplModel.period.startDateMoment) {
      return getPolyglotText('교육시작일자', '개학등록-승인요청-필수6');
    }
    if (!aplModel.period.endDateMoment) {
      return getPolyglotText('교육종료일자', '개학등록-승인요청-필수7');
    }
    if (!aplModel.institute) {
      return getPolyglotText('교육기관', '개학등록-승인요청-필수8');
    }
    if (
      Number(aplModel.requestHour) === 0 &&
      Number(aplModel.requestMinute) === 0
    ) {
      return getPolyglotText('교육시간', '개학등록-승인요청-필수9');
    }
    //if (!aplModel.requestHour) return '교육시간(시)';
    //if (!aplModel.requestMinute) return '교육시간(분)';
    if (!aplModel.content) {
      return getPolyglotText('교육내용', '개학등록-승인요청-필수10');
    }
    if (!aplModel.approvalId) {
      return getPolyglotText('승인자', '개학등록-승인요청-필수11');
    }
    // if (!aplModel.fileIds) return '첨부파일';
    return 'success';
  }

  static asNameValues(aplModel: AplModel): NameValueList {
    //const asNameValues = {
    return {
      nameValues: [
        {
          name: 'title',
          value: parsePolyglotString(aplModel.title),
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
      title: parsePolyglotString(aplModel.title),
      type: aplModel.type,
      typeName: aplModel.typeName,
      collegeId: aplModel.collegeId,
      collegeName: parsePolyglotString(aplModel.collegeName),
      channelId: aplModel.channelId,
      channelName: parsePolyglotString(aplModel.channelName),
      startDate: aplModel && aplModel.period && aplModel.period.startDateLong,
      endDate: aplModel && aplModel.period && aplModel.period.endDateLong,
      institute: aplModel.institute,
      requestHour: aplModel.requestHour,
      requestMinute: aplModel.requestMinute,
      allowHour: aplModel.requestHour,
      allowMinute: aplModel.requestMinute,
      content: aplModel.content,
      state: aplModel.state,
      creationTime: aplModel.creationTime,
      creatorId: SkProfileService.instance.skProfile.email || '',
      creatorName:
        parsePolyglotString(SkProfileService.instance.skProfile.name) ||
        patronInfo.getPatronName() ||
        '',
      fileIds: aplModel.fileIds || '',
      approvalYn: aplModel.approvalYn || false,
      approvalId: aplModel.approvalId || '',
      approvalName: parsePolyglotString(aplModel.approvalName) || '',
      updateTime: aplModel.updateTime,
      causeOfReturn: aplModel.causeOfReturn || '',
      approvalEmail: aplModel.approvalEmail || '',
      approvalCompany: parsePolyglotString(aplModel.approvalCompany) || '',
      approvalDepartment:
        parsePolyglotString(aplModel.approvalDepartment) || '',
    };
  }

  /*
   * @deprecated use aplModelListViewModel.asXLSX
   */
  static asXLSX(aplModel: AplModel, index: number): AplXlsxModel {
    //
    return {
      No: String(index + 1),
      교육명: parsePolyglotString(aplModel.title) || '-',
      교육형태: aplModel.typeName || '-',
      Channel: parsePolyglotString(aplModel.channelName) || '-',
      교육기간:
        moment(aplModel.startDate).format('YYYY.MM.DD HH:mm:ss') +
          '~' +
          moment(aplModel.endDate).format('YYYY.MM.DD HH:mm:ss') || '-',
      교육시간: aplModel.requestHour + ':' + aplModel.requestMinute || '-',
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
  allowTime: observable,
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
  approvalEmail: observable,
  approvalCompany: observable,
  approvalDepartment: observable,
});

export default AplModel;
