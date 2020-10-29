import { decorate, observable } from 'mobx';
import {AplRdoModel} from './AplRdoModel';
import {QueryModel} from '../../shared/model';

export class AplQueryModel extends QueryModel {
  //
  state: string = '';
  currentPage: number = 0;

  static asAplRdo(menuMainQuery: AplQueryModel) : AplRdoModel {
    return (
      {
        state: menuMainQuery && menuMainQuery.state,
        offset: menuMainQuery && menuMainQuery.offset,
        limit: menuMainQuery && menuMainQuery.limit,
      }
    );
  }
}

decorate(AplQueryModel, {
  state: observable,
});
