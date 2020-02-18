
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { CubeState } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture/shared';
import { PersonalCubeService } from 'personalcube/personalcube/stores';

import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import CreateListPanelTopLineView from '../view/CreateListPanelTopLineView';
import CreateListView from '../view/CreateListView';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  pageService?: PageService,
  personalCubeService?: PersonalCubeService
  onChangeCreateCount: (createCount: number) => void
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.pageService',
  'personalCube.personalCubeService',
))
@observer
@reactAutobind
class CreateListContainer extends React.Component<Props> {
  //
  PAGE_KEY = 'create';
  PAGE_SIZE = 8;

  componentDidMount() {
    //
    const { pageService, personalCubeService } = this.props;
    const { searchState } = personalCubeService!;
    const currentPageNo = this.props.match.params.pageNo;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    if (currentPageNo === '1') {
      personalCubeService!.clear();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findPersonalCubes(searchState);
    } else {
      personalCubeService!.clear();
      this.findPersonalCubes(searchState, this.getPageNo() - 1);
    }

  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { pageService, personalCubeService } = this.props;
    const { searchState } = personalCubeService!;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (prevTab === currentTab && prevProps.match.params.pageNo !== currentPageNo) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset = page!.limit > this.PAGE_SIZE && page!.nextOffset === 0 ? page!.nextOffset + this.PAGE_SIZE : page!.nextOffset;
      if (currentPageNo === '1') {
        personalCubeService!.clear();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      }
      else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findPersonalCubes(searchState, this.getPageNo() - 1);
    }
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  async findPersonalCubes(cubeState: CubeState | undefined, pageNo?: number) {
    //
    const { pageService, personalCubeService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { onChangeCreateCount } = this.props;

    const offsetList = await personalCubeService!.findPersonalCubesForCreator(page!.nextOffset, page!.limit, cubeState);
    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);
    onChangeCreateCount(offsetList.totalCount);
  }

  onChangeSearchSelect(e: any, data: any) {
    //
    const { actionLogService, history, pageService, personalCubeService } = this.props;
    const cubeState = data.value;
    const currentPageNo = this.props.match.params.pageNo;

    const cubeStateName: string = data.options.reduce((a: any, b: any) => { return a === b.value ? b.text : a; }, data.value);
    actionLogService?.registerClickActionLog({ subAction: cubeStateName });

    personalCubeService!.clear();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    personalCubeService!.changeSearchState(cubeState);
    if (currentPageNo !== '1') {
      history.replace(routePaths.currentPage(1));
    } else {
      this.findPersonalCubes(cubeState, this.getPageNo() - 1);
    }
  }

  async onClickPersonalCubeRow(personalCubeId: string) {
    //
    const personalCubeService = this.props.personalCubeService!;
    const { history } = this.props;

    const personalCube = await personalCubeService.findPersonalCube(personalCubeId);

    const cubeType = personalCube!.contents.type;
    const cubeState = personalCube!.cubeState;

    if (cubeState === CubeState.Created) {
      history.push(routePaths.createPersonalCubeDetail(personalCubeId, cubeType));
    }
    else {
      history.push(routePaths.createSharedDetail(personalCubeId, cubeType, cubeState));
    }
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  render() {
    //
    const { personalCubeOffsetList, searchState } = this.props.personalCubeService!;
    const { totalCount, results: personalCubes } = personalCubeOffsetList;

    if (personalCubes.length < 1) {
      return (
        <NoSuchContentPanel
          message="아직 생성한 학습이 없습니다."
          link={{ text: 'Create 바로가기', path: routePaths.createNew() }}
        />
      );
    }

    return (
      <>
        <CreateListPanelTopLineView
          totalCount={totalCount}
          searchSelectOptions={SelectType.userStatus}
          onChange={this.onChangeSearchSelect}
          searchState={searchState}
        />

        <CreateListView
          personalCubes={personalCubeOffsetList.results}
          totalCount={totalCount}
          handleClickCubeRow={this.onClickPersonalCubeRow}
        />

        { totalCount > personalCubes.length && (
          <SeeMoreButton
            onClick={() => this.onClickSeeMore()}
          />
        )}
      </>
    );
  }
}

export default withRouter(CreateListContainer);
