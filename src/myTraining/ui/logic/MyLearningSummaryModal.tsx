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
      const selectYear = year === '??????' ? 0 : parseInt(year, 10);
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
    const years = [{ key: 0, text: '??????', value: 0 }];

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
      return getPolyglotText('My Company ?????? ??????', 'home-?????????-mct');
    } else if (checkedTab === TabType.Replay) {
      return getPolyglotText('Category ??? ?????? ??????', 'home-?????????-rp??????');
    } else {
      return getPolyglotText('Category ??? ?????? ??????', 'home-?????????-cl??????');
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
            defaultString="?????? ?????? ??????"
            id="home-?????????-?????????"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="mySUNI?????? ????????? ?????? ????????? ???????????? ?????? ?????? ?????? ????????? ???????????? ???????????? ??? ????????????."
              id="home-?????????-????????????"
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
                        defaultString="(?????? : ??????)"
                        id="home-?????????-??????"
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
                                  id="home-?????????-Suni"
                                />
                                (
                                {timeToHourMinutePaddingFormat(
                                  displayMySuniLearningTime
                                )}
                                )
                              </strong>
                              <span>
                                <PolyglotText
                                  defaultString="mySUNI Category?????? ????????? ??????"
                                  id="home-?????????-mshr"
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
                                  id="home-?????????-????????????"
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
                                    `???????????? ??? ???????????? ???????????? ???????????? ??????`,
                                    'home-?????????-mch3'
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
                                  defaultString="????????????"
                                  id="home-?????????-????????????"
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
                                    `mySUNI Category??? ???????????? <br />????????? ?????? ???????????? ??????`,
                                    'home-?????????-????????????'
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
                                  defaultString="?????? ??????"
                                  id="home-?????????-????????????"
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
                                    `mySUNI Category?????? ????????? ??????`,
                                    'home-?????????-????????????decs'
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
            <PolyglotText defaultString="Close" id="home-?????????-??????" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyLearningSummaryModal;
