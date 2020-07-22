import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {ContentLayout} from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import BadgeContentContainer from '../logic/BadgeContentContainer';
import LinkedBadgeListContainer from '../logic/LinkedBadgeListContainer';


interface Props extends RouteComponentProps<{ badgeId: string }> {
  badgeService?: BadgeService,
}

const BadgeDetailPage: React.FC<Props> = (Props) => {
  //
  const { badgeService, history, match } = Props;

  const [badgeDetail, setBadgeDetail] = useState();

  useEffect(() => {
    //
    findMyContent(match.params.badgeId);
  }, [match.params.badgeId]);

  const findMyContent = async (id: string) => {
    //
    const badgeInfo = await badgeService!.findBadgeDetailInfo(id);
    setBadgeDetail(badgeInfo);

    console.log( badgeInfo);
  };

  // 뱃지 상세정보 호출
  return (
    <ContentLayout
      className="no-padding"
      breadcrumb={[
        { text: badgeService!.badgeDetailInfo.mainCategoryName},
      ]}
    >
      <BadgeContentContainer badgeDetail={badgeService!.badgeDetailInfo} />

      {/*연관 Badge*/}
      <LinkedBadgeListContainer badgeId={match.params.badgeId}/>

    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(observer(BadgeDetailPage)));
