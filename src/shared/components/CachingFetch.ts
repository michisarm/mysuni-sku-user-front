
import moment, { Moment } from 'moment';


class CachingFetch {
  //
  cachingMillisecond: number;

  inProgress: boolean = false;

  inProgressFetching?: Promise<any>;

  fetchedTime?: Moment;


  constructor(cachingMillisecond: number = 1000) {
    this.cachingMillisecond = cachingMillisecond;
  }


  fetch(promise: () => Promise<any>, then: (result: any) => any) {
    //
    if (this.inProgress) {
      return true;
    }
    else if (this.fetchedTime) {
      if (moment().diff(this.fetchedTime) < this.cachingMillisecond) {
        return false;
      }
    }

    this.fetchedTime = moment();
    this.inProgress = true;

    this.inProgressFetching = promise().then((result) => {
      //
      this.inProgress = false;
      this.inProgressFetching = undefined;

      return result;
    }).then(then);

    return true;
  }
}

export default CachingFetch;
