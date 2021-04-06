import { observable, computed, action, runInAction } from "mobx";
import { reactAutobind } from "@nara.platform/accent";
import Student from "../../../lecture/model/Student";
import { LearningState } from "../../../shared/model";
import { findCardStudentsByCardIdsAndLearningState } from "../../api/CardStudentApi";


@reactAutobind
export default class CardStudentService {

  static instance: CardStudentService;

  @observable
  _cardStudents: Student[] = [];


  @computed get cardStudents() {
    return this._cardStudents;
  }

  @observable
  _passedCardCount: number = 0;

  @computed get passedCardCount() {
    return this._passedCardCount;
  }

  @observable
  _passedCardIdMap: Map<string, boolean> = new Map<string, boolean>();

  @computed get passedCardIdMap() {
    return this._passedCardIdMap;
  }

  @action
  async findCardStudentsByCardIdsAndLearningState(cardIds: string[], learningState: LearningState) {
    const foundCardStudents = await findCardStudentsByCardIdsAndLearningState(cardIds, learningState);

    if (
      foundCardStudents &&
      foundCardStudents.length > 0
    ) {

      runInAction(() => {
        this._cardStudents = foundCardStudents;
        this._passedCardCount = foundCardStudents.length;

        foundCardStudents.forEach(s => {
          this._passedCardIdMap.set(s.cardId, true);
        });
      });
    }
  }

  @action
  clearCardStudents() {
    this._cardStudents = [];
    this._passedCardCount = 0;
    this._passedCardIdMap = new Map<string, boolean>();
  }
}


Object.defineProperty(CardStudentService, 'instance', {
  value: new CardStudentService(),
  writable: false,
  configurable: false,
});