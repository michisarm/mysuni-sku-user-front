import React from 'react';
import BadgeView from './BadgeView';
import { getMainCategoryId, getCineroomId, Badge } from '../../model/Badge';
import BadgeSize from '../model/BadgeSize';
import BadgeStyle from '../model/BadgeStyle';
import { BadgeTitleView } from './BadgeTitleView';
import { BadgeInformationView } from './BadgeInformationView';
import { getCineroomName } from '../../../shared/service/useCineroom/useRequestCineroom';

interface BadgeSummaryViewProps {
  badge: Badge;
}

export default function BadgeSummaryView({ badge }: BadgeSummaryViewProps) {
  const mainCategoryId = getMainCategoryId(badge);
  const cineroomId = getCineroomId(badge);
  const cineroomName = getCineroomName(cineroomId) || '';

  return (
    <>
      <BadgeView
        id={badge.id}
        name={badge.name}
        level={badge.level}
        iconUrl={badge.iconUrl}
        categoryId={mainCategoryId}
        badgeStyle={BadgeStyle.Detail}
        badgeSize={BadgeSize.Small}
      />
      <BadgeTitleView college={mainCategoryId} name={badge.name} />
      <BadgeInformationView
        certiAdminId={cineroomName}
        designAdminId={mainCategoryId}
        level={badge.level}
        learningTime={badge.learningTime}
      />
    </>
  );
}
