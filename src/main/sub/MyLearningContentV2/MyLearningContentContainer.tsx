import { mobxHelper } from '@nara.platform/accent';
import { Abtest, ExperimentalGroup } from 'abtest/components';
import { inject } from 'mobx-react';
import { SkProfileService } from 'profile/stores';
import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { isExternalInstructor } from 'shared/helper/findUserRole';
import { usePageElements } from 'shared/store/PageElementsStore';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { findAvailableCardBundlesCache } from '../../../lecture/shared/api/arrangeApi';
import { CardBundle } from '../../../lecture/shared/model/CardBundle';
import { RecommendContainer } from '../../../myTraining/ui/logic/RecommendContainer';
import { testIsIE } from '../../../shared/helper/bodyHelper';
import { BookmarkCards } from './MainComponents/BookmarkCards';
import EnrollingLearning from './MainComponents/EnrollingLearning';
import LeraningContainer from './MainComponents/LeraningContainer';
import { LRSFromContentbase } from './MainComponents/LRSFromContentbase';
import { LRSFromLearningPatternBased } from './MainComponents/LRSFromLearningPatternBased';
import MainBanner from './MainComponents/MainBanner';
import MainChallengingBadgeContainer from './MainComponents/MainChallengingBadgeContainer';
import { MainHotTopicContainer } from './MainComponents/MainHotTopicContainer';
import RQDLearning from './MainComponents/RQDLearning';
import { PlaylistContainerView } from './playlistContainer/PlaylistContainerView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
}

const MyLearningContentContainer: React.FC<Props> = (Props) => {
  const [cardBundles, setCardBundles] = useState<CardBundle[]>();
  const { skProfileService } = Props;
  const { skProfile } = skProfileService!;
  // const { member } = skProfile;
  const [memName, setMemName] = useState('');

  const fetchCardBundles = async () => {
    const response = await findAvailableCardBundlesCache();
    setCardBundles(response);
  };

  useEffect(() => {
    fetchCardBundles();
  }, []);

  useEffect(() => {
    setMemName(parsePolyglotString(skProfile.name));
    if (memName.length < 1) {
      setTimeout(() => {
        setMemName(parsePolyglotString(skProfile.name));
      }, 200);
    }
  }, [memName.length, skProfile.name, skProfileService]);

  const pageElements = usePageElements();
  const isExternal = isExternalInstructor();
  const isIE = useMemo(testIsIE, []);

  return (
    <>
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

        {/** 플레이리스트 */}
        <PlaylistContainerView />
      </div>
      <div className="learning-section-wrap bg-gray">
        {pageElements.some(
          (pagemElement) =>
            pagemElement.position === 'HomeElement' &&
            pagemElement.type === 'LRSCards'
        ) && (
          <Abtest name="AB-2" nonExperimentalGroup="A">
            <ExperimentalGroup name="A" style={{ marginBottom: '50px' }}>
              <LRSFromContentbase
                profileMemberName={skProfile.profileViewName}
              />
              <LRSFromLearningPatternBased
                profileMemberName={skProfile.profileViewName}
              />
            </ExperimentalGroup>
            <ExperimentalGroup name="B" style={{ marginBottom: '50px' }}>
              <LRSFromLearningPatternBased
                profileMemberName={skProfile.profileViewName}
              />
              <LRSFromContentbase
                profileMemberName={skProfile.profileViewName}
              />
            </ExperimentalGroup>
          </Abtest>
        )}
        <BookmarkCards profileMemberName={skProfile.profileViewName} />
        {pageElements.some(
          (pagemElement) =>
            pagemElement.position === 'HomeElement' &&
            pagemElement.type === 'RecommendCards'
        ) && <RecommendContainer />}
      </div>
      <div className="learning-section-wrap">
        {pageElements.some(
          (pagemElement) =>
            pagemElement.position === 'TopMenu' &&
            pagemElement.type === 'Certification'
        ) &&
          !isExternal && <MainChallengingBadgeContainer />}
        {pageElements.some(
          (pagemElement) =>
            pagemElement.position === 'HomeElement' &&
            pagemElement.type === 'HotTopic'
        ) && <MainHotTopicContainer />}
      </div>

      {pageElements.some(
        (pagemElement) =>
          pagemElement.position === 'HomeElement' &&
          pagemElement.type === 'EnrollingCards'
      ) && (
        <div className="learning-section-wrap">
          <EnrollingLearning />
        </div>
      )}
    </>
  );
};

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.inMyLectureService'
  )
)(withRouter(MyLearningContentContainer));
