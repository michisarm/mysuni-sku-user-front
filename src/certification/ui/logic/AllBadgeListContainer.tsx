import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { useHistory, useParams } from 'react-router';
import { NoSuchContentPanel } from 'shared';
import routePaths from '../../../personalcube/routePaths';
import BadgeService from '../../present/logic/BadgeService';
import LineHeaderContainer from './LineHeaderContainer';
import { SeeMoreButton } from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';
import ReactGA from 'react-ga';
import { useScrollMove } from 'myTraining/useScrollMove';
import { BadgeLevel } from '../../model/BadgeLevel';
import { BadgeRouteParams } from '../model/BadgeRouteParams';
import { BadgeCategoryService } from '../../../lecture/stores';
import { Badge, getMainCategoryId } from '../../model/Badge';
import BadgeView from '../view/BadgeView';
import { useRequestAllBadges } from '../../service/useRequestAllBadges';

interface AllBadgeListContainerProps {
  badgeService?: BadgeService;
  badgeCategoryService?: BadgeCategoryService;
}

function AllBadgeListContainer({
  badgeService,
  badgeCategoryService,
}: AllBadgeListContainerProps) {
  const { badges, badgeCount, selectedLevel, setSelectedLevel } = badgeService!;
  const { selectedCategoryId } = badgeCategoryService!;

  const history = useHistory();
  const params = useParams<BadgeRouteParams>();
  const { scrollOnceMove } = useScrollMove();

  useRequestAllBadges();

  useEffect(() => {
    setSelectedLevel('');
    history.replace(routePaths.currentPage(1));

    return () => {
      badgeService!.clearBadges();
    };
  }, [selectedCategoryId]);

  useEffect(() => {
    if (badges.length > 0) {
      setTimeout(() => {
        scrollOnceMove();
      }, 800);
    }
  }, [badges.length]);

  const onSelectLevel = (level: BadgeLevel) => {
    history.replace(routePaths.currentPage(1));
    setSelectedLevel(level);
  };

  const getCurrentPageNo = () => {
    return parseInt(params.pageNo);
  };

  const isContentMore = () => {
    return badges.length < badgeCount ? true : false;
  };

  const onClickSeeMore = () => {
    const nextPageNo = getCurrentPageNo() + 1;
    history.replace(routePaths.currentPage(nextPageNo));

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Certification');
    }, 1000);
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeCount}
        countMessage={BadgeCountText.AllBadgeList}
        selectedLevel={selectedLevel}
        onSelectLevel={onSelectLevel}
      />
      <div className="badge-list-type">
        <ul>
          {(badges &&
            badges.length > 0 &&
            badges.map((badge: Badge, index: number) => {
              const mainCategoryId = getMainCategoryId(badge);

              return (
                <li key={`all-badge-${index}`}>
                  <BadgeView
                    id={badge.id}
                    name={badge.name}
                    level={badge.level}
                    iconUrl={badge.iconUrl}
                    categoryId={mainCategoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                  <div className="badge-name">
                    <span>{badge.name}</span>
                  </div>
                </li>
              );
            })) || (
            <NoSuchContentPanel message="등록된 Badge List가 없습니다." />
          )}
        </ul>
      </div>
      {isContentMore() && <SeeMoreButton onClick={onClickSeeMore} />}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('badge.badgeService', 'badge.badgeCategoryService')
)(observer(AllBadgeListContainer));
