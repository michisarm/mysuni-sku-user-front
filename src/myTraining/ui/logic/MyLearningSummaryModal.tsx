import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { AplService } from 'myTraining/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { SkProfileService } from 'profile/stores';
import { MenuControlAuthService } from 'approval/stores';
import { SkProfileModel } from 'profile/model';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';


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
  open: boolean;
  checkedTab: ModalTabType;
}

enum ModalTabType {
  mySUNI = 'mySUNI',
  MyCompany = 'MyCompany',
  LectureTime = 'LectureTime'
}

@inject(mobxHelper.injectFrom(
  'myTraining.myLearningSummaryService',
  'myTraining.aplService',
  'personalCube.personalCubeService',
  'profile.skProfileService',
  'approval.menuControlAuthService'
))
@observer
@reactAutobind
class MyLearningSummaryModal extends Component<Props> {

  /* states */
  state: State = {
    open: false,
    checkedTab: ModalTabType.mySUNI
  };

  /* effects */

  //  모달이 open 되었을 때만 학습시간을 조회함. 2020.10.28 by 김동구
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    const { myLearningSummaryService, year } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;

    const { open } = this.state;
    const { open: prevOpen } = prevState;

    if (prevOpen !== open && open) {
      /* 
        totalMyLearningSummary 는 MainPage 진입 시 조회가 되어 store 에 저장되므로
        MainPage 를 통해서가 아닌 MyPage 로 바로 진입한 경우, ( 새로고침 )
        totalMyLearningSummary 는 조회되지 않으며, 확인 후 다시 조회를 해야함. 2020.10.28 by 김동구
      */
      if (myLearningSummary.year === 0 && year) {
        myLearningSummaryService!.findMyLearningSummaryByYear(year);
      }
    }

    this.getMenuAuth();
  }

  /* funcitons */
  async getMenuAuth() {
    const { skProfileService, menuControlAuthService } = this.props;
    const { skProfile } = skProfileService!;

    if (!skProfile) {
      const profile: SkProfileModel = await skProfileService!.findSkProfile();
      menuControlAuthService!.findMenuControlAuth(profile.member.companyCode);
    }
  }

  /* handlers */
  onOpenModal() {
    this.setState({
      open: true,
    });
  }

  onCloseModal() {
    this.setState({
      open: false,
    });
  }

  // 인라인 event handler 를 피하기 위해 type 별 각각 정의함. 2020.10.28 by 김동구
  changeTomySUNI() {
    this.setState({
      checkedTab: ModalTabType.mySUNI
    });
  }

  changeToMyCompany() {
    this.setState({
      checkedTab: ModalTabType.MyCompany
    });
  }

  changeToLectureTime() {
    this.setState({
      checkedTab: ModalTabType.LectureTime
    });
  }

  /* render functions */
  renderLearningTimeByTab() {
    const { myLearningSummaryService, menuControlAuthService, year } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;
    const { menuControlAuth } = menuControlAuthService!;
    const { checkedTab } = this.state;

    /* MyCompany  */
    if (checkedTab === ModalTabType.MyCompany) {
      return (
        <ul className="bullet-list2">
          <li>
            <span className="name">관계사 학습시간</span>
            <span className="time">
              {timeToHourMinutePaddingFormat(
                myLearningSummary.totalMyCompanyLearningTime
              )}
            </span>
          </li>
          {/* company code 가 존재할 시, 보여주지 말라! */}
          {menuControlAuth.companyCode === '' && (
            <li>
              <span className="name">개인 학습시간</span>
              <span className="time">
                {timeToHourMinutePaddingFormat(
                  myLearningSummary.aplAllowTime
                )}
              </span>
            </li>
          )}
        </ul>
      );
    }

    /* mySUNI & 강의시간 */
    return (
      <ul className="bullet-list2">
        <li>
          <span className="name b1">AI</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.aiCollegeTime : myLearningSummary.lectureTimeSummary.aiCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b2">DT</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.dtCollegeTime : myLearningSummary.lectureTimeSummary.dtCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b3">행복</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.happyCollegeTime : myLearningSummary.lectureTimeSummary.happyCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b4">SV</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.svCollegeTime : myLearningSummary.lectureTimeSummary.svCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b5">혁신디자인</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.designCollegeTime : myLearningSummary.lectureTimeSummary.designCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b6">Global</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.globalCollegeTime : myLearningSummary.lectureTimeSummary.globalCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b7">Leadership</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.leadershipCollegeTime : myLearningSummary.lectureTimeSummary.leadershipCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b8">Management</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.managementCollegeTime : myLearningSummary.lectureTimeSummary.managementCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b9">반도체</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.semiconductorCollegeTime : myLearningSummary.lectureTimeSummary.semiconductorCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b13">에너지 솔루션</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.energySolutionCollegeTime : myLearningSummary.lectureTimeSummary.energySolutionCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b10">SK아카데미</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.skAcademyCollegeTime : myLearningSummary.lectureTimeSummary.skAcademyCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b11">SK경영</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.skManagementCollegeTime : myLearningSummary.lectureTimeSummary.skManagementCollegeTime
            )}
          </span>
        </li>
        <li>
          <span className="name b12">Life Style</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(
              checkedTab === ModalTabType.mySUNI ? myLearningSummary.lifeStyleCollegeTime : myLearningSummary.lectureTimeSummary.lifeStyleCollegeTime
            )}
          </span>
        </li>
      </ul>
    );
  }

  /* render */
  render() {
    const { open, checkedTab } = this.state;
    const { trigger, myLearningSummaryService, menuControlAuthService } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;
    const { menuControlAuth: { companyCode } } = menuControlAuthService!;

    /* companyCode 가 존재할 때는 개인학습 시간을 포함하지 않음. */
    const totalMyCompanyAplAllowTime = companyCode === '' ?
      myLearningSummary.totalMyCompanyLearningTime + myLearningSummary.aplAllowTime : myLearningSummary.totalMyCompanyLearningTime;

    // totalLearningTime 을 display 하는 영역은 확인되지 않음. 
    // 확인될 경우, 주석을 풀고 total 변수 를 해당 영역에 display 하면 됨. 2020.10.28 by 김동구
    /* 
      const { hour, minute } = timeToHourMinute(
        totalMyLearningSummary.totalLearningTime
      ); 
    */

    /* 
      let total: any = null;
 
      if (hour < 1 && minute < 1) {
        total = (
          <div className="total">
            <span>00</span>
            <span className="u">h</span> <span>00</span>
            <span className="u">m</span>
          </div>
        );
      } else if (hour < 1) {
        total = (
          <div className="total">
            <span>{minute}</span>
            <span className="u">m</span>
          </div>
        );
      } else if (minute < 1) {
        total = (
          <div className="total">
            <span>{hour}</span>
            <span className="u">h</span>
          </div>
        );
      } else {
        total = (
          <div className="total">
            <span>{hour}</span>
            <span className="u">h</span> <span>{minute}</span>
            <span className="u">m</span>
          </div>
        );
      } 
    */

    let today = moment(new Date()).format('YYYY.MM.DD');
    let year: number = new Date().getFullYear();

    if (this.props.year && year !== this.props.year) {
      year = this.props.year;
      today = `${this.props.year}.12.31`;
    }

    return (
      <Modal
        open={open}
        onClose={this.onCloseModal}
        onOpen={this.onOpenModal}
        className="base w700"
        trigger={trigger}
      >
        <Modal.Header className="res">
          학습 이수 시간
          <span className="sub f12">
            mySUNI에서 이수한 학습 시간과 자사에서 인정 받은 학습 시간을
            구분하여 확인하실 수 있습니다.
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
                    <span className="text02">총 학습시간</span>
                  </div>
                  <div className="cell v-middle">
                    <span className="text01">{checkedTab !== ModalTabType.MyCompany ? 'College 별 학습 시간' : 'My Company 학습 시간'}</span>
                    <span className="text02">(단위 : 시간)</span>
                  </div>Y
                </div>
                <div className="row">
                  <div className="cell vtop">
                    <div className="radio-wrap">
                      <ul>
                        <li>
                          <div className="ui rect-icon radio checkbox" onClick={this.changeTomySUNI}>
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="mySUNI"
                              checked={checkedTab === ModalTabType.mySUNI}
                              onChange={this.changeToMyCompany}
                            />
                            <label>
                              <strong>
                                mySUNI ({timeToHourMinutePaddingFormat(
                                myLearningSummary.totalSuniLearningTime)})
                              </strong>
                              <span>mySUNI College에서 학습한 시간</span>
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div className="ui rect-icon radio checkbox" onClick={this.changeToMyCompany}>
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="MyCompany"
                              checked={checkedTab === ModalTabType.MyCompany}
                              onChange={this.changeToMyCompany}
                            />
                            <label>
                              <strong>
                                My Company ({timeToHourMinutePaddingFormat(
                                totalMyCompanyAplAllowTime)})
                              </strong>
                              <span>각 사에서 학습한 시간과 개인학습 <br />등록으로 인정받은 시간</span>
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                        <li>
                          <div className="ui rect-icon radio checkbox" onClick={this.changeToLectureTime}>
                            <input
                              className="hidden"
                              type="radio"
                              name="rect"
                              value="LectureTime"
                              checked={checkedTab === ModalTabType.LectureTime}
                              onChange={this.changeToLectureTime}
                            />
                            <label>
                              <strong>
                                강의시간 ({timeToHourMinutePaddingFormat(myLearningSummary.lectureTimeSummary && myLearningSummary.lectureTimeSummary.totalCollegeTime)})
                              </strong>
                              <span>mySUNI College와 각사에서 <br />강의를 통해 인정받은 시간</span>
                            </label>
                            <span className="buri" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="cell vtop">
                    {this.renderLearningTimeByTab()} {/* 탭 별로 학습 시간을 display 함. */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.onCloseModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyLearningSummaryModal;

// 개편되는 MyLearningSummaryModal 에는 차트를 보여주지 않음.
/* getChartValue() {
  //
  const { myLearningSummaryService } = this.props;
  // const { suniLearningTime, myCompanyLearningTime } = myLearningSummaryService!.myLearningSummary;
  const { myLearningSummary } = myLearningSummaryService!;

  if (
    !(
      myLearningSummary.suniLearningTime +
      myLearningSummary.myCompanyLearningTime
    )
  ) {
    return 0;
  }
  return Math.floor(
    ((myLearningSummary.suniLearningTime -
      myLearningSummary.myCompanyInSuniLearningTime) /
      (myLearningSummary.suniLearningTime +
        myLearningSummary.myCompanyLearningTime)) *
    360
  );
} */