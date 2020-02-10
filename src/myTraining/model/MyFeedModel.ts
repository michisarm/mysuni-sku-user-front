import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, IdName } from 'shared';
import { CubeTypeNameType } from 'personalcube/personalcube/model';

export enum NotieType {
  Email='Email',
  Feedback='Feedback',
  Message='Message',
  None='None'
}

class MyFeedModel extends DramaEntityObservableModel {
  //
  title: string = '';
  notieType: NotieType = NotieType.None;
  message: string = '';
  urgent: boolean = false;
  drama: IdName = new IdName();
  sender: IdName = new IdName();
  backLink: string = '';
  sentTime: number = 0;
  feedType: string = '';

  read: boolean = false;
  readTime: number = 0;

  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(myFeed?: MyFeedModel) {
    //
    super();

    if (myFeed) {
      Object.assign(this, { ...myFeed });

      this.notieType = MyFeedModel.getNotieType(myFeed);
    }
  }

  static getNotieType(myFeed: MyFeedModel) {
    //
    const notieType = myFeed.notieType as string;

    if (notieType === 'Email') {
      return NotieType.Email;
    }
    else if (notieType === 'Feedback') {
      return NotieType.Feedback;
    }
    else {
      return NotieType.Message;
    }
  }
}

decorate(MyFeedModel, {
  title: observable,
  notieType: observable,
  message: observable,
  urgent: observable,
  drama: observable,
  sender: observable,
  backLink: observable,
  sentTime: observable,
  read: observable,
  readTime: observable,
  feedType: observable,
});

export default MyFeedModel;
