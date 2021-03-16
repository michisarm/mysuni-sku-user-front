import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';


interface Props extends RouteComponentProps {
  activeIndex: number;
}

const BadgeLearningTimeView: React.FC<Props> = Props => {

  const { activeIndex, history } = Props;
  const badgeLearningTimeItem = useBadgeLearningTimeItem()
  const [allLearningTime, setAllLearningTime] = useState(0);

  useEffect(() => {
    if(badgeLearningTimeItem === undefined) {
      return
    } 
    if(badgeLearningTimeItem!.mylearningTimeHour !== 0) {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeHour*60 + badgeLearningTimeItem!.mylearningTimeMinute)
    } else {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeMinute)
    }
  }, [badgeLearningTimeItem])

  const goToBadge = useCallback(() => {
    history.push('/certification/badge/EarnedBadgeList/pages/1')
  }, [])

  return (
    <>
    {badgeLearningTimeItem &&(
      <>
      <div className="personal-card">
        <div className="personal-card-item">
          <div className="card-item-tit">
            <h3>Badges</h3>
            <span>보유중인 전체 Badge 갯수</span>
          </div>
          <div className="card-item-con">
            <div className="card-gauge-bar color-sv">
              <a className="gauge-tit" onClick={goToBadge}>MY Badges</a>
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
            <h3>학습 시간</h3>
            <span>진행중인 전체 학습시간</span>
          </div>
          <div className="card-item-con">
            <div className="card-gauge-bar color-manage">
                    <span className="gauge-tit">MY 학습시간</span>
              <div className="card-gauge-bar sty2 color-manage">
                <div className="rangeBox">
                  <div className="range">
                    <div
                      style={activeIndex === -1 ? {width:0} : {
                        width: `${allLearningTime > badgeLearningTimeItem.companyAvglearningTime ? (allLearningTime/(allLearningTime*1.1))*100 : (allLearningTime/(badgeLearningTimeItem.companyAvglearningTime*1.1))*100}%`,
                      }}
                      className="percent"
                    />
                  </div>
                </div>
              </div>
              <span className="gauge-number">
                <div>
                  <strong>
                    {badgeLearningTimeItem!.mylearningTimeHour ? badgeLearningTimeItem!.mylearningTimeHour : 0}
                  </strong>
                  h&nbsp;
                  <strong>
                    {badgeLearningTimeItem!.mylearningTimeMinute ? badgeLearningTimeItem!.mylearningTimeMinute : 0}
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
                        width: `${allLearningTime > badgeLearningTimeItem.companyAvglearningTime ? (badgeLearningTimeItem.companyAvglearningTime/(allLearningTime*1.1))*100 : (badgeLearningTimeItem.companyAvglearningTime/(badgeLearningTimeItem.companyAvglearningTime*1.1))*100}%`,
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
      {/* 데이터 정리 */}
      {/* <div style={{border: '2px solid', borderColor: 'red'}}>
        <span>Badges</span><br/>
        <span>My Badges :{badgeLearningTimeItem.badgeMyCount}</span><br/>
        <span>전체뱃지갯수 :{badgeLearningTimeItem.AllBadgeMyCount}</span><br/>
        <span>우리회사평균 뱃지갯수 :{badgeLearningTimeItem.companyAvgBadgeCount}</span><br/>
        <span>우리회사평균 전체뱃지갯수평균 :{badgeLearningTimeItem.allCompanyAvgBadgeCount}</span><br/>
        <span>MY 학습시간 :{allLearningTime}</span><br/>
        <span>전체 MY 학습시간 : MY와 우리회사평균 비교하여 큰값의 +10%{badgeLearningTimeItem.allMylearningTime}</span><br/>
        <span>우리회사평균 학습시간 :{badgeLearningTimeItem.companyAvglearningTime}</span><br/>
        <span>전체 우리회사평균 학습시간 : MY와 우리회사평균 비교하여 큰값의 +10%{badgeLearningTimeItem.allCompanyAvglearningTime}</span><br/>
      </div> */}
      </>
    )}
    </>
  );
}

export default inject(
)(withRouter(observer(BadgeLearningTimeView)));
