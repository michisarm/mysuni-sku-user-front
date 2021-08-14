import React from 'react';
import BadgeView from './BadgeView';
import { getMainCategoryId, getCineroomId, Badge } from '../../model/Badge';
import BadgeSize from '../model/BadgeSize';
import BadgeStyle from '../model/BadgeStyle';
import { BadgeTitleView } from './BadgeTitleView';
import { BadgeInformationView } from './BadgeInformationView';
import { getBadgeCategoryName } from '../../service/useRequestBadgeCategory';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface BadgeSummaryViewProps {
  badge: Badge;
}

export default function BadgeSummaryView({ badge }: BadgeSummaryViewProps) {
  const mainCategoryId = getMainCategoryId(badge);
  const { collegeId } = badge;
  const collegeName = getCollgeName(collegeId);

  return (
    <>
      <div className="badge-list-type badge_new">
        <div className="badge-box basic">
          <BadgeView
            id={badge.id}
            name={parsePolyglotString(
              badge.name,
              getDefaultLang(badge.langSupport)
            )}
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
        name={parsePolyglotString(
          badge.name,
          getDefaultLang(badge.langSupport)
        )}
      />
      <BadgeInformationView
        certiAdminId={collegeName}
        designAdminId={mainCategoryId}
        level={badge.level}
        learningTime={badge.learningTime}
      />
    </>
  );
}
