
import React from 'react';

import moment from 'moment';
import {
  Segment, Checkbox, Select, Radio, Button, Icon, Table
} from 'semantic-ui-react';

import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router';

import { CubeState, ProposalState } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
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
  // onChangeCreateCount: (createCount: number) => void
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

  componentDidMount() {

    console.log('componentDidMount start ::');

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

    console.log('componentDidUpdate start ::');

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
  }

  getPageNo() {
    //

    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  async findApprovalCubes(proposalState: ProposalState | undefined, pageNo?: number) {
    console.log('findApprovalCubes ::');
    //
    const { pageService, approvalCubeService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    // const { onChangeCreateCount } = this.props;

    const offsetList = await approvalCubeService!.findApprovalCubesForSearch(page!.nextOffset, page!.limit, proposalState);
    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
    // onChangeCreateCount(offsetList.totalCount);
  }

  onClickSeeMore() {
    //
    const { actionLogService, history } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'list more' });
    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  onChangeSearchSelect(e: any, data: any) {
    //
    const { actionLogService, history, pageService, approvalCubeService } = this.props;
    const cubeState = data.value;
    const currentPageNo = this.props.match.params.pageNo;

    const cubeStateName: string = data.options.reduce((a: any, b: any) => (a === b.value ? b.text : a), data.value);
    actionLogService?.registerClickActionLog({ subAction: cubeStateName });

    approvalCubeService!.clear();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.changeSearchState(cubeState);
    if (currentPageNo !== '1') {
      history.replace(routePaths.currentPage(1));
    } else {
      this.findApprovalCubes(cubeState, this.getPageNo() - 1);
    }
  }

  async onClickPersonalCubeRow(personalCubeId: string) {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    const { history } = this.props;

    const approvalCube = await approvalCubeService.findPersonalCube(personalCubeId);

    const cubeType = approvalCube!.contents.type;
    const cubeState = approvalCube!.cubeState;

    if (cubeState === CubeState.Created) {
      history.push(routePaths.createPersonalCubeDetail(personalCubeId, cubeType));
    }
    else {
      history.push(routePaths.createSharedDetail(personalCubeId, cubeType, cubeState));
    }
  }

  render() {

    console.log('MyApprovalListContainer start ::');

    //
    const { approvalCubeOffsetList, searchState } = this.props.approvalCubeService!;
    const { totalCount, results: approvalCubes } = approvalCubeOffsetList;

    if (approvalCubes.length < 1) {
      return (
        <NoSuchContentPanel
          message="승인요청 학습이 없습니다."
        />
      );
    }

    return (
      <>

        { /* 승인 조회  */ }

        <ApprovalListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userStatus}
          onChange={this.onChangeSearchSelect}
          searchState={searchState}
        />

        <ApprovalListView
          approvalCubes={approvalCubeOffsetList.results}
          totalCount={totalCount}
          handleClickCubeRow={this.onClickPersonalCubeRow}
        />

        { totalCount > approvalCubes.length && (
          <SeeMoreButton
            onClick={() => this.onClickSeeMore()}
          />
        )}
      </>
    );
  }
}

export default withRouter(MyApprovalListContainer);
