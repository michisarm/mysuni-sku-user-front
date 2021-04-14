import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import { LinkedBadgeListWrapper } from '../view/BadgeContentElementView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeView from '../view/BadgeView';
import { getMainCategoryId } from '../../model/Badge';

interface LinkedBadgeListContainerProps {
  badgeService?: BadgeService;
}

function LinkedBadgeListContainer({
  badgeService,
}: LinkedBadgeListContainerProps) {
  const { linkedBadges } = badgeService!;

  return (
    <LinkedBadgeListWrapper>
      <div className="badge-list-type">
        {(linkedBadges && linkedBadges.length > 0 && (
          <ul>
            {linkedBadges.map((linkedBadge, index) => {
              const mainCategoryId = getMainCategoryId(linkedBadge.badge);

              return (
                <li key={`linked-badge-${index}`}>
                  <BadgeView
                    id={linkedBadge.badge.id}
                    name={linkedBadge.badge.name}
                    level={linkedBadge.badge.level}
                    iconUrl={linkedBadge.badge.iconUrl}
                    categoryId={mainCategoryId}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                    backgroundImagePath={linkedBadge.badgeCategory.backgroundImagePath}
                    badgeColor={linkedBadge.badgeCategory.themeColor}
                    topImagePath={linkedBadge.badgeCategory.topImagePath}
                  />
                  <div className="badge-name">{linkedBadge.badge.name}</div>
                </li>
              );
            })}
          </ul>
        )) || <NoSuchContentPanel message="등록된 연관 Badge가 없습니다." />}
      </div>
    </LinkedBadgeListWrapper>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(LinkedBadgeListContainer)
);
