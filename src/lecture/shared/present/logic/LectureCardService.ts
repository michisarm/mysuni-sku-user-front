
import { observable, action, computed } from 'mobx';
import LectureCardModel from '../../model/LectureCardModel';
import LectureCardApi from '../apiclient/LectureCardApi';


class LectureCardService {
  //
  static instance: LectureCardService;

  lectureCardApi: LectureCardApi;

  @observable
  _lectureCards: LectureCardModel[] = [];


  constructor(lectureCardApi:LectureCardApi) {
    this.lectureCardApi = lectureCardApi;
  }

  @computed
  get lectureCards() {
    //
    const lectureCards = this._lectureCards as any;
    return lectureCards.peek();
  }

  @action
  async findAllLectureCards(offset: number, limit: number) {
    //
    const lectureCards = this.lectureCardApi.findAllLectureCards(offset, limit);
    console.log('lectureCards', lectureCards);
  }
}

LectureCardService.instance = new LectureCardService(LectureCardApi.instance);

export default LectureCardService;
