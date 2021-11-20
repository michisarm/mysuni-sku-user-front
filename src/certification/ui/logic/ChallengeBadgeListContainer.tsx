import React, {
  useEffect,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { Button, Icon } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router';
import routePaths from '../../../personalcube/routePaths';
import BadgeRoutePaths from '../../routePaths';
import BadgeService from '../../present/logic/BadgeService';
import LineHeaderContainer from './LineHeaderContainer';
import ChallengeBoxContainer from './ChallengeBoxContainer';
import { SeeMoreButton } from '../../shared/Badge';
import BadgeCountText from '../model/BadgeCountText';
import { useScrollMove } from 'myTraining/useScrollMove';
import { MyBadge } from '../../model/MyBadge';
import { BadgeLevel } from '../../model/BadgeLevel';
import { BadgeRouteParams } from '../model/BadgeRouteParams';
import { useRequestChallengeBadges } from '../../service/useRequestChallengeBadges';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { matchPath } from 'react-router-dom';

interface ChallengeBadgeListContainerProps {
  badgeService?: BadgeService;
}

function ChallengeBadgeListContainer({
  badgeService,
}: ChallengeBadgeListContainerProps) {
  const history = useHistory();
  const { scrollOnceMove } = useScrollMove();

  const {
    challengeBadges,
    challengeBadgeCount,
    selectedLevel,
    setSelectedLevel,
  } = badgeService!;
  const isLoading = useRequestChallengeBadges();

  useEffect(() => {
    if (challengeBadges.length > 0) {
      setTimeout(() => {
        scrollOnceMove();
      }, 800);
    }
  }, [challengeBadges]);

  const isContentMore = () => {
    return challengeBadges.length < challengeBadgeCount ? true : false;
  };

  const onClickSeeMore = () => {
    const pathname = window.location.pathname;
    const path = pathname.substr(pathname.indexOf('/certification'));
    const mathch = matchPath<BadgeRouteParams>(path, {
      path: '/certification/badge/:tab/pages/:pageNo',
      strict: true,
    });
    if (mathch?.isExact) {
      const nextPageNo = parseInt(mathch.params.pageNo) + 1;
      history.replace(routePaths.currentPage(nextPageNo));
    }
  };

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      console.log(entries);
      entries.forEach((c) => {
        if (c.isIntersecting) {
          onClickSeeMore();
        }
      });
    },
    [onClickSeeMore]
  );

  const observer = useMemo<IntersectionObserver | null>(() => {
    const options = {
      threshold: 0.01,
    };
    if (window.IntersectionObserver !== undefined) {
      const next = new IntersectionObserver(intersectionCallback, options);
      return next;
    }

    return null;
  }, [intersectionCallback]);

  const seeMoreButtonViewRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (ref !== null) {
        observer?.observe(ref);
      } else {
        observer?.disconnect();
      }
    },
    [observer]
  );

  const onSelectLevel = (level: BadgeLevel) => {
    history.replace(routePaths.currentPage(1));
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

      {(challengeBadges &&
        challengeBadges.length > 0 &&
        challengeBadges.map((challengeBadge: MyBadge, index: number) => (
          <Fragment key={`challenge-box-${index}`}>
            <ChallengeBoxContainer challengeBadge={challengeBadge} />
          </Fragment>
        ))) || (
        <NoSuchContentPanel
          message={
            <>
              <div className="text">
                <PolyglotText
                  defaultString="도전중인 Badge가 없습니다."
                  id="Certification-clls-뱃지없음"
                />
                <br />
                <PolyglotText
                  defaultString="새로운 Badge에 도전해보시겠습니까?"
                  id="Certification-clls-뱃지도전"
                />
              </div>
              <Button
                icon
                as="a"
                className="right btn-blue2"
                onClick={moveToBadgeList}
              >
                <PolyglotText
                  defaultString="Badge List 바로가기"
                  id="Certification-clls-목록없음"
                />
                <Icon className="morelink" />
              </Button>
            </>
          }
        />
      )}
      {!isLoading && isContentMore() && (
        <SeeMoreButton onClick={onClickSeeMore} ref={seeMoreButtonViewRef} />
      )}
    </>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(ChallengeBadgeListContainer)
);
