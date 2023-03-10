import { decorate, observable } from 'mobx';
import { AplRdoModel, CountType } from './AplRdoModel';
import { NewQueryModel } from '../../shared/model';

export class AplQueryModel extends NewQueryModel {
  //
  collegeId: string = '';
  collegeName: string = '';
  channelId: string = '';
  channelName: string = '';
  state: string = '';
  currentPage: number = 0;

  static asAplRdo(menuMainQuery: AplQueryModel): AplRdoModel {
    return (
      {
        state: menuMainQuery && menuMainQuery.state,
        countType: CountType.None,
        offset: menuMainQuery && menuMainQuery.offset,
        limit: menuMainQuery && menuMainQuery.limit,
      }
    );
  }
}

decorate(AplQueryModel, {
  state: observable,
});
