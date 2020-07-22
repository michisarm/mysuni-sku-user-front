
import React, {useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {NoSuchContentPanel} from 'shared';
import {Button, Icon} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import routePaths from '../../../personalcube/routePaths';
import BadgeRoutePaths from '../../routePaths';
import BadgeService from '../../present/logic/BadgeService';
import {PageService} from '../../../shared/stores';
import LineHeaderContainer from './LineHeaderContainer';
import ChallengeBoxContainer from './ChallengeBoxContainer';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';
import {SeeMoreButton} from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,
  pageService?: PageService,

  badgeCount: number | undefined,
  countMessage?: string,
  resetChallengeCount: (count: number) => void;
}

const ChallengingBadgeContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, badgeCount, resetChallengeCount, history, match, } = Props;
  const { myBadges } = badgeService!;

  const PAGE_KEY = 'badge.challenging';
  const PAGE_SIZE = 8;

  const pageKey = useRef<string>(PAGE_KEY);

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  useEffect(() => {
    //
    pageKey.current = PAGE_KEY;
    badgeService!.clearMyBadges();
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    pageService!.setTotalCount(pageKey.current, badgeCount ? badgeCount : 0);

    return (() => {
      window.scrollTo(0, 0);
    });

  }, []);

  useEffect(() => {

    const page = pageService!.pageMap.get(pageKey.current);

    if (getPageNo() > 1) {
      const offset = page!.limit > PAGE_SIZE && page!.nextOffset === 0 ?
        page!.nextOffset + PAGE_SIZE : page!.nextOffset;
      pageService!.initPageMap(pageKey.current, offset, PAGE_SIZE);
    }
    else {
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    }

    findMyContent(getPageNo() - 1);

  }, [difficultyLevel, match.params.pageNo]);

  const findMyContent = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList = await badgeService!.findPagingChallengingBadges(BadgeFilterRdoModel
      .challenging(difficultyLevel, page!.limit, page!.nextOffset));

    pageService!.setTotalCountAndPageNo(pageKey.current, badgeOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    if (badgeCount !== badgeOffsetList.totalCount) {
      resetChallengeCount(badgeOffsetList.totalCount);
    }
  };

  const getPageNo = () => {
    //
    return parseInt(match.params.pageNo, 10);
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(pageKey.current);
    return page && page.pageNo < page.totalPages;
  };

  // see more button 클릭
  const onClickSeeMore = () => {
    //
    history.replace(routePaths.currentPage(getPageNo() + 1));
  };

  const onSelectDifficultyLevel = (diffLevel: string) => {
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));

    // 페이지키 재설정 및 초기화
    pageKey.current = pageKey.current + '.' +  difficultyLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);

    //
    setDifficultyLevel(diffLevel === '전체' ? '': diffLevel);
  };

  const moveToBadgeList = () => {
    // Badge List 탭으로 이동
    history.push(BadgeRoutePaths.badgeTab());
  };


  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.challengingCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
        countMessage={BadgeCountText.ChallengingBadgeList}
      />

      {myBadges.length > 0 ? (
        <>
          <ChallengeBoxContainer
            badges={myBadges}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Small}
          />
          { isContentMore() && <SeeMoreButton onClick={onClickSeeMore} /> }
        </>
      ) : (
        <NoSuchContentPanel message={(
          <>
            <div className="text">도전중인 Badge가 없습니다.<br/>새로운 Badge에 도전해보시겠습니까?</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
              onClick={moveToBadgeList}
            >
              Badge List 바로가기 <Icon className="morelink"/>
            </Button>
          </>
        )}
        />
      )}

    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'shared.pageService',
))(withRouter(observer(ChallengingBadgeContainer)));
