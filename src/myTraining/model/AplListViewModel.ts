import moment from 'moment';
import { AplXlsxModel } from './AplXlsxModel';
import { AplStateView } from '../../shared/ui/logic/EnumUtil';
import { AplModel } from './index';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getChannelName } from 'shared/service/useCollege/useRequestCollege';

export class AplListViewModel extends AplModel {
  constructor(aplListView?: AplListViewModel) {
    super();
    if (aplListView) {
      Object.assign(this, { ...aplListView });
    }
  }

  static asXLSX(aplListView: AplListViewModel, index: number): AplXlsxModel {
    const channelName = getChannelName(aplListView.channelId);
    return {
      No: String(index + 1),
      교육명: aplListView.title || '-',
      교육형태: aplListView.typeName || '-',
      Channel: channelName || '-',
      교육기간:
        moment(aplListView.startDate).format('YYYY.MM.DD') +
          '~' +
          moment(aplListView.endDate).format('YYYY.MM.DD') || '-',
      교육시간:
        aplListView.requestHour + ':' + aplListView.requestMinute || '-',
      상태: AplStateView[aplListView.state] || '-',
      생성자:
        parsePolyglotString(aplListView.registrantUserIdentity?.name) || '-',
      승인일자:
        moment(aplListView.registeredTime).format('YYYY.MM.DD HH:mm:ss') || '-',
    };
  }
}
