
import { observable, action, computed, runInAction } from 'mobx';
import LectureCardModel from '../../model/LectureCardModel';
import LectureCardApi from '../apiclient/LectureCardApi';


class LectureCardService {
  //
  static instance: LectureCardService;

  private lectureCardApi: LectureCardApi;

  @observable
  _lectureCards: LectureCardModel[] = [];

  @observable
  lectureCard: LectureCardModel = new LectureCardModel();


  constructor(lectureCardApi: LectureCardApi) {
    this.lectureCardApi = lectureCardApi;
  }

  @computed
  get lectureCards() {
    //
    const lectureCards = this._lectureCards as any;
    return lectureCards.peek();
  }

  // LectureCards ------------------------------------------------------------------------------------------------------

  @action
  async findAllLectureCards(offset: number, limit: number, college?: string, channel?: string) {
    //
    await this.lectureCardApi.findAllLectureCards(offset, limit, college, channel);
  }

  // LectureCard -------------------------------------------------------------------------------------------------------

  @action
  async findLectureCard(lectureCardId: string) {
    //
    const lectureCard = await this.lectureCardApi.findLectureCard(lectureCardId);
    if (!lectureCard) {
      return null;
    }
    return runInAction(() => {
      this.lectureCard = new LectureCardModel(lectureCard);
      return lectureCard;
    });
  }
}

LectureCardService.instance = new LectureCardService(LectureCardApi.instance);

export default LectureCardService;
