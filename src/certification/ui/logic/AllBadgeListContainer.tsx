import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { matchPath, useHistory, useParams } from 'react-router';
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
import { BadgeBundle, getMainCategoryId } from '../../model/Badge';
import BadgeView from '../view/BadgeView';
import { useRequestAllBadges } from '../../service/useRequestAllBadges';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

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
  const { scrollOnceMove } = useScrollMove();

  const isLoading = useRequestAllBadges();

  useEffect(() => {
    setSelectedLevel('');
    history.replace(routePaths.currentPage(1));

    return () => {
      badgeService!.clearBadges();
    };
  }, [badgeService, history, selectedCategoryId, setSelectedLevel]);

  useEffect(() => {
    if (badges.length > 0) {
      setTimeout(() => {
        scrollOnceMove();
      }, 800);
    }
  }, [badges.length, scrollOnceMove]);

  const onClickSeeMore = useCallback(() => {
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

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], 'Certification');
    }, 1000);
  }, []);

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

  const isContentMore = () => {
    return badges.length < badgeCount ? true : false;
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
            badges.map((badgeBundle: BadgeBundle, index: number) => {
              const mainCategoryId = getMainCategoryId(badgeBundle.badge);

              return (
                <li key={`all-badge-${index}`}>
                  <BadgeView
                    id={badgeBundle.badge.id}
                    name={parsePolyglotString(
                      badgeBundle.badge.name,
                      getDefaultLang(badgeBundle.badge.langSupport)
                    )}
                    level={badgeBundle.badge.level}
                    iconUrl={badgeBundle.badge.iconUrl}
                    categoryId={mainCategoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                    badgeColor={badgeBundle.badgeCategory.themeColor}
                    backgroundImagePath={
                      badgeBundle.badgeCategory.backgroundImagePath
                    }
                    topImagePath={badgeBundle.badgeCategory.topImagePath}
                  />
                  <div className="badge-name">
                    <span>
                      {parsePolyglotString(
                        badgeBundle.badge.name,
                        getDefaultLang(badgeBundle.badge.langSupport)
                      )}
                    </span>
                  </div>
                </li>
              );
            })) || (
            <NoSuchContentPanel
              message={getPolyglotText(
                '등록된 Badge List가 없습니다.',
                'Certification-bdls-뱃지없음'
              )}
            />
          )}
        </ul>
      </div>
      {!isLoading && isContentMore() && (
        <SeeMoreButton onClick={onClickSeeMore} ref={seeMoreButtonViewRef} />
      )}
    </>
  );
}

export default inject(
  mobxHelper.injectFrom('badge.badgeService', 'badge.badgeCategoryService')
)(observer(AllBadgeListContainer));
