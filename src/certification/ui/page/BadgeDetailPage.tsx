import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';


// Component
import {ContentLayout} from 'shared';
import BadgeContentContainer from '../logic/BadgeContentContainer';



import {onebadgeData} from '../../present/apiclient/onebadgeData';

interface Props extends RouteComponentProps<{ badgeId: string }> {

}

const BadgeDetailPage: React.FC<Props> = (Props) => {
  //

  // badgeId를 받아서 API 호출
  const { history, match } = Props;


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

    </ContentLayout>
  );
};

export default BadgeDetailPage;
