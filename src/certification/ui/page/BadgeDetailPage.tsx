import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import BadgeContentContainer from '../logic/BadgeContentContainer';
import LinkedBadgeListContainer from '../logic/LinkedBadgeListContainer';


interface Props extends RouteComponentProps<{ badgeId: string }> {
  badgeService?: BadgeService,
}

const BadgeDetailPage: React.FC<Props> = (Props) => {
  //
  const { badgeService, match } = Props;
  const { badgeDetailInfo } = badgeService!;

  const currentBadgeId = match.params.badgeId;

  useEffect(() => {
    //
    findMyContent(match.params.badgeId);

  }, [currentBadgeId]);


  const findMyContent = async (badgeId: string) => {
    //
    await badgeService!.findBadgeDetailInfo(badgeId);
  };


  return (
    <ContentLayout
      className="no-padding"
      breadcrumb={[
        { text: badgeDetailInfo.mainCategoryName },
      ]}
    >
      <BadgeContentContainer badgeId={currentBadgeId} badgeDetail={badgeDetailInfo} />

      {/*연관 Badge*/}
      <LinkedBadgeListContainer badgeId={currentBadgeId} />

    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(observer(BadgeDetailPage)));
