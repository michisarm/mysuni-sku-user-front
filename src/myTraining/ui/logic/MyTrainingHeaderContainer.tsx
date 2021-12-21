import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { SkProfileService } from '../../../profile/stores';
import { LectureService } from '../../../lecture';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import MyTrainingService from '../../present/logic/MyTrainingService';
import { BadgeService } from '../../../lecture/stores';
import { ContentHeader } from '../../../shared';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import badgePaths from '../../../certification/routePaths';
import myTrainingPaths from '../../routePaths';
import lecturePaths from '../../../lecture/routePaths';
import { useRequestLearningSummary } from '../../service/useRequestLearningSummary';
import { Area } from 'tracker/model';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { patronInfo } from '@nara.platform/dock';
import { initial } from 'lodash';
import { requestCollegePercent } from '../../../main/sub/PersonalBoard/service/getCollegePercent';

interface MyTrainingHeaderContainerProps {
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  lectureService?: LectureService;
  // myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}

function MyTrainingHeaderContainer({
  skProfileService,
  myLearningSummaryService,
  lectureService,
  // myTrainingService,
  badgeService,
}: MyTrainingHeaderContainerProps) {
  const { skProfile } = skProfileService!;
  const {
    // instructTimeSummary,
    findInstructTimeSummary,
    findMyLearningSummaryByYear,
    getDisplayTotalLearningTime,
    getDisplayMySuniLeaningTime,
    getDisplayCompanyLearningTime,
    displayTotalLearningTime,
  } = myLearningSummaryService!;
  const { myStampCount } = lectureService!;
  const {
    allBadgeCount: { issuedCount },
  } = badgeService!;

  const history = useHistory();
  const currentYear = moment().year();

  useEffect(() => {
    // badgeService!.findAllBadgeCount();
    lectureService!.countMyStamp();

    badgeService!.findAllBadgeCount();

    init();

    // findInstructTimeSummary();
    // findMyLearningSummaryByYear();
  }, [displayTotalLearningTime]);

  const init = async () => {
    await findInstructTimeSummary();
    await findMyLearningSummaryByYear();
    await requestCollegePercent();

    await getDisplayTotalLearningTime();
    await getDisplayMySuniLeaningTime();
    await getDisplayCompanyLearningTime();
  };

  useRequestLearningSummary();

  const onClickMyBadge = useCallback(() => {
    history.push(myTrainingPaths.myPageEarnedBadgeList());
  }, []);

  const onClickMyStamp = useCallback(() => {
    history.push(myTrainingPaths.myPageEarnedStampList());
  }, []);

  const onClickRecommend = useCallback(() => {
    history.push(lecturePaths.recommend());
  }, []);

  return (
    <ContentHeader type="Learning" dataArea={Area.LEARNING_INFO}>
      <ContentHeader.Cell inner className="personal-inner">
        <ContentHeader.ProfileItem
          myPageActive={true}
          imageEditable={false}
          image={skProfile.photoFilePath || profileImg}
          name={skProfile.profileViewName}
          company={parsePolyglotString(skProfile.companyName)}
          department={parsePolyglotString(skProfile.departmentName)}
          type="Learning"
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderBadgeView
          badgeCount={issuedCount}
          onClickItem={onClickMyBadge}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderStampView
          stampCount={myStampCount}
          onClickItem={onClickMyStamp}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        <ContentHeader.LearningTimeItem
          minute={displayTotalLearningTime}
          year={currentYear}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'lecture.lectureService',
    'badge.badgeService'
  )
)(observer(MyTrainingHeaderContainer));
