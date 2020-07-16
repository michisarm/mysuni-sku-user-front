import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';

import {ContentLayout} from 'shared';

import BadgeService from '../../present/logic/BadgeService';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';

// Component
import BadgeContentContainer from '../logic/BadgeContentContainer';
import LinkedBadgeListContainer from '../logic/LinkedBadgeListContainer';

import {onebadgeData} from '../../present/apiclient/onebadgeData';


interface Props extends RouteComponentProps<{ badgeId: string }> {
  badgeService?: BadgeService,

}

const BadgeDetailPage: React.FC<Props> = (Props) => {
  //
  const { badgeService, history, match } = Props;
  const badgeId = match.params.badgeId;

  // 뱃지 상세정보 호출

  return (
    <ContentLayout
      className="no-padding"
      breadcrumb={[
        { text: '123'},
        { text: '456'},
      ]}
    >
      <BadgeContentContainer badge={onebadgeData.results[0]}>
        <div>학습정보</div>
      </BadgeContentContainer>

      {/*연관 Badge*/}
      <LinkedBadgeListContainer badgeId={badgeId}/>

    </ContentLayout>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(observer(BadgeDetailPage)));
