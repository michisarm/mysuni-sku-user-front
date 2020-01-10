import { action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import MyFeedApi from '../apiclient/MyFeedApi';
import MyFeedModel from '../../model/MyFeedModel';
import MyFeedRdoModel from '../../model/MyFeedRdoModel';


@autobind
class MyFeedService {
  //
  static instance: MyFeedService;

  private myFeedApi: MyFeedApi;

  @observable
  _myFeeds: MyFeedModel[] = [];


  constructor(myFeedApi: MyFeedApi) {
    this.myFeedApi = myFeedApi;
  }

  @computed
  get myFeeds() {
    //
    const myFeeds = this._myFeeds as any;
    return myFeeds.peek();
  }

  // My Feed ----------------------------------------------------------------------------------------------------------

  @action
  clearOnce(index: number){
    const myFeeds = new Array<MyFeedModel>();

    this._myFeeds.map((value: MyFeedModel, innerIndex: number) => {
      if(index !== innerIndex) {
        myFeeds.push(value);
      }
    });

    this._myFeeds = myFeeds;
  }

  @action
  clear() {
    this._myFeeds = [];
  }

  @action
  async findAllMyFeeds(limit: number, offset: number, read: boolean) {
    //
    const rdo = MyFeedRdoModel.new(limit, offset, read);
    const offsetList = await this.myFeedApi.findAllFeeds(rdo);

    runInAction(() => this._myFeeds = offsetList.results);
    return offsetList;
  }

  @action
  async findAndAddAllMyFeeds(limit: number, offset: number) {
    //
    const rdo = MyFeedRdoModel.newDefault(limit, offset);
    const offsetList = await this.myFeedApi.findAllFeeds(rdo);

    runInAction(() => this._myFeeds = offsetList.results);
    return offsetList;
  }

  @action
  async onReadNotie(notieId: string) {
    //
    await this.myFeedApi.onReadNotieFeed(notieId);
  }
}

MyFeedService.instance = new MyFeedService(MyFeedApi.instance);

export default MyFeedService;
