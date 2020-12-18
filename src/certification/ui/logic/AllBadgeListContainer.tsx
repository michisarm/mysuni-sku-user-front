import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router';
import { NoSuchContentPanel } from 'shared';
import routePaths from '../../../personalcube/routePaths';
import { PageService } from '../../../shared/stores';
import BadgeService from '../../present/logic/BadgeService';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeListContainer from './BadgeListContainer';
import { SeeMoreButton } from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';
import { OffsetElementList } from '../../../shared/model';
import BadgeModel from '../model/BadgeModel';
import ReactGA from 'react-ga';

interface Props extends RouteComponentProps<{ type: string; pageNo: string }> {
  pageService?: PageService;
  badgeService?: BadgeService;

  categorySelection: string;
}

const AllBadgeListContainer: React.FC<Props> = Props => {
  //
  const {
    pageService,
    badgeService,
    categorySelection,
    history,
    match,
  } = Props;
  const { badges } = badgeService!;

  const PAGE_KEY = 'badge.all';
  const PAGE_SIZE = 12; // 페이지 당 12개씩 보기(추가)

  const pageKey = useRef<string>('');
  const prevCategory = useRef<string>('');
  const refresh = useRef<boolean>(false);

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    //
    // 페이지 변경(초기화)
    //history.replace(routePaths.currentPage(1));

    pageKey.current = PAGE_KEY;
    badgeService!.clearBadges();

    const pageNo = getPageNo();
    pageService!.initPageMap(pageKey.current, 0, pageNo * PAGE_SIZE);

    findMyContent(getPageNo() - 1);

    refresh.current = true;

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    // 새로고침 / 이전 페이지로 이동 시 : 페이지 번호에 따라 처리되었으므로 리턴
    if (refresh.current) {
      // window.scrollTo(0, 0);
      refresh.current = false;
      return;
    }
    //
    showBadges();
  }, [categorySelection, difficultyLevel, match.params.pageNo]);

  const showBadges = () => {
    //
    if (categorySelection !== prevCategory.current) {
      prevCategory.current = categorySelection;
      // 페이지키 재설정 및 초기화
      pageKey.current = PAGE_KEY + categorySelection + difficultyLevel;
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
      if (difficultyLevel !== '') {
        onSelectDifficultyLevel('전체');
        return;
      }
    }

    const page = pageService!.pageMap.get(pageKey.current);

    if (getPageNo() > 1) {
      const offset =
        page!.limit > PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + PAGE_SIZE
          : page!.nextOffset;
      pageService!.initPageMap(pageKey.current, offset, PAGE_SIZE);
    } else {
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
      badgeService!.clearBadges();
    }

    findMyContent(getPageNo() - 1);
  };

  const onSelectDifficultyLevel = (diffLevel: string) => {
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));

    // 페이지키 재설정 및 초기화
    diffLevel = diffLevel === '전체' ? '' : diffLevel;
    pageKey.current = PAGE_KEY + categorySelection + diffLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);

    // 난이도 변경
    setDifficultyLevel(diffLevel);
  };

  const findMyContent = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList: OffsetElementList<
      BadgeModel
    > | null = await badgeService!.findPagingAllBadges(
      BadgeFilterRdoModel.all(
        categorySelection,
        difficultyLevel,
        page!.limit,
        page!.nextOffset
      )
    );

    if (badgeOffsetList) {
      pageService!.initPageMap(
        pageKey.current,
        (pageNo - 1) * PAGE_SIZE,
        PAGE_SIZE
      );
      pageService!.setTotalCountAndPageNo(
        pageKey.current,
        badgeOffsetList.totalCount,
        pageNo + 1
      );
    }
    setBadgeCount(badgeService!.badgeCount);
  };

  const getPageNo = () => {
    return parseInt(match.params.pageNo, 10);
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(pageKey.current);
    return page && page.pageNo < page.totalPages;
  };

  // see more button 클릭
  const onClickSeeMore = () => {
    //
    const nextPage = getPageNo() + 1;
    match.params.pageNo = nextPage.toString();
    history.replace(routePaths.currentPage(nextPage));
    //showBadges();

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Certification');
    }, 1000);
  };

  return (
    <>
      <LineHeaderContainer
        curDiffLevel={difficultyLevel}
        curCategory={categorySelection}
        totalCount={badgeCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
        countMessage={BadgeCountText.AllBadgeList}
      />

      {badges.length > 0 ? (
        <>
          {/*Badge List*/}
          <BadgeListContainer
            badges={badges}
            badgeStyle={BadgeStyle.List}
            badgeSize={BadgeSize.Small}
          />
          {isContentMore() && <SeeMoreButton onClick={onClickSeeMore} />}
        </>
      ) : (
        <>
          <NoSuchContentPanel message="등록된 Badge List가 없습니다." />
        </>
      )}
    </>
  );
};

export default inject(
  mobxHelper.injectFrom('badge.badgeService', 'shared.pageService')
)(withRouter(observer(AllBadgeListContainer)));
