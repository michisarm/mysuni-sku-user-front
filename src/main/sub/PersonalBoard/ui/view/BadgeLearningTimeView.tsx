import React, { useEffect, useState } from 'react';
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';
import ProgressBar from '../logic/ProgressBar'

const BadgeLearningTimeView: React.FC = function BadgeLearningTimeView() {

  const badgeLearningTimeItem = useBadgeLearningTimeItem()
  const [allLearningTime, setAllLearningTime] = useState('');

  useEffect(() => {
    if(badgeLearningTimeItem === undefined) {
      return
    } 
    console.log('$$$$$$$$$$4badgeLearningTimeItem', badgeLearningTimeItem)

    if(badgeLearningTimeItem!.mylearningTimeHour !== 0) {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeHour + 'h ' +  badgeLearningTimeItem!.mylearningTimeMinute + 'm')
    } else {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeMinute + 'm')
    }
  }, [badgeLearningTimeItem])

  return (
    <>
    {badgeLearningTimeItem && allLearningTime !== '' &&(
      <>
      <div className="personal-card">
        <div className="personal-card-item">
          <div className="card-item-tit">
            <h3>Badges</h3>
            <span>보유중인 전체 Badge 갯수</span>
          </div>
          <div className="card-item-con">
            <div className="card-gauge-bar color-sv">
              <span className="gauge-tit">MY Badges</span>
              <Progress percent={(badgeLearningTimeItem.badgeMyCount/badgeLearningTimeItem.AllBadgeMyCount * 100)} />
              <span className="gauge-number">
                <strong>{badgeLearningTimeItem.badgeMyCount}</strong>개
              </span>
            </div>
            <div className="card-gauge-bar">
              <span className="gauge-tit">우리 회사 평균</span>
              {/* <ProgressBar percent={5} /> */}
              <Progress percent={(badgeLearningTimeItem.companyAvgBadgeCount/badgeLearningTimeItem.allCompanyAvgBadgeCount * 100) === NaN? 0 : badgeLearningTimeItem.companyAvgBadgeCount/badgeLearningTimeItem.allCompanyAvgBadgeCount * 100} />
              <span className="gauge-number">
                <strong>{badgeLearningTimeItem.companyAvgBadgeCount}</strong>개
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
              <Progress percent={0} />
              <span className="gauge-number">
                <strong>63</strong>h&nbsp;<strong>58</strong>m
              </span>
            </div>
            <div className="card-gauge-bar">
              <span className="gauge-tit">우리 회사 평균</span>
              <Progress percent={40} />
              <span className="gauge-number">
                <strong>80</strong>h&nbsp;<strong>30</strong>m
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
};

export default BadgeLearningTimeView;
