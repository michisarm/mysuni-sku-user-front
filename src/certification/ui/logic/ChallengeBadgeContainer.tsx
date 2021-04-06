import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useCallback,
} from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { Button, Icon } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router';
import routePaths from '../../../personalcube/routePaths';
import BadgeRoutePaths from '../../routePaths';
import BadgeService from '../../present/logic/BadgeService';
import { PageService } from '../../../shared/stores';
import LineHeaderContainer from './LineHeaderContainer';
import ChallengeBoxContainer from './ChallengeBoxContainer';
import { SeeMoreButton } from '../../shared/Badge';
import BadgeCountText from '../model/BadgeCountText';
import { useScrollMove } from 'myTraining/useScrollMove';
import { MyBadge } from '../../model/MyBadge';
import { BadgeLevel } from '../../model/BadgeLevel';
import { BadgeRouteParams } from '../model/BadgeRouteParams';
import { useScrollTop } from '../../service/useScrollTop';

interface ChallengeBadgeContainerProps {
  badgeService?: BadgeService;
  pageService?: PageService;
}

function ChallengeBadgeContainer({
  badgeService,
  pageService,
}: ChallengeBadgeContainerProps) {
  const history = useHistory();
  const params = useParams<BadgeRouteParams>();
  const { scrollOnceMove } = useScrollMove();

  const { challengeBadges, challengeBadgeCount } = badgeService!;

  const PAGE_KEY = 'badge.challenging';
  const PAGE_SIZE = 4;

  const pageKey = useRef<string>(PAGE_KEY);
  const refresh = useRef<boolean>(false);

  const [selectedLevel, setSelectedLevel] = useState<BadgeLevel>('');

  useScrollTop();

  useEffect(() => {
    if (challengeBadges.length > 0) {
      setTimeout(() => {
        scrollOnceMove();
      }, 800);
    }
  }, [challengeBadges]);

  useEffect(() => {
    //
    pageKey.current = PAGE_KEY;

    const pageNo = getPageNo();
    pageService!.initPageMap(pageKey.current, 0, pageNo * PAGE_SIZE);

    findMyContent(pageNo - 1);

    refresh.current = true;

    return () => {
      badgeService!.clearChallengeBadges();
    };
  }, []);

  useEffect(() => {
     // 새로고침 / 이전 페이지로 이동 시 : 페이지 번호에 따라 처리되었으므로 리턴
     if (refresh.current) {
       // window.scrollTo(0, 0);
       refresh.current = false;
       return;
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
      badgeService!.clearChallengeBadges();
    }

    findMyContent(getPageNo() - 1);
  }, [selectedLevel, params.pageNo]);

  const findMyContent = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList = await badgeService!.findAllChallengeBadges({
      level: selectedLevel,
      offset: page!.nextOffset,
      limit: page!.limit,
    });

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
  };

  const getPageNo = () => {
    //
    return parseInt(params.pageNo, 10);
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

  // const refreshChallengingContainer = () => {
  //   badgeService!.findAllBadgeCount();

  //   badgeService!.clearChallengeBadges();

  //   const pageNo = getPageNo();
  //   pageService!.initPageMap(pageKey.current, 0, pageNo * PAGE_SIZE);

  //   findMyContent(pageNo - 1);

  //   refresh.current = true;
  // };

  const onSelectLevel = (level: BadgeLevel) => {
    // 페이지 변경(초기화)
    history.replace(routePaths.currentPage(1));

    // 페이지키 재설정 및 초기화
    pageKey.current = pageKey.current + '.' + selectedLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);

    //
    setSelectedLevel(level);
  };

  const moveToBadgeList = useCallback(() => {
    history.push(BadgeRoutePaths.badgeTab());
  }, []);

  return (
    <>
      <LineHeaderContainer
        totalCount={challengeBadgeCount}
        selectedLevel={selectedLevel}
        onSelectLevel={onSelectLevel}
        countMessage={BadgeCountText.ChallengingBadgeList}
      />

      {
        challengeBadges &&
        challengeBadges.length > 0 &&
        challengeBadges.map((challengeBadge: MyBadge, index: number) => (
          <Fragment key={`challenge-box-${index}`}>
            <ChallengeBoxContainer challengeBadge={challengeBadge} />
          </Fragment>
        )) || (
        <NoSuchContentPanel
          message={
            <>
              <div className="text">
                도전중인 Badge가 없습니다.
                <br />
                새로운 Badge에 도전해보시겠습니까?
              </div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
                onClick={moveToBadgeList}
              >
                Badge List 바로가기 <Icon className="morelink" />
              </Button>
            </>
          }
        />
      )}
      {isContentMore() && <SeeMoreButton onClick={onClickSeeMore} />}
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService', 
  'shared.pageService'
))(observer(ChallengeBadgeContainer));
