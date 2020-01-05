import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';

import moment from 'moment';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { timeToHourMinute } from 'shared/helper/dateTimeHelper';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';

interface Props {
  myLearningSummaryService?: MyLearningSummaryService
  trigger: React.ReactNode
}

@inject(mobxHelper.injectFrom(
  'myTraining.myLearningSummaryService',
))
@observer
@reactAutobind
class MyLearningSummaryModal extends Component<Props> {
  //
  state = {
    open: false,
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummary();
  }

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

  getChartValue() {
    //
    const { myLearningSummaryService } = this.props;
    const { suniLearningTime, myCompanyLearningTime } = myLearningSummaryService!.myLearningSummary;


    if (!(suniLearningTime + myCompanyLearningTime)) {
      return 0;
    }
    return  Math.floor(suniLearningTime / (suniLearningTime + myCompanyLearningTime) * 360);
  }

  render() {
    const { open } = this.state;
    const { trigger, myLearningSummaryService  } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;
    const { hour, minute } = timeToHourMinute(myLearningSummary.totalLearningTime);
    const { hour: suniHour, minute: suniMinute } = timeToHourMinute(myLearningSummary.suniLearningTime);
    const { hour: compHour, minute: compMinute } = timeToHourMinute(myLearningSummary.myCompanyLearningTime);
    const { hour: aiHour, minute: aiMinute } = timeToHourMinute(myLearningSummary.aiCollegeTime);
    const { hour: dtHour, minute: dtMinute } = timeToHourMinute(myLearningSummary.dtCollegeTime);
    const { hour: happyHour, minute: happyMinute } = timeToHourMinute(myLearningSummary.happyCollegeTime);
    const { hour: svHour, minute: svMinute } = timeToHourMinute(myLearningSummary.svCollegeTime);
    const { hour: designHour, minute: designMinute } = timeToHourMinute(myLearningSummary.designCollegeTime);
    const { hour: globalHour, minute: globalMinute } = timeToHourMinute(myLearningSummary.globalCollegeTime);
    const { hour: leadershipHour, minute: leadershipMinute } = timeToHourMinute(myLearningSummary.leadershipCollegeTime);
    const { hour: managementHour, minute: managementMinute } = timeToHourMinute(myLearningSummary.managementCollegeTime);

    const today = moment(new Date()).format('YYYY.MM.DD');

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
          <span className="sub f12">mySUNI에서 이수한 학습 시간과 자사에서 인정 받은 학습 시간을 구분하여 확인하실 수 있습니다.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="completion-time">
              <div className="table-css">
                <div className="row head">
                  <div className="cell v-middle">
                    <Icon className="total-time16" /><span className="blind">total time</span>
                    <span className="text01">{myLearningSummary.year}.01.01 ~ {today}</span>
                    <span className="text02">총 학습시간</span>
                  </div>
                  <div className="cell v-middle"><span className="text01">College 별 학습 시간</span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell vtop">
                    <div className="legend">(단위 : 시간)</div>
                    <div className="total">
                      <span>{hour || '00'}</span><span className="u">h</span>
                      <span>{minute || '00'}</span><span className="u">m</span>
                    </div>
                    <div className="chart">
                      <div className="ui pie w200" data-value={this.getChartValue()}>
                        <span className="left" />
                        <span className="right" />
                      </div>
                    </div>
                    <ul className="bullet-list1">
                      <li>
                        <span className="name b1">mySUNI</span><span className="time">{suniHour || '00'}h {suniMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b2">My company</span><span className="time">{compHour || '00'}h {compMinute || '00'}m</span>
                      </li>
                    </ul>
                  </div>
                  <div className="cell vtop">
                    <ul className="bullet-list2">
                      <li>
                        <span className="name b1">AI</span>
                        <span className="time">{aiHour || '00'}h {aiMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b2">DT</span>
                        <span className="time">{dtHour || '00'}h {dtMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b3">행복</span>
                        <span className="time">{happyHour || '00'}h {happyMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b4">SV</span>
                        <span className="time">{svHour || '00'}h {svMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b5">혁신디자인</span>
                        <span className="time">{designHour || '00'}h {designMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b6">Global</span>
                        <span className="time">{globalHour || '00'}h {globalMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b7">Leadership</span>
                        <span className="time">{leadershipHour || '00'}h {leadershipMinute || '00'}m</span>
                      </li>
                      <li>
                        <span className="name b8">Management</span>
                        <span className="time">{managementHour || '00'}h {managementMinute || '00'}m</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={this.onCloseModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MyLearningSummaryModal;
