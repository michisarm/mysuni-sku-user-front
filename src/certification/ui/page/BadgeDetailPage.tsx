import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import LinkedBadgeListContainer from '../logic/LinkedBadgeListContainer';
import { getMainCategoryId } from '../../model/Badge';
import { useRequestBadgeDetail } from '../../service/useRequestBadgeDetail';
import BadgeSummaryContainer from '../logic/BadgeSummaryContainer';
import BadgeContentContainer from '../logic/BadgeContentContainer';
import { getBadgeCategoryName } from '../../service/useRequestBadgeCategory';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import routePaths from 'certification/routePaths';

interface BadgeDetailPageProps {
  badgeService?: BadgeService;
}

function BadgeDetailPage({ badgeService }: BadgeDetailPageProps) {
  const { badge } = badgeService!;
  const mainCategoryId = getMainCategoryId(badge);
  useRequestBadgeDetail();

  return (
    <ContentLayout
      className="no-padding"
      breadcrumb={[
        {
          text: getPolyglotText('Certification', 'Certification-cb-dp2'),
          path: routePaths.badgeTab(),
        },
        { text: getBadgeCategoryName(mainCategoryId) },
      ]}
    >
      <BadgeSummaryContainer />
      <BadgeContentContainer />
      <LinkedBadgeListContainer />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(BadgeDetailPage)
);
