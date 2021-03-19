import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { MyLearningSummaryService } from 'myTraining/stores';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';


interface Props extends RouteComponentProps {
  activeIndex: number;
  myLearningSummaryService?: MyLearningSummaryService;
}

const BadgeLearningTimeView: React.FC<Props> = Props => {

  const { activeIndex, history, myLearningSummaryService } = Props;

  const { myLearningSummary } = myLearningSummaryService!;
  
  const badgeLearningTimeItem = useBadgeLearningTimeItem()

  const goToBadge = useCallback(() => {
    history.push('/certification/badge/EarnedBadgeList/pages/1')
  }, [])

  const goToLearning = useCallback(() => {
    history.push('/my-training/learning/Completed/pages/1')
  }, [])

  const getHourMinute = useCallback((minuteTime: number) => {
    //
    let hour = 0;
    let minute = minuteTime;

    if (minuteTime) {
      hour = Math.floor(minuteTime / 60);
      minute = minuteTime % 60;
    }
    return { hour, minute };
  }, [])

  const { hour, minute } = getHourMinute(myLearningSummary.displayTotalLearningTime)

  return (
    <>
    {badgeLearningTimeItem &&(
      <>
      <div className="personal-card">
        <div className="personal-card-item">
          <div className="card-item-tit">
            <a className="card-item-link" onClick={goToBadge}><h3>Badges</h3></a>
            <span>보유중인 전체 Badge 갯수</span>
          </div>
          <div className="card-item-con">
            <div className="card-gauge-bar color-sv">
              <div className="gauge-tit">MY Badges</div>
              <div className="card-gauge-bar sty2 color-sv">
                <div className="rangeBox">
                  <div className="range">
                    <div
                      style={activeIndex === -1 ? {width:0} : {
                        width: `${(badgeLearningTimeItem.badgeMyCount/badgeLearningTimeItem.AllBadgeMyCount)*100}%`,
                      } }
                      className="percent"
                    />
                  </div>
                </div>
              </div>
              <span className="gauge-number">
                <strong>{badgeLearningTimeItem.badgeMyCount ? badgeLearningTimeItem.badgeMyCount : 0}</strong>개
              </span>
            </div>
            <div className="card-gauge-bar">
              <span className="gauge-tit">우리 회사 평균</span>
              <div className="card-gauge-bar sty2">
                <div className="rangeBox">
                  <div className="range">
                    <div
                      style={activeIndex === -1 ? {width:0} : {
                        width: `${(badgeLearningTimeItem.companyAvgBadgeCount/badgeLearningTimeItem.allCompanyAvgBadgeCount)*100}%`,
                      }}
                      className="percent"
                    />
                  </div>
                </div>
              </div>
              <span className="gauge-number">
                <strong>{badgeLearningTimeItem.companyAvgBadgeCount ? badgeLearningTimeItem.companyAvgBadgeCount : 0}</strong>개
              </span>
            </div>
          </div>
        </div>
        <div className="personal-card-item">
          <div className="card-item-tit">
            <a className="card-item-link" onClick={goToLearning}><h3>학습 시간</h3></a>
            <span>{moment().year()}년 완료 학습</span>
          </div>
          <div className="card-item-con">
            <div className="card-gauge-bar color-manage">
              <span className="gauge-tit">MY 학습시간</span>
              <div className="card-gauge-bar sty2 color-manage">
                <div className="rangeBox">
                  <div className="range">
                    <div
                      style={activeIndex === -1 ? {width:0} : {
                        width: `${myLearningSummary.displayTotalLearningTime > badgeLearningTimeItem.companyAvglearningTime ? (myLearningSummary.displayTotalLearningTime/(myLearningSummary.displayTotalLearningTime*1.1))*100 : (myLearningSummary.displayTotalLearningTime/(badgeLearningTimeItem.companyAvglearningTime*1.1))*100}%`,
                      }}
                      className="percent"
                    />
                  </div>
                </div>
              </div>
              <span className="gauge-number">
                <div>
                  <strong>
                    {hour ? hour : 0}
                  </strong>
                  h&nbsp;
                  <strong>
                    {minute ? minute : 0}
                  </strong>
                  m
                </div>
              </span>
            </div>
            <div className="card-gauge-bar">
              <span className="gauge-tit">우리 회사 평균</span>
              <div className="card-gauge-bar sty2">
                <div className="rangeBox">
                  <div className="range">
                    <div
                      style={activeIndex === -1 ? {width:0} : {
                        width: `${myLearningSummary.displayTotalLearningTime > badgeLearningTimeItem.companyAvglearningTime ? (badgeLearningTimeItem.companyAvglearningTime/(myLearningSummary.displayTotalLearningTime*1.1))*100 : (badgeLearningTimeItem.companyAvglearningTime/(badgeLearningTimeItem.companyAvglearningTime*1.1))*100}%`,
                      }}
                      className="percent"
                    />
                  </div>
                </div>
              </div>
              <span className="gauge-number">
                <strong>{badgeLearningTimeItem.companyAvglearningTime ? Math.floor(badgeLearningTimeItem.companyAvglearningTime / 60) : 0}</strong>h&nbsp;<strong>{badgeLearningTimeItem.companyAvglearningTime ? badgeLearningTimeItem.companyAvglearningTime % 60 : 0}</strong>m
              </span>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
}

export default inject(mobxHelper.injectFrom(
    'myTraining.myLearningSummaryService',
  )
)(withRouter(observer(BadgeLearningTimeView)));
