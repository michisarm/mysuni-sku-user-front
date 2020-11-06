import { Offset } from '@nara.platform/accent';
import { observable, action, runInAction, computed } from 'mobx';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { Moment } from 'moment';
import AplApi from '../apiclient/AplApi';
import { AplQueryModel } from '../../model/AplQueryModel';
import { AplState } from '../../model/AplState';
import { AplRequestCdoModel } from '../../model/AplRequestCdoModel';
import { AplCountModel } from '../../model/AplCountModel';
import { AplListViewModel } from '../../model/AplListViewModel';
import AplFlowApi from '../apiclient/AplFlowApi';
import { ExcelView } from '../../../shared/model/ExcelView';
import OffsetElementList from '../../../shared/model/OffsetElementList';
import { AplModel } from '../../model';
import AplUdoModel from '../../model/AplUdoModel';
import { ApprovalViewType } from '../../ui/logic/MyApprovalListContainerV2';
import { AplRdoModel, CountType } from '../../model/AplRdoModel';


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

  aplRdo: AplRdoModel = new AplRdoModel();


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
    runInAction(() => (this.apls = apls));
    return apls;
  }

  @action
  async findApl(aplId: string) {
    //
    const apl = await this.aplApi.findApl(aplId);
    runInAction(() => this.apl = apl);
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
  async findCreatApl(
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
  changeAplQueryProps(name: string, value: any) {
    if (value === 'Select') value = '';
    this.aplQuery = _.set(this.aplQuery, name, value);
  }

  @action
  clearAplQueryProps() {
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
    value: string | {} | string[] | boolean | undefined | Moment
  ) {
    //
    if (value === 'Select') value = '';
    this.apl = _.set(this.apl, name, value);
  }

  /**SAVE 2020 10 28*/
  saveApl(
    apl: AplModel,
  ) {
    //
    return this.aplApi.saveApl(
      AplModel.asCdo(apl),
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
  async findAllTabCount(countType: CountType) {
    /* 
      탭 카운트를 조회하는 API 가 하나이기 때문에
      countType 을 기준으로 MyLearningPage, MyApprovalPage 의 카운트 조회 조건을 달리 함.
    */
    this.aplRdo.countType = countType;
    const aplCount = await this.aplApi.findAplCount(this.aplRdo);

    runInAction(() => this.aplCount = aplCount);
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
  initQueryModel() {
    this.aplQuery = new AplQueryModel();
  }

  @action
  clearaplQueryProps() {
    //
    this.aplQuery = new AplQueryModel();
  }

  ///////////////////////// 개편 /////////////////////////
  modifyAplWithApprovalState(aplUdo: AplUdoModel) {
    this.aplApi.modifyAplWithApprovalState(aplUdo);
  }

  async findAllAplsForApproval(viewType: ApprovalViewType) {
    this.aplRdo.state = viewType as string;
    this.aplRdo.countType = CountType.approvalId;
    const offsetApl = await this.aplApi.findAllAplsForApproval(this.aplRdo);

    if (offsetApl) {
      const results = offsetApl.results.map(result => new AplListViewModel(result));
      runInAction(() => {
        this.apls = offsetApl;
        this.apls.results = results;
      });
    }
  }

  @action
  clearAplCount() {
    this.aplCount = new AplCountModel();
  }

  ///////////////////////// 개편 /////////////////////////
}

Object.defineProperty(AplService, 'instance', {
  value: new AplService(AplApi.instance, AplFlowApi.instance),
  writable: false,
  configurable: false,
});
