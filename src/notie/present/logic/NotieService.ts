
import { observable, action, runInAction } from 'mobx';
import MentionModel from 'notie/model/MentionModel';
import NotieApi from '../apiclient/NotieApi';


class NotieService {
  //
  static instance: NotieService;

  private notieApi: NotieApi;

  @observable
  notieActive: boolean = false;

  @observable
  progressedCount: number = 0;

  @observable
  completedCount: number = 0;

  @observable
  missedCount: number = 0;

  @observable
  waitingCount: number = 0;

  @observable
  myNotieMentions: MentionModel[] = [];

  constructor(notieApi: NotieApi = NotieApi.instance) {
    this.notieApi = notieApi;
  }

  @action
  async hasQuickLearningFeeds() {
    const notieActive = await this.notieApi.hasQuickLearningFeeds();

    runInAction(() => this.notieActive = notieActive);
    return notieActive;
  }

  get getQuickMenuFeed() {
    return this.notieActive;
  }

  @action
  async countMenuNoties(notieType: string) {
    const count = await this.notieApi.countMenuNoties(notieType);

    runInAction(() => {
      switch (notieType) {
        case 'Learning_Progress':
          this.progressedCount = count;
          break;
        case 'Learning_Passed':
          this.completedCount = count;
          break;
        case 'Learning_Missed':
          this.missedCount = count;
          break;
        case 'Learning_Waiting':
          this.waitingCount = count;
          break;
      }
    });

    return count;
  }

  @action
  async readNotie(notieType: string) {
    this.notieApi.readNotie(notieType);

    runInAction(() => {
      switch (notieType) {
        case 'Learning_Progress':
          this.progressedCount = 0;
          break;
        case 'Learning_Passed':
          this.completedCount = 0;
          break;
        case 'Learning_Missed':
          this.missedCount = 0;
          break;
        case 'Learning_Waiting':
          this.waitingCount = 0;
          break;
      }
    });
  }

  @action
  async findAllMyNotieMentions() {
    const myNotieMentions = await this.notieApi.findAllMyNotieMentions();

    runInAction(() => this.myNotieMentions = myNotieMentions);
    return myNotieMentions;
  }
}

NotieService.instance = new NotieService(NotieApi.instance);

export default NotieService;
