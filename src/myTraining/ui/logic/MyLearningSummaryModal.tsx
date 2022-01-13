import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { MenuControlAuthService } from 'approval/stores';
import { requestCollegePercent } from 'main/sub/PersonalBoard/service/getCollegePercent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { AplService } from 'myTraining/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { SkProfileService } from 'profile/stores';
import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import InstructorLearningTimeView from '../view/InstructorLearningTimeView';
import MyCompanyCollegeTimeView from '../view/MyCompanyCollegeTimeView';
import MySuniCollegeTimeView from '../view/MySuniCollegeTimeView';

interface Props {
  trigger: React.ReactNode;
  year?: number;
  myLearningSummaryService?: MyLearningSummaryService;
  aplService?: AplService;
  personalCubeService?: PersonalCubeService;
  skProfileService?: SkProfileService;
  menuControlAuthService?: MenuControlAuthService;
}

interface State {
  openModal: boolean;
  checkedTab: TabType;
}

enum TabType {
  mySUNI = 'mySUNI',
  MyCompany = 'MyCompany',
  LectureTime = 'LectureTime',
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
class MyLearningSummaryModal extends Component<Props> {
  state: State = {
    openModal: false,
    checkedTab: TabType.mySUNI,
  };

  onOpenModal() {
    this.setState({
      openModal: true,
    });
  }

  onCloseModal() {
    this.setState({
      openModal: false,
    });
  }

  changeTomySUNI() {
    this.setState({
      checkedTab: TabType.mySUNI,
    });
  }

  changeToMyCompany() {
    this.setState({
      checkedTab: TabType.MyCompany,
    });
  }

  changeToLectureTime() {
    this.setState({
      checkedTab: TabType.LectureTime,
    });
  }

  render() {
    const { openModal, checkedTab } = this.state;
    const { trigger, myLearningSummaryService, menuControlAuthService } =
      this.props;
    const { menuControlAuth } = menuControlAuthService!;
    const {
      displayMyCompanyLearningTime,
      displayMySuniLearningTime,
      myLearningSummary,
      instructTimeSummary,
    } = myLearningSummaryService!;

    const year = moment().year();
    const today = moment(new Date()).format('YYYY.MM.DD');

    return (
      <Modal
        open={openModal}
        onClose={this.onCloseModal}
        onOpen={this.onOpenModal}
        className="base w700"
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
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="completion-time">
              <div className="table-css">
                <div className="row head">
                  <div className="cell v-middle">
                    <Icon className="total-time16" />
                    <span className="blind">total time</span>
                    <span className="text01">
                      {year}.01.01 ~ {today}
                    </span>
                  </div>
                  <div className="cell v-middle">
                    <span className="text01">
                      {checkedTab === TabType.MyCompany
                        ? getPolyglotText(
                            'My Company 학습 시간',
                            'home-학이시-mct'
                          )
                        : getPolyglotText(
                            'Category 별 학습 시간',
                            'home-학이시-cl시간'
                          )}
                    </span>
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
                            onClick={this.changeTomySUNI}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="mySUNI"
                              checked={checkedTab === TabType.mySUNI}
                              onChange={this.changeToMyCompany}
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
                            onClick={this.changeToMyCompany}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="MyCompany"
                              checked={checkedTab === TabType.MyCompany}
                              onChange={this.changeToMyCompany}
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
                              {(menuControlAuth.useApl && (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: getPolyglotText(
                                      `각 사에서 학습한 시간과 개인학습 <br />등록으로 인정받은 시간`,
                                      'home-학이시-mch1'
                                    ),
                                  }}
                                />
                              )) || (
                                <span>
                                  <PolyglotText
                                    defaultString="각 사에서 학습한 시간"
                                    id="home-학이시-mch2"
                                  />
                                </span>
                              )}
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div
                            className="ui rect-icon radio checkbox"
                            onClick={this.changeToLectureTime}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="LectureTime"
                              checked={checkedTab === TabType.LectureTime}
                              onChange={this.changeToLectureTime}
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
                      </ul>
                    </div>
                  </div>
                  <div className="cell vtop">
                    {checkedTab === TabType.mySUNI && <MySuniCollegeTimeView />}
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
                    )}{' '}
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
