import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { BadgeService } from '../../stores';
import BadgeContentView from '../view/BadgeContentView';


interface BadgeContentContainerProps {
  badgeService?: BadgeService;
}

function BadgeContentContainer({
  badgeService,
}: BadgeContentContainerProps) {
  const { badge } = badgeService!;

  return (
    <>
      {
        badge !== undefined && (
          <BadgeContentView badge={badge} />
        )
      }
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(observer(BadgeContentContainer));