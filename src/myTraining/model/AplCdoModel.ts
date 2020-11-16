import {patronInfo} from '@nara.platform/dock/src/snap/snap';
import { IconBoxModel, QueryModel } from '../../shared/model';

export class AplCdoModel {
  //
  // audienceKey: string = 'r2p8-r@nea-m5-c5';
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
  approvalEmail: string = '';
  approvalCompany: string = '';
  approvalDepartment: string = '';
}
