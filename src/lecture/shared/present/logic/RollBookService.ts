
import { IObservableArray, observable, action, computed, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import RollBookApi from '../apiclient/RollBookApi';
import RollBookModel from '../../model/RollBookModel';


@autobind
class RollBookService {
  //
  static instance: RollBookService;

  private rollBookApi: RollBookApi;

  @observable
  _rollBooks: RollBookModel[] = [];

  @observable
  rollBook: RollBookModel = new RollBookModel();


  constructor(rollBookApi: RollBookApi) {
    this.rollBookApi = rollBookApi;
  }

  @computed
  get rollBooks() {
    //
    return (this._rollBooks as IObservableArray).peek();
  }

  @computed
  get rollBooksPassedStudentCount() {
    //
    return this._rollBooks.reduce((prev: number, current: RollBookModel) => prev + current.passedStudentCount, 0);
  }

  @computed
  get rollBookIds() {
    return this._rollBooks.map((rollBook) => rollBook.id);
  }


  // RollBooks ----------------------------------------------------------------------------------------------------------

  @action
  async findRollBookByLectureCardIdAndRound(lectureCardId: string, round: number) {
    //
    const rollBook = await this.rollBookApi.findRollBookByLectureCardIdAndRound(lectureCardId, round);

    runInAction(() => this.rollBook = new RollBookModel(rollBook));
    return rollBook;
  }

  @action
  async findAllLecturesByLectureCardId(lectureCardId: string) {
    //
    const rollBooks = await this.rollBookApi.findAllLecturesByLectureCardId(lectureCardId);

    runInAction(() => this._rollBooks = rollBooks.map(rollBook => new RollBookModel(rollBook)));
    return rollBooks;
  }

}

RollBookService.instance = new RollBookService(RollBookApi.instance);

export default RollBookService;
