import {
  mobxHelper,
  reactAutobind,
  ReactComponent,
} from '@nara.platform/accent';
import { MenuControlAuthService } from 'approval/stores';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { AplService } from 'myTraining/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { SkProfileService } from 'profile/stores';
import React from 'react';
import { Button, Icon, Modal, Select } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import InstructorLearningTimeView from '../view/InstructorLearningTimeView';
import MyCompanyCollegeTimeView from '../view/MyCompanyCollegeTimeView';
import MySuniCollegeTimeView from '../view/MySuniCollegeTimeView';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import {
  initMyLearningSummaryModalModel,
  MyLearningSummaryModalModel,
} from '../model/MyLearningSummaryModalModel';
import ReplayMyLearningTimeView from '../view/table/ReplayMyLearningTimeView';

interface Props {
  trigger: React.ReactNode;
  year?: string;
}

interface State {
  selectYearOptions: { key: number; value: number; text: string }[];
  selectYear: number;
  openModal: boolean;
  checkedTab: TabType;
  myLearningSummaryModalModel: MyLearningSummaryModalModel;
}

interface Injected {
  myLearningSummaryService: MyLearningSummaryService;
  aplService: AplService;
  personalCubeService: PersonalCubeService;
  skProfileService: SkProfileService;
  menuControlAuthService: MenuControlAuthService;
}

enum TabType {
  None = 'none',
  mySUNI = 'mySUNI',
  MyCompany = 'MyCompany',
  LectureTime = 'LectureTime',
  Replay = 'Replay',
}

@inject(
  mobxHelper.injectFrom(
    'myTraining.myLearningSummaryService',
    'myTraining.aplService',
    'personalCube.personalCubeService',
    'profile.skProfileService',
    'approval.menuControlAuthService'
  )
)
@observer
@reactAutobind
class MyLearningSummaryModal extends ReactComponent<Props, State, Injected> {
  state: State = {
    openModal: false,
    checkedTab: TabType.mySUNI,
    selectYearOptions: this.makeSelectOptions(),
    selectYear: moment().year(),
    myLearningSummaryModalModel: initMyLearningSummaryModalModel(),
  };

  onOpenModal() {
    const { myLearningSummaryService } = this.injected;
    const { year } = this.props;

    const {
      getDisplayMySuniLeaningTime,
      getDisplayCompanyLearningTime,
      getDisplayReplayLeaningTime,
      myLearningSummary,
      instructTimeSummary,
    } = myLearningSummaryService;

    const emptyMyLearningSummaryModalModel: MyLearningSummaryModalModel =
      initMyLearningSummaryModalModel();
    emptyMyLearningSummaryModalModel.displayMySuniLearningTime =
      getDisplayMySuniLeaningTime();
    emptyMyLearningSummaryModalModel.displayMyCompanyLearningTime =
      getDisplayCompanyLearningTime();
    emptyMyLearningSummaryModalModel.displayMyReplayLearningTime =
      getDisplayReplayLeaningTime();
    emptyMyLearningSummaryModalModel.myLearningSummary = myLearningSummary;
    emptyMyLearningSummaryModalModel.instructTimeSummary = instructTimeSummary;

    this.setState({
      openModal: true,
      myLearningSummaryModalModel: emptyMyLearningSummaryModalModel,
    });

    if (year) {
      const selectYear = year === '전체' ? 0 : parseInt(year, 10);
      this.setState({ selectYear });
    } else {
      this.setState({ selectYear: moment().year() });
    }
  }

  onCloseModal() {
    this.setState({
      openModal: false,
    });
  }

  changeToTab(tabType: TabType) {
    //
    this.setState({ checkedTab: tabType });
  }

  getDateText() {
    //
    const { selectYear } = this.state;
    const currentYear = moment().year();
    const today = moment(new Date()).format('YYYY.MM.DD');

    if (selectYear === undefined || selectYear === currentYear)
      return `${currentYear}.01.01 ~ ${today}`;

    if (selectYear === 0) {
      return `2019.12.01 ~ ${today}`;
    } else {
      return `${selectYear}.01.01 ~ ${selectYear}.12.31`;
    }
  }

  makeSelectOptions() {
    const years = [{ key: 0, text: '전체', value: 0 }];

    const currentYear = moment().year();

    years.push({
      key: currentYear,
      text: `${currentYear}`,
      value: currentYear,
    });

    for (let i = 1; i < 4; i++) {
      const year = currentYear - i;
      if (year === 2019) break;
      years.push({ key: year, text: `${year}`, value: year });
    }

    return years;
  }

  async onChangeSelectYear(value: number) {
    //
    await this.findMySummaries(value);
    this.setState({ selectYear: value });
  }

  async findMySummaries(year?: number, init?: boolean) {
    const { checkedTab } = this.state;
    const { myLearningSummaryService } = this.injected;
    const {
      getDisplayMySuniLeaningTime,
      getDisplayCompanyLearningTime,
      getDisplayReplayLeaningTime,
      findInstructTimeSummary,
      findMyLearningSummaryModalByYear,
    } = myLearningSummaryService;

    const instructTimeSummary = await findInstructTimeSummary(year, true);
    findMyLearningSummaryModalByYear(year === 0 ? -1 : year).then(
      (myLearningSummary: MyLearningSummaryModel) => {
        // getCollegePercent(myLearningSummary.collegeLearningTimes);

        const emptyMyLearningSummaryModalModel: MyLearningSummaryModalModel =
          initMyLearningSummaryModalModel();
        emptyMyLearningSummaryModalModel.displayMySuniLearningTime =
          getDisplayMySuniLeaningTime(myLearningSummary);
        emptyMyLearningSummaryModalModel.displayMyCompanyLearningTime =
          getDisplayCompanyLearningTime(myLearningSummary);
        emptyMyLearningSummaryModalModel.displayMyReplayLearningTime =
          getDisplayReplayLeaningTime(myLearningSummary);
        emptyMyLearningSummaryModalModel.myLearningSummary = myLearningSummary;
        emptyMyLearningSummaryModalModel.instructTimeSummary =
          instructTimeSummary;

        const prevCheckTab = checkedTab;
        this.setState({
          checkedTab: TabType.None,
          myLearningSummaryModalModel: emptyMyLearningSummaryModalModel,
        });

        this.changeToTab(prevCheckTab);
      }
    );
  }

  getTabHeaderText() {
    //
    const { checkedTab } = this.state;

    if (checkedTab === TabType.MyCompany) {
      return getPolyglotText('My Company 학습 시간', 'home-학이시-mct');
    } else if (checkedTab === TabType.Replay) {
      return getPolyglotText('Category 별 복습 시간', 'home-학이시-rp시간');
    } else {
      return getPolyglotText('Category 별 학습 시간', 'home-학이시-cl시간');
    }
  }

  render() {
    const {
      openModal,
      checkedTab,
      selectYearOptions,
      selectYear,
      myLearningSummaryModalModel,
    } = this.state;
    const { trigger } = this.props;
    const { menuControlAuthService } = this.injected;
    const { menuControlAuth } = menuControlAuthService;
    const {
      displayMyCompanyLearningTime,
      displayMySuniLearningTime,
      displayMyReplayLearningTime,
      myLearningSummary,
      instructTimeSummary,
    } = myLearningSummaryModalModel;

    return (
      <Modal
        open={openModal}
        onClose={this.onCloseModal}
        onOpen={this.onOpenModal}
        className="base w700 cpl-modal"
        trigger={trigger}
      >
        <Modal.Header className="res">
          <PolyglotText
            defaultString="학습 이수 시간"
            id="home-학이시-타이틀"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="mySUNI에서 이수한 학습 시간과 자사에서 인정 받은 학습 시간을 구분하여 확인하실 수 있습니다."
              id="home-학이시-부가설명"
            />
          </span>
          <Select
            className="small-border sl-year"
            options={selectYearOptions}
            value={selectYear}
            onChange={(event, data) =>
              this.onChangeSelectYear(Number(data.value))
            }
          />
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="completion-time">
              <div className="table-css">
                <div className="row head">
                  <div className="cell v-middle">
                    <Icon className="total-time16" />
                    <span className="blind">total time</span>
                    <span className="text01">{this.getDateText()}</span>
                  </div>
                  <div className="cell v-middle">
                    <span className="text01">{this.getTabHeaderText()}</span>
                    <span className="text02">
                      <PolyglotText
                        defaultString="(단위 : 시간)"
                        id="home-학이시-단위"
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell vtop">
                    <div className="radio-wrap">
                      <ul>
                        <li>
                          <div
                            className="ui rect-icon radio checkbox"
                            onClick={() => this.changeToTab(TabType.mySUNI)}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="mySUNI"
                              checked={checkedTab === TabType.mySUNI}
                            />
                            <label>
                              <strong>
                                <PolyglotText
                                  defaultString="mySUNI"
                                  id="home-학이시-Suni"
                                />
                                (
                                {timeToHourMinutePaddingFormat(
                                  displayMySuniLearningTime
                                )}
                                )
                              </strong>
                              <span>
                                <PolyglotText
                                  defaultString="mySUNI Category에서 학습한 시간"
                                  id="home-학이시-mshr"
                                />
                              </span>
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div
                            className="ui rect-icon radio checkbox"
                            onClick={() => this.changeToTab(TabType.MyCompany)}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="MyCompany"
                              checked={checkedTab === TabType.MyCompany}
                            />
                            <label>
                              <strong>
                                <PolyglotText
                                  defaultString="My Company"
                                  id="home-학이시-마컴패니"
                                />
                                (
                                {timeToHourMinutePaddingFormat(
                                  displayMyCompanyLearningTime +
                                    ((menuControlAuth.useApl &&
                                      myLearningSummary &&
                                      myLearningSummary.aplTime) ||
                                      0)
                                )}
                                )
                              </strong>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: getPolyglotText(
                                    `사내과정 및 개인학습 등록으로 인정받은 시간`,
                                    'home-학이시-mch3'
                                  ),
                                }}
                              />
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div
                            className="ui rect-icon radio checkbox"
                            onClick={() =>
                              this.changeToTab(TabType.LectureTime)
                            }
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="LectureTime"
                              checked={checkedTab === TabType.LectureTime}
                            />
                            <label>
                              <strong>
                                <PolyglotText
                                  defaultString="강의시간"
                                  id="home-학이시-강의시간"
                                />
                                (
                                {timeToHourMinutePaddingFormat(
                                  (instructTimeSummary &&
                                    instructTimeSummary.sumOfCurrentYearInstructorLearningTime) ||
                                    0
                                )}
                                )
                              </strong>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: getPolyglotText(
                                    `mySUNI Category와 각사에서 <br />강의를 통해 인정받은 시간`,
                                    'home-학이시-강의인정'
                                  ),
                                }}
                              />
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div
                            className="ui rect-icon radio checkbox"
                            onClick={() => this.changeToTab(TabType.Replay)}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="LectureTime"
                              checked={checkedTab === TabType.Replay}
                            />
                            <label>
                              <strong>
                                <PolyglotText
                                  defaultString="복습 시간"
                                  id="home-학이시-복습시간"
                                />
                                (
                                {timeToHourMinutePaddingFormat(
                                  displayMyReplayLearningTime
                                )}
                                )
                              </strong>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: getPolyglotText(
                                    `mySUNI Category에서 복습한 시간`,
                                    'home-학이시-복습시간decs'
                                  ),
                                }}
                              />
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="cell vtop">
                    {checkedTab === TabType.mySUNI && (
                      <MySuniCollegeTimeView
                        collegeLearningTimes={
                          myLearningSummary.collegeLearningTimes
                        }
                      />
                    )}
                    {checkedTab === TabType.MyCompany && (
                      <MyCompanyCollegeTimeView
                        myCompanyLearningTime={displayMyCompanyLearningTime}
                        aplTime={
                          (myLearningSummary && myLearningSummary.aplTime) || 0
                        }
                        menuControlAuth={menuControlAuth}
                      />
                    )}
                    {checkedTab === TabType.LectureTime && (
                      <InstructorLearningTimeView
                        instructorLearningTimeSummary={instructTimeSummary}
                      />
                    )}
                    {checkedTab === TabType.Replay && (
                      <ReplayMyLearningTimeView
                        replayLearningTimes={
                          myLearningSummary.replayLearningTimes
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.onCloseModal}>
            <PolyglotText defaultString="Close" id="home-학이시-닫기" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyLearningSummaryModal;
