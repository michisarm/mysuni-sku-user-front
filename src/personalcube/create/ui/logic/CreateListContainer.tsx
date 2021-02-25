import React, { useEffect, useState } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { CubeState } from 'shared/model';
import { ActionLogService, PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { SeeMoreButton } from 'lecture/shared';
import { PersonalCubeService } from 'personalcube/personalcube/stores';

import routePaths from '../../../routePaths';
import SelectType from '../../model/SelectOptions';
import CreateListPanelTopLineView from '../view/CreateListPanelTopLineView';
import CreateListView from '../view/CreateListView';

import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  actionLogService?: ActionLogService;
  pageService?: PageService;
  personalCubeService?: PersonalCubeService;
  onChangeCreateCount: (createCount: number) => void;
  scrollSave?: () => void;
  setLoading?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const CreateListContainer: React.FC<Props> = ({ actionLogService, pageService, personalCubeService, onChangeCreateCount, match }) => {
  const histroy = useHistory();
  const location = useLocation();
  const { scrollOnceMove, scrollSave } = useScrollMove();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      scrollOnceMove();
    }
  }, [loading])

  return (
    <CreateListInnerContainer
      actionLogService={actionLogService}
      pageService={pageService}
      personalCubeService={personalCubeService}
      onChangeCreateCount={onChangeCreateCount}
      history={histroy}
      match={match}
      location={location}
      scrollSave={scrollSave}
      setLoading={setLoading}
    />
  )
}

export default withRouter(CreateListContainer);

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
    'shared.pageService',
    'personalCube.personalCubeService'
  )
)
@observer
@reactAutobind
class CreateListInnerContainer extends React.Component<Props> {
  //
  PAGE_KEY = 'create';
  PAGE_SIZE = 8;

  componentDidMount() {
    // tab click 시 초기화 by gon
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    // tab click 시 초기화 by gon
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    if (prevTab === currentTab) {
      this.getSearchInTab(prevProps);
    } else {
      this.init();
    }
  }

  // tab click 시 초기화 by gon
  init() {
    const { pageService, personalCubeService, setLoading } = this.props;
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
    // tab click 시 초기화 by gon
    // 조회조건 = 전체
    personalCubeService!.changeSearchState(CubeState.ALL);
    setLoading && setLoading(false);
  }

  // tab click 시 초기화 by gon
  getSearchInTab(prevProps: Readonly<Props>) {
    const { pageService, personalCubeService } = this.props;
    const { searchState } = personalCubeService!;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (
      prevTab === currentTab &&
      prevProps.match.params.pageNo !== currentPageNo
    ) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset =
        page!.limit > this.PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + this.PAGE_SIZE
          : page!.nextOffset;
      if (currentPageNo === '1') {
        personalCubeService!.clear();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      } else {
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
    const offsetList = await personalCubeService!.findPersonalCubesForCreator(
      page!.nextOffset,
      page!.limit,
      cubeState
    );

    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      offsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );
    onChangeCreateCount(offsetList.totalCount);
  }

  onChangeSearchSelect(e: any, data: any) {
    //
    const {
      actionLogService,
      history,
      pageService,
      personalCubeService,
    } = this.props;
    const cubeState = data.value;
    const currentPageNo = this.props.match.params.pageNo;

    const cubeStateName: string = data.options.reduce(
      (a: any, b: any) => (a === b.value ? b.text : a),
      data.value
    );
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
    const { history, scrollSave } = this.props;

    const personalCube = await personalCubeService.findPersonalCube(
      personalCubeId
    );
    scrollSave && scrollSave();
    const cubeType = personalCube!.contents.type;
    const cubeState = personalCube!.cubeState;

    if (cubeState === CubeState.Created) {
      history.push(
        routePaths.createPersonalCubeDetail(personalCubeId, cubeType)
      );
    } else {
      history.push(
        routePaths.createSharedDetail(personalCubeId, cubeType, cubeState)
      );
    }
  }

  onClickSeeMore() {
    //
    const { actionLogService, history, scrollSave } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'list more' });
    history.replace(routePaths.currentPage(this.getPageNo() + 1));

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Create');
    }, 1000);
  }

  render() {
    //
    const {
      personalCubeOffsetList,
      searchState,
    } = this.props.personalCubeService!;
    const { setLoading } = this.props
    const { totalCount, results: personalCubes } = personalCubeOffsetList;

    if (personalCubes.length > 0) {
      setLoading && setLoading(true)
    }

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

        {totalCount > personalCubes.length && (
          <SeeMoreButton onClick={() => this.onClickSeeMore()} />
        )}
      </>
    );
  }
}

