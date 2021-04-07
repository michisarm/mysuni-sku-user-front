import React, { useEffect, useState } from 'react';
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
import { InMyLectureService } from '../../../myTraining/stores';
import LeraningContainer from './MainComponents/LeraningContainer';
import EnrollingLearning from './MainComponents/EnrollingLearning';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  inMyLectureService?: InMyLectureService;
}

const MyLearningContentContainer: React.FC<Props> = Props => {
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
  }, [inMyLectureService, memName.length, member.name, skProfileService]);

  return (
    <>
      <InProgressLearning profileMemberName={member.name} />

      {/*TODO! Badge 정식 오픈 시 주석해제 0820 */}
      <ChallengingBadge profileMemberName={member.name} />

      <MainBanner />
      <LeraningContainer contentType="Normal" contentTypeName="일반 과정" />
      <LeraningContainer contentType="New" contentTypeName="신규 과정" />
      <LeraningContainer contentType="Popular" contentTypeName="인기 과정" />
      <LeraningContainer contentType="Recommended" contentTypeName="추천 과정" />
      {/* <RequiredLearning />
      <NewLearning />
      <PopularLearning profileMemberName={member.name} />
      <RecommendLearning
        profileMemberName={member.name}
        profileMemberEmail={member.email}
      /> */}
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
