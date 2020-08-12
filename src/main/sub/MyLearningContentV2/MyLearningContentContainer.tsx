
import React, {Component, useEffect, useState} from 'react';
import { mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { SkProfileService } from 'profile/stores';
import InProgressLearning from './MainComponents/InProgressLearning';
import RequiredLearning from './MainComponents/RQDLearning';
import ChallengingBadge from './MainComponents/ChallengingBadge';
import MainBanner from './MainComponents/MainBanner';
import NewLearning from './MainComponents/NEWLearning';
import PopularLearning from './MainComponents/POPLearning';
import RecommendLearning from './MainComponents/LRSLearning';
import InMyLectureApi from '../../../myTraining/present/apiclient/InMyLectureApi';
import {InMyLectureService} from '../../../myTraining/stores';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
  inMyLectureService?: InMyLectureService;
}

const MyLearningContentContainer : React.FC<Props> = (Props) => {
  const { skProfileService, inMyLectureService } = Props;
  const { skProfile } = skProfileService!;
  const { member } = skProfile;

  const [memName, setMemName] = useState('');

  useEffect(() => {
    inMyLectureService!.findAllInMyLectures();

    setMemName(member.name);
    if (memName.length < 1) {
      setTimeout(() => {
        setMemName(skProfileService!.skProfile.member.name);
      }, 200);
    }
  }, []);

  return (
    <>
      <InProgressLearning profileMemberName={member.name} />
      <ChallengingBadge profileMemberName={member.name} />
      <MainBanner />
      <RequiredLearning />
      <NewLearning />
      <PopularLearning profileMemberName={member.name} />
      <RecommendLearning
        profileMemberName={member.name}
        profileMemberEmail={member.email}
      />
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.inMyLectureService',
))(withRouter(MyLearningContentContainer));
