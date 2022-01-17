import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import { BadgeService } from 'lecture/stores';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService, MyTrainingService } from 'myTraining/stores';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MenuControlAuthService from '../../../approval/company/present/logic/MenuControlAuthService';
import { Segment, Select } from 'semantic-ui-react';
import { MyPageBadgeLearningTimeView } from '../PersonalBoard/ui/view/MyPageBadgeLearningTimeView';
import MyPageLearningTimeDetailView from '../PersonalBoard/ui/view/MyPageLearningTimeDetailView';
import MyPageCollegeTopChartView from '../PersonalBoard/ui/view/MyPageCollegeTopChartView';
import { setCollegePercent } from '../PersonalBoard/service/getCollegePercent';
import moment from 'moment';
import MyLearningSummaryModel from '../../../myTraining/model/MyLearningSummaryModel';
import { requestBadgeLearningTime } from '../PersonalBoard/service/getBadgeLearningTime';
import BadgeLearningSummaryView from './BadgeLearningSummaryView';
import LearningTimeSummaryView from './LearningTimeSummaryView';
import StampSummaryView from './StampSummaryView';
import { findSummeryTimeByYear } from '../../../lecture/detail/api/cardApi';
import {
  initMyLearningRdo,
  MyLearningRdo,
} from '../../../lecture/detail/model/MyLearningRdo';

interface Props extends RouteComponentProps {}

interface State {
  selectYearOptions: { key: number; value: number; text: string }[];
  selectYear: number;
  isLoading: boolean;
  myLearningRdo: MyLearningRdo;
}

interface Injected {
  skProfileService: SkProfileService;
  myLearningSummaryService: MyLearningSummaryService;
  menuControlAuthService: MenuControlAuthService;
  myTrainingService: MyTrainingService;
  badgeService: BadgeService;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService',
    'approval.menuControlAuthService'
  )
)
@observer
@reactAutobind
class MyPageMyLearningSummaryContainer extends ReactComponent<
  Props,
  State,
  Injected
> {
  state: State = {
    selectYearOptions: this.makeSelectOptions(),
    selectYear: moment().year(),
    isLoading: true,
    myLearningRdo: initMyLearningRdo(),
  };

  constructor(props: Props) {
    super(props);

    this.init();
  }

  async init() {
    const { badgeService } = this.injected;

    await this.findMySummaries();
    this.makeSelectOptions();
    badgeService.findAllBadgeCount();

    this.setState({ isLoading: false });
  }

  makeSelectOptions() {
    const years = [{ key: -1, text: '전체', value: -1 }];

    const currentYear = moment().year();

    years.push({
      key: currentYear,
      text: `${currentYear}`,
      value: currentYear,
    });

    for (let i = 1; i < 4; i++) {
      const year = currentYear - i;
      years.push({ key: year, text: `${year}`, value: year });
    }

    return years;
  }

  async findMySummaries(year?: number) {
    const { skProfileService, myLearningSummaryService } = this.injected;
    const {
      getDisplayMySuniLeaningTime,
      getDisplayCompanyLearningTime,
      getDisplayTotalLearningTime,
      findInstructTimeSummary,
      findMyLearningSummaryByYear,
    } = myLearningSummaryService;

    const { skProfile } = skProfileService;

    await requestBadgeLearningTime(skProfile.companyCode);
    await findInstructTimeSummary();
    findMyLearningSummaryByYear(year).then(
      (myLearningSummary: MyLearningSummaryModel) => {
        getDisplayTotalLearningTime();
        getDisplayMySuniLeaningTime();
        getDisplayCompanyLearningTime();
        // requestCollegePercent();
        setCollegePercent(myLearningSummary.collegeLearningTimes);
      }
    );
    findSummeryTimeByYear(year || moment().year()).then((rdo) => {
      if (rdo !== undefined) {
        this.setState({ myLearningRdo: rdo });
      }
    });
  }

  async onChangeSelectYear(value: number) {
    //

    await this.findMySummaries(value);
    this.setState({ selectYear: value, isLoading: false });
  }

  render() {
    const { selectYear, selectYearOptions, myLearningRdo } = this.state;
    const {
      learningGoalHour,
      obtainedStampCountForYear,
      totalStampCount,
    } = myLearningRdo;
    const { myLearningSummaryService, badgeService } = this.injected;
    const { menuControlAuth } = MenuControlAuthService.instance;

    const {
      allBadgeCount: { issuedCount, challengingCount },
    } = badgeService;

    const {
      myLearningSummary,
      instructTimeSummary,
      displayMyCompanyLearningTime,
      displayMySuniLearningTime,
      displayTotalLearningTime,
    } = myLearningSummaryService;

    const year = selectYear === -1 ? '전체 ' : selectYear.toString();

    return (
      <>
        <div className="mypage_contents profile-dashboard-contents">
          <strong className="mypage_title">나의 학습 현황</strong>
          <div className="top-line">
            <div className="select-wrap">
              <Select
                className="ui small-border dropdown m0"
                options={selectYearOptions}
                value={selectYear}
                onChange={(event, data) =>
                  this.onChangeSelectYear(Number(data.value))
                }
              />
            </div>
          </div>

          <Segment className="full">
            <div className="group-wrapper">
              <div className="playlist-list list-wrapper">
                <div className="gauge-box-wrap">
                  <div className="main-gauge-box">
                    <BadgeLearningSummaryView
                      challengingCount={issuedCount + challengingCount}
                      issuedCount={issuedCount}
                    />
                    <StampSummaryView
                      obtainedStampCountForYear={obtainedStampCountForYear}
                      totalStampCount={totalStampCount}
                    />
                    <LearningTimeSummaryView
                      year={year}
                      learningGoalHour={learningGoalHour}
                      totalLearningTime={displayTotalLearningTime}
                    />
                  </div>
                </div>
                <div className="personal-content-wrap">
                  <div className="ui cards personal-content-box-wrap">
                    <MyPageBadgeLearningTimeView
                      year={year}
                      totalLearningTime={displayTotalLearningTime}
                    />
                  </div>
                  <div className="ui cards personal-content-box-wrap time-detail">
                    <MyPageLearningTimeDetailView
                      year={year}
                      showApl={menuControlAuth.useApl}
                      mySuniLearningTime={displayMySuniLearningTime}
                      myCompanyLearningTime={displayMyCompanyLearningTime}
                      instructorTimeSummary={instructTimeSummary}
                      aplTime={myLearningSummary && myLearningSummary.aplTime}
                    />
                    <MyPageCollegeTopChartView
                      myLearningSummary={myLearningSummary}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Segment>
        </div>
      </>
    );
  }
}

export default withRouter(MyPageMyLearningSummaryContainer);
