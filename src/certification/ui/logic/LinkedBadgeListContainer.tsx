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
      <div className="list">
        {
          linkedBadges && 
          linkedBadges.length > 0 && (
            <ul>
              {linkedBadges.map((linkedBadge, index) => {
                const mainCategoryId = getMainCategoryId(linkedBadge);

                return (
                  <li key={`linked-badge-${index}`}>
                    <BadgeView
                      id={linkedBadge.id}
                      name={linkedBadge.name}
                      level={linkedBadge.level}
                      iconUrl={linkedBadge.iconUrl}
                      categoryId={mainCategoryId}
                      badgeStyle={BadgeStyle.List}
                      badgeSize={BadgeSize.Small}
                    />
                    <div className="badge-name">
                      {linkedBadge.name}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) || (
          <NoSuchContentPanel message="등록된 연관 Badge가 없습니다." />
          )
        }
      </div>
    </LinkedBadgeListWrapper>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService'
  ))(observer(LinkedBadgeListContainer));
