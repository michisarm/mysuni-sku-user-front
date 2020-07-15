
import React, { Component } from 'react';
import { mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { SkProfileService } from 'profile/stores';
import InProgressLearning from './MainComponents/InProgressLearning';
import RequiredLearning from './MainComponents/RequiredLearning';
import ChallengingBadge from './MainComponents/ChallengingBadge';
import MainBanner from './MainComponents/MainBanner';
import NewLearning from './MainComponents/NewLearning';
import PopularLearning from './MainComponents/PopularLearning';
import RecommendLearning from './MainComponents/RecommendLearning';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
}

const MyLearningContentContainer : React.FC<Props> = (Props) => {
  const { skProfileService } = Props;
  const { profileMemberName } = skProfileService!;

  return (
    <>
      <InProgressLearning profileMemberName={profileMemberName} />
      <ChallengingBadge profileMemberName={profileMemberName} />
      <MainBanner />
      <RequiredLearning />
      <NewLearning />
      <PopularLearning profileMemberName={profileMemberName} />
      <RecommendLearning profileMemberName={profileMemberName} />
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService'
))(withRouter(MyLearningContentContainer));
