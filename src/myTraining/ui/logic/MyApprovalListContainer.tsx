
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

import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';

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

  approvalCubeModel: ApprovalCubeModel = new ApprovalCubeModel();

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

    //approvalCubeService!.clear();

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
    const approvalCubeService = this.props.approvalCubeService!;
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
    const { approvalCube } = approvalCubeService!;

    console.log('findApprovalCubes lectureCardId ::' + approvalCube?.lectureCardId);

    const page = pageService!.pageMap.get(this.PAGE_KEY);
    // const { onChangeCreateCount } = this.props;

    const offsetList = await approvalCubeService!.findApprovalCubesForSearch(page!.nextOffset, page!.limit, proposalState, approvalCube);
    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
    // onChangeCreateCount(offsetList.totalCount);
  }

  findLectureApprovalSelect() {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.findLectureApprovalSelect();
  }

  onSetCubeIntroPropsByJSON(name: string, value: string) {

    console.log('onSetCubeIntroPropsByJSON name :: ' + name);
    console.log('onSetCubeIntroPropsByJSON value :: ' + value);

    //
    const { pageService, approvalCubeService } = this.props;
    const { searchState, approvalCube } = approvalCubeService!;

    approvalCube.lectureCardId = value;

    console.log('onSetCubeIntroPropsByJSON approvalCube.lectureCardId :: ' + approvalCube.lectureCardId);

    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);

    if (currentPageNo === '1') {

      console.log('onSetCubeIntroPropsByJSON if searchState :: ' + searchState);
      console.log('onSetCubeIntroPropsByJSON if currentPageNo :: ' + currentPageNo);
      console.log('onSetCubeIntroPropsByJSON if approvalCube.lectureCardId :: ' + approvalCube.lectureCardId);

      approvalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findApprovalCubes(searchState, this.getPageNo());
    } else {
      console.log('onSetCubeIntroPropsByJSON else searchState :: ' + searchState );
      console.log('onSetCubeIntroPropsByJSON else this.getPageNo() - 1 :: ' + this.getPageNo() );
      console.log('onSetCubeIntroPropsByJSON else approvalCube.lectureCardId :: ' + approvalCube.lectureCardId);
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
    const { approvalCube } = approvalCubeService!;
    console.log('onClickSeeMore approvalCube.lectureCardId :: ' + approvalCube.lectureCardId);

    actionLogService?.registerClickActionLog({ subAction: 'list more' });
    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  onChangeSearchSelect(e: any, data: any) {

    const { actionLogService, history, pageService, approvalCubeService } = this.props;
    const { approvalCube } = approvalCubeService!;
    const proposalState = data.value;

    console.log('onChangeSearchSelect proposalState data.value :: ' + data.value);
    console.log('onChangeSearchSelect approvalCube.lectureCardId :: ' + approvalCube.lectureCardId);

    const approvalStatusStr = data.value;
    const currentPageNo = this.props.match.params.pageNo;

    approvalCubeService!.clear();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    approvalCubeService!.changeSearchState(proposalState);
    if (currentPageNo !== '1') {
      history.replace(routePaths.currentPage(1));
    } else {
      this.findApprovalCubes(proposalState, this.getPageNo() - 1);
    }
  }

  async onClickApprovalCubeRow(studentId: string) {
    console.log('onClickApprovalCubeRow studentId ::' + studentId);
    //
    // const approvalCubeService = this.props.approvalCubeService!;
    const { history } = this.props;

    // approvalCubeService!.clear();
    history.push(routePaths.approvalCubesDetail(studentId));

    // window.location.href=`/my-training/my-page/ApprovalList/detail/${studentId}`;
  }

  render() {

    console.log('MyApprovalListContainer start ::');

    //
    const { approvalCubeOffsetList, searchState } = this.props.approvalCubeService!;
    const { totalCount, results: approvalCubes } = approvalCubeOffsetList;
    const { defaultValue, targetProps } = this.props;

    console.log('MyApprovalListContainer searchState ::' + searchState);

    return (
      <div className="confirm-list-wrap">
        { /* 승인 조회  */ }
        <ApprovalListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userApprovalStatus}
          onChange={this.onChangeSearchSelect}
          searchState={searchState}
          defaultValue={defaultValue}
          targetProps={targetProps}
          onSetCubeIntroPropsByJSON={this.onSetCubeIntroPropsByJSON}
          setContentsProvider={this.setContentsProvider}
        />

        <ApprovalListView
          approvalCubeService={this.props.approvalCubeService!}
          totalCount={totalCount}
          handleClickCubeRow={this.onClickApprovalCubeRow}
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

