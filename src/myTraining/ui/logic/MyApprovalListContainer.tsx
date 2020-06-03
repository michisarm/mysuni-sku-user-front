
import React from 'react';

import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router';

import { ProposalState } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { SeeMoreButton } from 'lecture/shared';
import ApprovalCubeService from '../../present/logic/ApprovalCubeService';

import routePaths from '../../routePaths';
import SelectType from '../model/SelectOptions';
import ApprovalListPanelTopLineView from '../view/ApprovalListPanelTopLineView';
import ApprovalListView from '../view/ApprovalListView';

interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  pageService?: PageService,
  approvalCubeService?: ApprovalCubeService
  defaultValue?: string
  targetProps?: string
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.pageService',
  'approvalCube.approvalCubeService',
))

@observer
@reactAutobind
class MyApprovalListContainer extends React.Component<Props> {
  //
  PAGE_KEY = 'Submitted';
  PAGE_SIZE = 20;
  orderBy:string = '';

  componentDidMount() {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState } = approvalCubeService!;
    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    if (currentPageNo === '1') {
      approvalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findApprovalCubes(searchState);
    } else {
      approvalCubeService!.clear();
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }

  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState } = approvalCubeService!;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (prevTab === currentTab && prevProps.match.params.pageNo !== currentPageNo) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset = page!.limit > this.PAGE_SIZE && page!.nextOffset === 0 ? page!.nextOffset + this.PAGE_SIZE : page!.nextOffset;
      if (currentPageNo === '1') {
        approvalCubeService!.clear();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      }
      else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }

    this.findLectureApprovalSelect();

  }

  componentWillUnmount(): void {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.clearApprovalCube();
  }

  getPageNo() {
    //
    const { match } = this.props;
    return parseInt(match.params.pageNo, 10);
  }

  async findApprovalCubes(proposalState: ProposalState | undefined, pageNo?: number) {
    //
    const { pageService, approvalCubeService } = this.props;
    const { orderBy } = this;
    const { approvalCube } = approvalCubeService!;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const offsetList = await approvalCubeService!.findApprovalCubesForSearch(page!.nextOffset, page!.limit, orderBy, proposalState, approvalCube);
    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
  }

  findLectureApprovalSelect() {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.findLectureApprovalSelect();
  }

  onSetCubeIntroPropsByJSON(name: string, value: string) {
    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState, approvalCube } = approvalCubeService!;

    approvalCube.lectureCardId = value;

    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);

    if (currentPageNo === '1') {
      approvalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findApprovalCubes(searchState, this.getPageNo());
    } else {
      approvalCubeService!.clear();
      this.findApprovalCubes(searchState, this.getPageNo() - 1);
    }
  }

  setContentsProvider() {
    const selectContentsProviderType: any = [];
    const { contentsProviders } = this.props.approvalCubeService!;

    selectContentsProviderType.push(
      {
        key: '',
        text: '전체과정',
        value: '',
      });

    contentsProviders.map((contentsProvider) => {
      selectContentsProviderType.push(
        {
          key: contentsProvider.id,
          text: contentsProvider.name,
          value: contentsProvider.id,
        });
    });
    return selectContentsProviderType;
  }

  onClickSeeMore() {
    //
    const { actionLogService, history, approvalCubeService } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'list more' });
    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  handleExcelDownload() {

  }

  handleSearchProposalStateChange(proposalState: ProposalState) {
    const { history, pageService, approvalCubeService, match } = this.props;
    const currentPageNo = match.params.pageNo || 1;

    approvalCubeService!.clear();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.changeSearchState(proposalState);
    if (currentPageNo !== '1') {
      history.replace(routePaths.currentPage(1));
    } else {
      this.findApprovalCubes(proposalState, this.getPageNo() - 1);
    }
  }

  onChangeOrderBy(orderBy: string, desc: boolean = false) {
    const { approvalCubeService, pageService } = this.props;
    const { searchState } = approvalCubeService!;
    this.orderBy = orderBy;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.clear();
    this.findApprovalCubes(searchState);
  }

  async onClickApprovalCubeRow(studentId: string) {
    //
    // const approvalCubeService = this.props.approvalCubeService!;
    const { history } = this.props;

    // approvalCubeService!.clear();
    this.props.history.replace(routePaths.approvalCubesDetail(studentId));

    // window.location.href=`/my-training/my-page/ApprovalList/detail/${studentId}`;
  }

  render() {
    //
    const { approvalCubeOffsetList, searchState } = this.props.approvalCubeService!;
    const { totalCount, results: approvalCubes } = approvalCubeOffsetList;
    const { defaultValue, targetProps } = this.props;

    return (
      <div className="confirm-list-wrap">
        <ApprovalListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userApprovalStatus}
          searchState={searchState}
          defaultValue={defaultValue}
          targetProps={targetProps}
          onSetCubeIntroPropsByJSON={this.onSetCubeIntroPropsByJSON}
          setContentsProvider={this.setContentsProvider}
          onExcelDownloadClick={this.handleExcelDownload}
          onSearchProposalStateChange={this.handleSearchProposalStateChange}
        />

        <ApprovalListView
          approvalCubeService={this.props.approvalCubeService!}
          totalCount={totalCount}
          handleClickCubeRow={this.onClickApprovalCubeRow}
          onChangeOrderBy={this.onChangeOrderBy}
          searchState={searchState}
        />

        { totalCount > approvalCubes.length && (
          <SeeMoreButton
            onClick={() => this.onClickSeeMore()}
          />
        )}
      </div>
    );
  }
}


export default withRouter(MyApprovalListContainer);

