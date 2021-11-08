import { decorate, observable } from 'mobx';

export default class SearchInfoModel {
  //
  searchValue: string = '';
  recentSearchValue: string = '';
  inAgain: boolean = false;
}

decorate(SearchInfoModel, {
  searchValue: observable,
  recentSearchValue: observable,
  inAgain: observable,
});
