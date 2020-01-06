
import { decorate, observable } from 'mobx';


class FeedEventRdo {
  //
  citizenId: string = '';
  feedType: string = '';

  constructor(FeedEventRdo?: FeedEventRdo) {
    //
    if (FeedEventRdo) {
      Object.assign(this, FeedEventRdo);
    }
  }
}

decorate(FeedEventRdo, {
  citizenId: observable,
  feedType: observable,
});

export default FeedEventRdo;

