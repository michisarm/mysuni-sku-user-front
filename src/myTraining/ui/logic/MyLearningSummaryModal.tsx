import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';

import moment from 'moment';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { timeToHourMinute, timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';

interface Props {
  myLearningSummaryService?: MyLearningSummaryService
  trigger: React.ReactNode
  year?: number
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
    // const { suniLearningTime, myCompanyLearningTime } = myLearningSummaryService!.myLearningSummary;
    const { myLearningSummary } = myLearningSummaryService!;


    if (!(myLearningSummary.suniLearningTime + myLearningSummary.myCompanyLearningTime)) {
      return 0;
    }
    return  Math.floor((myLearningSummary.suniLearningTime-myLearningSummary.myCompanyInSuniLearningTime) / (myLearningSummary.suniLearningTime + myLearningSummary.myCompanyLearningTime) * 360);
  }

  render() {
    const { open } = this.state;
    const { trigger, myLearningSummaryService  } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;
    const { hour, minute } = timeToHourMinute(myLearningSummary.totalLearningTime);

    let total:any = null;

    if (hour < 1 && minute < 1) {
      total = (
        <div className="total">
          <span>00</span><span className="u">h</span> <span>00</span><span className="u">m</span>
        </div>
      );
    }
    else if (hour < 1) {
      total = (
        <div className="total">
          <span>{minute}</span><span className="u">m</span>
        </div>
      );
    }
    else if (minute < 1) {
      total = (
        <div className="total">
          <span>{hour}</span><span className="u">h</span>
        </div>
      );
    }
    else {
      total = (
        <div className="total">
          <span>{hour}</span><span className="u">h</span> <span>{minute}</span><span className="u">m</span>
        </div>
      );
    }

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
          <span className="sub f12">mySUNI에서 이수한 학습 시간과 자사에서 인정 받은 학습 시간을 구분하여 확인하실 수 있습니다.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="completion-time">
              <div className="table-css">
                <div className="row head">
                  <div className="cell v-middle">
                    <Icon className="total-time16" /><span className="blind">total time</span>
                    <span className="text01">{year}.01.01 ~ {today}</span>
                    <span className="text02">총 학습시간</span>
                  </div>
                  <div className="cell v-middle"><span className="text01">College 별 학습 시간</span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell vtop">
                    <div className="legend">(단위 : 시간)</div>
                    {total}
                    <div className="chart">
                      <div className="ui pie w200" data-value={this.getChartValue()}>
                        <span className="left" />
                        <span className="right" />
                      </div>
                    </div>
                    <ul className="bullet-list1">
                      <li>
                        <span className="name b1">mySUNI</span><span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.suniLearningTime-myLearningSummary.myCompanyInSuniLearningTime)}</span>
                      </li>
                      <li>
                        <span className="name b2">My company</span><span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.myCompanyLearningTime+myLearningSummary.myCompanyInSuniLearningTime)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="cell vtop">
                    <ul className="bullet-list2">
                      <li>
                        <span className="name b1">AI</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.aiCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b2">DT</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.dtCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b3">행복</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.happyCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b4">SV</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.svCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b5">혁신디자인</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.designCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b6">Global</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.globalCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b7">Leadership</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.leadershipCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b8">Management</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.managementCollegeTime)}</span>
                      </li>

                      <li>
                        <span className="name b9">반도체</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.semiconductorCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b10">SK아카데미</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.skAcademyCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b11">SK경영</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.skManagementCollegeTime)}</span>
                      </li>
                      <li>
                        <span className="name b12">Life Style</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.lifeStyleCollegeTime)}</span>
                      </li>
                      {/*0701 에너지솔루션추가*/}
                      <li>
                        <span className="name b13">에너지솔루션</span>
                        <span className="time">{timeToHourMinutePaddingFormat(myLearningSummary.lifeStyleCollegeTime)}</span>
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
