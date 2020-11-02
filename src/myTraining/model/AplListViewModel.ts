import { DramaEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import moment from 'moment';
import { AplModel } from '.';
import { AplXlsxModel } from './AplXlsxModel';
import { SearchFilter } from './SearchFilter';
import EnumUtil, { AplStateView } from '../../shared/ui/logic/EnumUtil';


export class AplListViewModel extends AplModel {
  //organizer: IdName = new IdName();

  constructor(aplListView?: AplListViewModel) {
    super();
    if (aplListView) {
      Object.assign(this, { ...aplListView });
    }
  }

  static asXLSX(aplListView: AplListViewModel, index: number): AplXlsxModel {
    //
    return {
      No: String(index + 1),
      교육명: aplListView.title || '-',
      교육형태: aplListView.typeName || '-',
      Channel: aplListView.channelName || '-',
      교육기간:
        moment(aplListView.startDate).format('YYYY.MM.DD') +
        '~' +
        moment(aplListView.endDate).format('YYYY.MM.DD') || '-',
      교육시간:
        aplListView.requestHour + ':' + aplListView.requestMinute || '-',
      상태:
        EnumUtil.getEnumValue(AplStateView, aplListView.state).get(
          aplListView.state
        ) || '-',
      생성자: aplListView.creatorName || '-',
      승인일자:
        moment(aplListView.creationTime).format('YYYY.MM.DD HH:mm:ss') || '-',
    };
  }
}

decorate(AplListViewModel, {
  id: observable,
  state: observable,
  creatorName: observable,
  creationTime: observable,
});
