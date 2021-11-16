import { mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { findAvailableCardBundles } from '../../../lecture/shared/api/arrangeApi';
import { CardBundle } from '../../../lecture/shared/model/CardBundle';
import { InMyLectureService } from '../../../myTraining/stores';
import { RecommendContainer } from '../../../myTraining/ui/logic/RecommendContainer';
import { BookmarkCards } from './MainComponents/BookmarkCards';
import EnrollingLearning from './MainComponents/EnrollingLearning';
import LeraningContainer from './MainComponents/LeraningContainer';
import { LRSFromContentbase } from './MainComponents/LRSFromContentbase';
import { LRSFromLearningPatternBased } from './MainComponents/LRSFromLearningPatternBased';
import MainBanner from './MainComponents/MainBanner';
import MainChallengingBadgeContainer from './MainComponents/MainChallengingBadgeContainer';
import { MainHotTopicContainer } from './MainComponents/MainHotTopicContainer';
import RQDLearning from './MainComponents/RQDLearning';

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
      {/* {cardBundles?.map((cardBundle, i) => {
        if (cardBundle.id !== '5e1114a9-73da-4c9a-b961-332311a007eb') {
          return null;
        }
        return <LeraningContainer key={i} cardBundle={cardBundle} />;
      })} */}
      <MainBanner />
      <div className="learning-section-wrap">
        <RQDLearning />
        {cardBundles
          ?.filter((c) => c.type === 'New')
          .map((c) => (
            <LeraningContainer key={c.id} cardBundle={c} />
          ))}
        {cardBundles
          ?.filter((c) => c.type === 'Popular')
          .map((c) => (
            <LeraningContainer key={c.id} cardBundle={c} />
          ))}
        {cardBundles
          ?.filter((c) => c.type === 'Normal')
          .map((c) => (
            <LeraningContainer key={c.id} cardBundle={c} />
          ))}
        {/* {cardBundles?.map((cardBundle, i) => {
          // if (cardBundle.id === '5e1114a9-73da-4c9a-b961-332311a007eb') {
          //   return null;
          // }
          return <LeraningContainer key={i} cardBundle={cardBundle} />;
        })} */}
      </div>
      <div className="learning-section-wrap bg-gray">
        <LRSFromContentbase profileMemberName={skProfile.profileViewName} />
        <LRSFromLearningPatternBased
          profileMemberName={skProfile.profileViewName}
        />
        <BookmarkCards profileMemberName={skProfile.profileViewName} />
        <RecommendContainer />
      </div>
      <div className="learning-section-wrap">
        <MainChallengingBadgeContainer />
        <MainHotTopicContainer />
      </div>

      {/* Header 로 이동 <InProgressLearning profileMemberName={skProfile.profileViewName} /> */}

      <div className="learning-section-wrap">
        <EnrollingLearning />
      </div>
    </>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.inMyLectureService'
  )
)(withRouter(MyLearningContentContainer));
