import { decorate, observable } from 'mobx';

export default class SearchInfoModel {
  //
  searchValue: string = '';
  recentSearchValue: string = '';
  inAgain: boolean = false;

  errataValue: string = '';
}

decorate(SearchInfoModel, {
  searchValue: observable,
  recentSearchValue: observable,
  inAgain: observable,

  errataValue: observable,
});
