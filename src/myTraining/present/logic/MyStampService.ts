import { autobind, Offset } from "@nara.platform/accent";
import { observable, computed, action, runInAction } from "mobx";
import { MyTrainingTableViewModel } from "../../model";
import MyTrainingFilterRdoModel from "../../model/MyTrainingFilterRdoModel";
import MyTrainingApi from "../apiclient/MyTrainingApi";
import { MyPageContentType } from "../../ui/model/MyPageContentType";
import { Direction } from "../../model/Direction";
import { FilterCondition } from "../../model/FilterCondition";

@autobind
class MyStampService {
  static instance: MyStampService;

  private myTrainingApi: MyTrainingApi;

  constructor(myTrainigApi: MyTrainingApi) {
    this.myTrainingApi = myTrainigApi;
  }

  @observable
  private _myStamps: MyTrainingTableViewModel[] = [];

  @computed get myStamps() {
    return this._myStamps;
  }

  @observable
  private _myStampCount: number = 0;

  @computed get myStampCount() {
    return this._myStampCount;
  }

  private filterRdo: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel();

  private column: string = '';

  private direction: Direction = Direction.DESC;

  @action
  async findAllMyStamps() {
    const offsetMyStamp = await this.myTrainingApi.findAllStampTableViews(this.filterRdo);

    if (
      offsetMyStamp &&
      offsetMyStamp.results &&
      offsetMyStamp.results.length > 0
    ) {
      runInAction(() => {
        const foundMyStamps = offsetMyStamp.results.map(result => new MyTrainingTableViewModel(result));
        this._myStamps = foundMyStamps;
        this._myStampCount = offsetMyStamp.totalCount;
      });

      return false;
    }
    return true;
  }

  @action
  async findAllMyStampsByCondition() {
    const offsetMyStamp = await this.myTrainingApi.findAllStampTableViews(this.filterRdo);

    if (
      offsetMyStamp &&
      offsetMyStamp.results &&
      offsetMyStamp.results.length > 0
    ) {
      runInAction(() => {
        this._myStamps = offsetMyStamp.results.map(result => new MyTrainingTableViewModel(result));
        this._myStampCount = offsetMyStamp.totalCount;
      });

      return false;
    }
    return true;
  }

  @action
  async findAllMyStampsWithPage(offset: Offset) {
    this.filterRdo.setOffset(offset);
    const offsetMyStamp = await this.myTrainingApi.findAllStampTableViews(this.filterRdo);

    if (
      offsetMyStamp &&
      offsetMyStamp.results &&
      offsetMyStamp.results.length > 0
    ) {
      runInAction(() => {
        const addMyStamps = offsetMyStamp.results.map(result => new MyTrainingTableViewModel(result));
        this._myStamps = [...this._myStamps, ...addMyStamps];
      })
    }
  }

  @action
  async findAllMyStampsForExcel() {
    const excelFilterRdo = new MyTrainingFilterRdoModel(this.filterRdo);

    excelFilterRdo.setOffset({ offset: 0, limit: 9999 });
    excelFilterRdo.changeColumnDirection(this.column, this.direction);

    const offsetMyStamp = await this.myTrainingApi.findAllStampTableViews(excelFilterRdo);

    if (offsetMyStamp) {
      return offsetMyStamp.results.map(result => new MyTrainingTableViewModel(result));
    }

    return [];
  }

  @action
  clearAllMyStamps() {
    this._myStamps = [];
    this._myStampCount = 0;
  }

  @action
  sortMyStamps(column: string, direction: Direction) {
    const propKey = convertToKey(column);

    this.column = propKey;
    this.direction = direction;

    if (direction === Direction.ASC) {
      this._myStamps = this._myStamps.sort(
        (a, b) => a[propKey] - b[propKey]
      );
      return;
    }
    if (direction === Direction.DESC) {
      this._myStamps = this._myStamps.sort(
        (a, b) => b[propKey] - a[propKey]
      );
    }
  }

  initFilterRdo() {
    this.filterRdo = MyTrainingFilterRdoModel.create(MyPageContentType.EarnedStampList);
  }

  setFilterRdoByConditions(conditions: FilterCondition) {
    this.filterRdo.setByConditions(conditions);
    this.filterRdo.setDefaultOffset();
  }
}

export default MyStampService;

Object.defineProperty(MyStampService, 'instance', {
  value: new MyStampService(MyTrainingApi.instance),
  writable: false,
  configurable: false,
});

export const convertToKey = (column: string): any => {
  switch (column) {
    case '스탬프':
      return 'stampCount';
    case '획득일자':
      return 'endDate';
    default:
      return '';
  }
};
