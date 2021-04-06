import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import BadgeService from '../../present/logic/BadgeService';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import { BadgeDetailRouteParams } from '../model/BadgeRouteParams';
import BadgeView from '../view/BadgeView';
import { getMainCategoryId } from '../../model/Badge';

interface BadgePreviewPageProps {
  badgeService?: BadgeService;
}

function BadgePreviewPage({
  badgeService,
}: BadgePreviewPageProps) {
  const { badge } = badgeService!;
  const params = useParams<BadgeDetailRouteParams>();

  useEffect(() => {
    badgeService!.findBadge(params.badgeId);
  }, [params.badgeId]);

  const mainCategoryId = getMainCategoryId(badge);
  return (
    <div className="badge-list">
      {badge && (
          <ul>
            <li>
              <BadgeView
                id={badge.id}
                name={badge.name}
                level={badge.level}
                iconUrl={badge.iconUrl}
                categoryId={mainCategoryId}
                badgeStyle={BadgeStyle.Detail}
                badgeSize={BadgeSize.Small}
              />
              <div className="badge-name">{badge.name}</div>
            </li>
            <li>
              <BadgeView
                id={badge.id}
                name={badge.name}
                level={badge.level}
                iconUrl={badge.iconUrl}
                categoryId={mainCategoryId}
                badgeStyle={BadgeStyle.Detail}
                badgeSize={BadgeSize.Small}
              />
              <div className="badge-name">{badge.name}</div>
            </li>
          </ul>
        )
      }
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService'
))(observer(BadgePreviewPage));
