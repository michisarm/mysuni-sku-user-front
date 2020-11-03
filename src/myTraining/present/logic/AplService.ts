import { Offset } from '@nara.platform/accent';
import { observable, action, runInAction, computed } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import AplApi from '../apiclient/AplApi';
import { AplModel } from '../../model'
import { AplQueryModel } from '../../model/AplQueryModel';
import { AplState } from '../../model/AplState';
import { AplRequestCdoModel } from '../../model/AplRequestCdoModel';
import { AplCountModel } from '../../model/AplCountModel';
import { AplListViewModel } from '../../model/AplListViewModel';
import { AplFlowCdo } from '../../model/AplFlowCdo';
import AplFlowApi from '../apiclient/AplFlowApi';
import { ExcelView } from '../../../shared/model/ExcelView';
import OffsetElementList from '../../../shared/model/OffsetElementList';


@autobind
export default class AplService {
  //
  static instance: AplService;

  aplApi: AplApi;
  aplFlowApi: AplFlowApi;

  @observable
  apl: AplModel = new AplModel();

  @observable
  apls: OffsetElementList<AplListViewModel> = new OffsetElementList<AplListViewModel>();

  @observable
  aplsForExcel: AplListViewModel[] = [];

  @observable
  aplQuery: AplQueryModel = new AplQueryModel();

  @observable
  excelView: ExcelView = new ExcelView();

  @observable
  aplRequestCdo: AplRequestCdoModel = new AplRequestCdoModel();

  @observable
  aplCount: AplCountModel = new AplCountModel();

  @observable
  aplIdSet: string[] = [];

  @observable
  selectedList: string[] = [];

  @observable
  proposalStateList: string[] = [];

  @observable
  learningCardListModalOpen: boolean = false;

  @observable
  coursePlanListModalOpen: boolean = false;

  @observable
  aplSectionsSelectType: any;

  @observable
  aplSearchInit: boolean = true;

  /*
  @computed
  get cardIdList() {
    return this.getServiceIdList('CARD');
  }

  @computed
  get courseIdList() {
    return this.getServiceIdList('COURSE');
  }

  @computed
  get programIdList() {
    return this.getServiceIdList('PROGRAM');
  }

  private getServiceIdList(serviceType: string): string[] {
    const serviceIdList: string[] = [];
    if (
      this.menuapls &&
      this.menuapls.results &&
      this.menuapls.results.length
    ) {
      this.menuapls.results.forEach((menuapl) => {
        if (menuapl.serviceType === serviceType) {
          serviceIdList.push(menuapl.serviceId);
        }
      });
    }
    return serviceIdList;
  }*/

  @computed get allowTime(): number {
    const totalAllowHour = this.apls.results
      .map(result => result.allowHour)
      .reduce((a, b) => a + b, 0);

    const totalAllowMinute = this.apls.results
      .map(result => result.allowMinute)
      .reduce((a, b) => a + b, 0);


    return totalAllowHour * 60 + totalAllowMinute;
  }

  constructor(aplApi: AplApi, aplFlowApi: AplFlowApi) {
    this.aplApi = aplApi;
    this.aplFlowApi = aplFlowApi;
  }

  @action
  async findAllAplsByQuery() {
    //
    const apls = await this.aplApi.findAllAplsByQuery(
      AplQueryModel.asAplRdo(this.aplQuery)
    );
    //apls.results.map((apl) => new AplListViewModel(apl));
    runInAction(() => this.apls = apls);
    return apls;
  }

  @action
  async findAllAplsWithPage(offset: Offset) {
    this.aplQuery.offset = offset.offset;
    this.aplQuery.limit = offset.limit;

    const apls = await this.aplApi.findAllAplsByQuery(
      AplQueryModel.asAplRdo(this.aplQuery)
    );

    runInAction(() => this.apls.results = [...this.apls.results, ...apls.results]);
  }

  @action
  async findAllTabCount() {
    const aplCount = await this.aplApi.findAplCount(
      AplQueryModel.asAplRdo(this.aplQuery)
    );

    runInAction(() => this.aplCount = aplCount);
    return aplCount;
  }

  @action
  async findApl(aplId?: string) {
    //
    const apl = await this.aplApi.findApl(aplId);
    runInAction(() => (this.apl = apl));
    return apl;
  }

  @action
  async findAplsTreeByQuery() {
    //
    const apls = await this.aplApi.findAplsTreeByQuery(
      AplQueryModel.asAplRdo(this.aplQuery)
    );
    //apls.results.map((apl) => new AplListViewModel(apl));
    runInAction(() => (this.apls = apls));
    return apls;
  }

  @action
  async findAllAplsForExcel() {
    //
    const apls = await this.aplApi.findAllAplsExcel(
      AplQueryModel.asAplRdo(this.aplQuery)
    );
    runInAction(() => (this.aplsForExcel = apls));
    return apls;
  }

  @action
  async findCreatAapl(
    aplType?: string | undefined,
    company?: string | null
  ) {
    //
    const apl = await this.aplApi.findCreateApl(
      aplType,
      company
    );
    runInAction(() => (this.apl = apl));
    return apl;
  }

  @action
  findCountMainCheck(
    company: string,
    aplType: string,
    startDate: number,
    endDate: number
  ) {
    return this.aplApi.findCountMainCheck(
      company,
      aplType,
      startDate,
      endDate
    );
  }

  @action
  changeAplsProps(name: string, value: string | {} | string[] | undefined) {
    this.apl = _.set(this.apl, name, value);
  }

  @action
  clearApl() {
    //
    this.apl = new AplModel();
  }

  @action
  clearApls() {
    //
    this.apls = new OffsetElementList<AplListViewModel>();
  }

  @action
  initQueryModel() {
    this.aplQuery = new AplQueryModel();
  }

  @action
  changeAplQueryProps(name: string, value: any) {
    if (name === 'dateOptions' && value === 'All') {
      this.aplQuery = _.set(this.aplQuery, name, '');
      this.aplQuery = _.set(this.aplQuery, 'aplType', '');
    }
    if (value === '전체') value = '';
    this.aplQuery = _.set(this.aplQuery, name, value);
  }

  @action
  clearaplQueryProps() {
    //
    this.aplQuery = new AplQueryModel();
  }

  @action
  changeAplRequestProps(name: string, value: string) {
    //
    this.aplRequestCdo = _.set(this.aplRequestCdo, name, value);
  }

  @action
  setAplState(aplState: AplState) {
    //
    this.aplQuery = _.set(this.aplQuery, 'state', aplState);
  }

  @action
  changeAplProps(
    name: string,
    value: string | {} | string[] | boolean | undefined
  ) {
    //
    if (name === 'isNameShow') {
      if (value === '') value = undefined;
      else {
        value = (value as string) === 'Yes' ? true : false;
      }
    }
    this.apl = _.set(this.apl, name, value);
  }

  saveApl(
    apl: AplModel,
    saveMode?: string
  ) {
    //
    return this.aplFlowApi.saveApl(
      new AplFlowCdo(
        AplModel.asCdo(apl),
        saveMode
      )
    );
  }

  modifyApl(isUse: boolean, aplId?: number) {
    //
    return this.aplApi.modifyApl(aplId, isUse);
  }

  @action
  setMenuAplIdSet(aplIdSet: string[]) {
    this.aplIdSet = aplIdSet;
  }

  @action
  changeSelectedAplProps(selectedList: string[]) {
    //
    this.selectedList = selectedList;
  }

  @action
  changeAplSectionsSelectType(selectType: any) {
    this.aplSectionsSelectType = selectType;
  }

  @action
  changeAplSearchInit(aplSearchType: boolean) {
    this.aplSearchInit = aplSearchType;
  }
  /*
  @action
  changeTreeActiveKey(treeActiveKey: any) {
    this.treeActiveKey = treeActiveKey;
  }
  */
}

Object.defineProperty(AplService, 'instance', {
  value: new AplService(AplApi.instance, AplFlowApi.instance),
  writable: false,
  configurable: false,
});
