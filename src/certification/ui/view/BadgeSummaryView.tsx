import React from 'react';
import BadgeView from './BadgeView';
import { getMainCategoryId, getCineroomId, Badge } from '../../model/Badge';
import BadgeSize from '../model/BadgeSize';
import BadgeStyle from '../model/BadgeStyle';
import { BadgeTitleView } from './BadgeTitleView';
import { BadgeInformationView } from './BadgeInformationView';
import { getCineroomName } from '../../../shared/service/useCineroom/useRequestCineroom';
import { getBadgeCategoryName } from '../../service/useRequestBadgeCategory';

interface BadgeSummaryViewProps {
  badge: Badge;
}

export default function BadgeSummaryView({ badge }: BadgeSummaryViewProps) {
  const mainCategoryId = getMainCategoryId(badge);
  const cineroomId = getCineroomId(badge);
  const cineroomName = getCineroomName(cineroomId) || '';

  return (
    <>
      <div className="badge-list-type badge_new">
        <div className="badge-box basic">
          <BadgeView
            id={badge.id}
            name={badge.name}
            level={badge.level}
            iconUrl={badge.iconUrl}
            categoryId={mainCategoryId}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Small}
          />
        </div>
      </div>
      <BadgeTitleView
        college={getBadgeCategoryName(mainCategoryId)}
        name={badge.name}
      />
      <BadgeInformationView
        certiAdminId={cineroomName}
        designAdminId={mainCategoryId}
        level={badge.level}
        learningTime={badge.learningTime}
      />
    </>
  );
}
