import React, { useEffect, useState } from 'react';
import { mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { SkProfileService } from 'profile/stores';
import InProgressLearning from './MainComponents/InProgressLearning';
import ChallengingBadge from './MainComponents/ChallengingBadge';
import MainBanner from './MainComponents/MainBanner';
import { InMyLectureService } from '../../../myTraining/stores';
import LeraningContainer from './MainComponents/LeraningContainer';
import EnrollingLearning from './MainComponents/EnrollingLearning';
import RQDLearning from './MainComponents/RQDLearning';
import { CardBundle } from '../../../lecture/shared/model/CardBundle';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import LRSLearning from './MainComponents/LRSLearning';
import { Abtest, ExperimentalGroup } from 'abtest/components';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  inMyLectureService?: InMyLectureService;
}

const MyLearningContentContainer: React.FC<Props> = (Props) => {
  const [cardBundles, setCardBundles] = useState<CardBundle[]>();
  const { skProfileService, inMyLectureService } = Props;
  const { skProfile } = skProfileService!;
  // const { member } = skProfile;
  const [memName, setMemName] = useState('');

  const fetchCardBundles = async () => {
    const response = await findAvailableCardBundles();
    setCardBundles(response);
  };

  useEffect(() => {
    fetchCardBundles();
  }, []);

  useEffect(() => {
    inMyLectureService!.findAllInMyLectures();

    setMemName(parsePolyglotString(skProfile.name));
    if (memName.length < 1) {
      setTimeout(() => {
        setMemName(parsePolyglotString(skProfile.name));
      }, 200);
    }
  }, [inMyLectureService, memName.length, skProfile.name, skProfileService]);

  return (
    <>
      {cardBundles?.map((cardBundle, i) => {
        if (cardBundle.id !== '5e1114a9-73da-4c9a-b961-332311a007eb') {
          return null;
        }
        return <LeraningContainer key={i} cardBundle={cardBundle} />;
      })}
      <InProgressLearning profileMemberName={skProfile.profileViewName} />
      {/*TODO! Badge 정식 오픈 시 주석해제 0820 */}
      <ChallengingBadge
        // profileMemberName={member.name}
        profileMemberName={skProfile.profileViewName}
      />
      <MainBanner />
      <RQDLearning />
      {cardBundles?.map((cardBundle, i) => {
        if (cardBundle.id === '5e1114a9-73da-4c9a-b961-332311a007eb') {
          return null;
        }
        return <LeraningContainer key={i} cardBundle={cardBundle} />;
      })}
      <LRSLearning profileMemberName={skProfile.profileViewName} />
      <EnrollingLearning />
    </>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.inMyLectureService'
  )
)(withRouter(MyLearningContentContainer));
