import React, {useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {NoSuchContentPanel} from 'shared';
import routePaths from '../../../personalcube/routePaths';
import {PageService} from '../../../shared/stores';
import BadgeService from '../../present/logic/BadgeService';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeListContainer from './BadgeListContainer';
import {SeeMoreButton} from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';


interface Props extends RouteComponentProps<{ type: string, pageNo: string }> {
  pageService?: PageService,
  badgeService?: BadgeService,

  badgeCount: number | undefined,
  categorySelection: string,
}

const AllBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { pageService, badgeService, badgeCount, categorySelection, history, match } = Props;
  const { categories, badges } = badgeService!;

  const PAGE_KEY = 'badge.all';
  const PAGE_SIZE = 12;  // 페이지 당 12개씩 보기(추가)

  const pageKey = useRef<string>('');
  const prevCategory = useRef<string>('');

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  useEffect(() => {
    //
    pageKey.current = PAGE_KEY;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    pageService!.setTotalCount(pageKey.current, badgeCount ? badgeCount : 0);

  }, []);

  useEffect(() => {

    if (categorySelection !== prevCategory.current) {
      prevCategory.current = categorySelection;
      // 페이지키 재설정 및 초기화
      pageKey.current = PAGE_KEY + categorySelection + difficultyLevel;
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    }

    const page = pageService!.pageMap.get(pageKey.current);

    if (getPageNo() > 1) {
      const offset = page!.limit > PAGE_SIZE && page!.nextOffset === 0 ?
        page!.nextOffset + PAGE_SIZE : page!.nextOffset;
      pageService!.initPageMap(pageKey.current, offset, PAGE_SIZE);
    }
    else {
      badgeService!.clearBadges();
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    }

    findMyContent(getPageNo() - 1);

  }, [categorySelection, difficultyLevel, match.params.pageNo]);

  const findMyContent = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList = await badgeService!.findPagingAllBadges(BadgeFilterRdoModel
      .all(categorySelection, difficultyLevel, page!.limit, page!.nextOffset));

    pageService!.setTotalCountAndPageNo(pageKey.current, badgeOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

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
    // history.replace(routePaths.currentPage(getPageNo() + 1));
    alert('더보기');
  };

  const onSelectDifficultyLevel = (diffLevel: string) => {
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));

    // 페이지키 재설정 및 초기화
    diffLevel = diffLevel === '전체' ? '': diffLevel;
    pageKey.current = PAGE_KEY + categorySelection + diffLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);

    // 난이도 변경
    setDifficultyLevel(diffLevel);
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.badgeCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
      />

      {badges.length > 0 ?
        <>
          {/*Badge List*/}
          <BadgeListContainer
            badges={badges}
            badgeStyle={BadgeStyle.List}
            badgeSize={BadgeSize.Large}
          />
          { isContentMore() && <SeeMoreButton onClick={onClickSeeMore} /> }
        </>
        :
        <>
          <NoSuchContentPanel message="등록된 Badge List가 없습니다."/>
        </>
      }
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'shared.pageService',
))(withRouter(observer(AllBadgeListContainer)));
