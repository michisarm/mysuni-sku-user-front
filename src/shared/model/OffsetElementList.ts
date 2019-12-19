
import { decorate, observable } from 'mobx';


class OffsetElementList<T> {
  //
  results: T[] = [];
  empty: boolean = false;
  totalCount: number = 0;

  constructor(offsetElementList?: OffsetElementList<T>) {
    //
    if (offsetElementList) {
      Object.assign(this, offsetElementList);
    }
  }
}

decorate(OffsetElementList, {
  results: observable,
  empty: observable,
  totalCount: observable,
});

export default OffsetElementList;
