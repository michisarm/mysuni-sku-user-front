
import { decorate, observable } from 'mobx';


class OffsetElementList<T> {
  //
  results: T[] = [];
  empty: boolean = false;
  totalCount: number = 0;
  title: string | null = null;

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
  title: observable,
});

export default OffsetElementList;
