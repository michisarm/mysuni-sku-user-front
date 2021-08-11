import { computed, decorate, observable } from 'mobx';
import moment from 'moment';
import { AplCdoModel } from './AplCdoModel';
import { AplState } from './AplState';
import { NameValueList, NewQueryModel } from '../../shared/model';
import { AplType } from './AplType';
import { aplStateNamePolyglotText } from './AplStateName';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { UserIdentity } from 'shared/model/UserIdentity';

class AplModel extends NewQueryModel {
  id: string = '';
  title: string = '';
  type: string = '';
  typeName: string = '';
  collegeId: string = '';
  channelId: string = '';
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
  registeredTime: number = 0;
  modifiedTime: number = 0;
  fileIds: string = '';
  approvalYn: boolean | undefined;

  causeOfReturn: string = '';
  patronKeyString: string = '';

  registrantUserIdentity: UserIdentity | undefined;
  modifierUserIdentity: UserIdentity | undefined;
  approvalUserIdentity: UserIdentity | undefined;

  constructor(aplModel?: AplModel) {
    super();
    if (aplModel) {
      Object.assign(this, { ...aplModel });
    }
  }

  /* 등록일자 */
  @computed get displayCreationTime() {
    return this.registeredTime
      ? moment(this.registeredTime).format('YYYY.MM.DD')
      : '-';
  }

  @computed get displayCreationDateTime() {
    return this.registeredTime
      ? moment(this.registeredTime).format('YYYY.MM.DD HH:mm:ss')
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
      if (this.modifiedTime) {
        approvalDateTime = moment(this.modifiedTime).format(
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
    const stateName = aplStateNamePolyglotText(this.state);
    return stateName;
  }

  @computed get displayTypeName() {
    /* 교육형태가 Etc 인 경우 :: 기타-직접입력 > On-Line Video 특강 */
    if (this.type === 'Etc') {
      return `기타-직접입력 > ${this.typeName}`;
    }

    return this.typeName;
  }

  static isBlank(aplModel: AplModel): string {
    if (!aplModel.title) {
      return getPolyglotText('교육명', '개학등록-승인요청-필수1');
    }
    if (!aplModel.type) {
      return getPolyglotText('교육형태', '개학등록-승인요청-필수2');
    }
    if (aplModel.type === AplType.Etc && !aplModel.typeName) {
      return getPolyglotText('교육형태명', '개학등록-승인요청-필수3');
    }
    if (!aplModel.collegeId) {
      return getPolyglotText('College', '개학등록-승인요청-필수4');
    }
    if (!aplModel.channelId) {
      return getPolyglotText('Channel', '개학등록-승인요청-필수5');
    }
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
    if (!aplModel.content) {
      return getPolyglotText('교육내용', '개학등록-승인요청-필수10');
    }
    if (!aplModel.approvalUserIdentity?.id) {
      return getPolyglotText('승인자', '개학등록-승인요청-필수11');
    }
    return 'success';
  }

  static asNameValues(aplModel: AplModel): NameValueList {
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
  }

  static asCdo(aplModel: AplModel): AplCdoModel {
    return {
      title: aplModel.title,
      type: aplModel.type,
      typeName: aplModel.typeName,
      collegeId: aplModel.collegeId,
      channelId: aplModel.channelId,
      startDate: aplModel && aplModel.period && aplModel.period.startDateLong,
      endDate: aplModel && aplModel.period && aplModel.period.endDateLong,
      institute: aplModel.institute,
      requestHour: aplModel.requestHour,
      requestMinute: aplModel.requestMinute,
      allowHour: aplModel.requestHour,
      allowMinute: aplModel.requestMinute,
      content: aplModel.content,
      state: aplModel.state,
      fileIds: aplModel.fileIds || '',
      approvalYn: aplModel.approvalYn || false,
      approvalId: aplModel.approvalUserIdentity?.id || '',
      causeOfReturn: aplModel.causeOfReturn || '',
    };
  }
}

export default AplModel;

decorate(AplModel, {
  id: observable,
  title: observable,
  type: observable,
  typeName: observable,
  collegeId: observable,
  channelId: observable,
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
  registeredTime: observable,
  modifiedTime: observable,
  fileIds: observable,
  approvalYn: observable,
  causeOfReturn: observable,
  patronKeyString: observable,
  registrantUserIdentity: observable,
  modifierUserIdentity: observable,
  approvalUserIdentity: observable,
});
