import React, { useEffect, Fragment, useCallback } from 'react';
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

interface ChallengeBadgeListContainerProps {
  badgeService?: BadgeService;
}

function ChallengeBadgeListContainer({
  badgeService,
}: ChallengeBadgeListContainerProps) {
  const history = useHistory();
  const params = useParams<BadgeRouteParams>();
  const { scrollOnceMove } = useScrollMove();

  const {
    challengeBadges,
    challengeBadgeCount,
    selectedLevel,
    setSelectedLevel,
  } = badgeService!;
  useRequestChallengeBadges();

  useEffect(() => {
    if (challengeBadges.length > 0) {
      setTimeout(() => {
        scrollOnceMove();
      }, 800);
    }
  }, [challengeBadges]);

  const getCurrentPageNo = () => {
    return parseInt(params.pageNo);
  };

  const isContentMore = () => {
    return challengeBadges.length < challengeBadgeCount ? true : false;
  };

  const onClickSeeMore = () => {
    const currentPageNo = getCurrentPageNo();
    const nextPageNo = currentPageNo + 1;

    history.replace(routePaths.currentPage(nextPageNo));
  };

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
      {isContentMore() && <SeeMoreButton onClick={onClickSeeMore} />}
    </>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(ChallengeBadgeListContainer)
);
