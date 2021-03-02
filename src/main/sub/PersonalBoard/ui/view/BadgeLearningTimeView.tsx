import React, { useEffect, useState } from 'react';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';


const BadgeLearningTimeView: React.FC = function BadgeLearningTimeView() {

  const badgeLearningTimeItem = useBadgeLearningTimeItem()
  const [allLearningTime, setAllLearningTime] = useState('');

  useEffect(() => {
    if(badgeLearningTimeItem === undefined) {
      return
    } 
    console.log('badgeLearningTimeItem', badgeLearningTimeItem)
    if(badgeLearningTimeItem!.mylearningTimeHour !== 0) {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeHour + 'h ' +  badgeLearningTimeItem!.mylearningTimeMinute + 'm')
    } else {
      setAllLearningTime(badgeLearningTimeItem!.mylearningTimeMinute + 'm')
    }
  }, [badgeLearningTimeItem])

  return (
    <>
    {badgeLearningTimeItem && allLearningTime !== '' &&(
      <div style={{border: '2px solid', borderColor: 'red'}}>
        <span>Badges</span><br/>
        <span>My Badges :{badgeLearningTimeItem.badgeMyCount}</span><br/>
        <span>전체뱃지갯수 :{badgeLearningTimeItem.AllBadgeMyCount}</span><br/>
        <span>우리회사평균 뱃지갯수 :{badgeLearningTimeItem.companyAvgBadgeCount}</span><br/>
        <span>우리회사평균 전체뱃지갯수평균 :{badgeLearningTimeItem.allCompanyAvgBadgeCount}</span><br/>
        <span>MY 학습시간 :{allLearningTime}</span><br/>
        <span>전체 MY 학습시간 : MY와 우리회사평균 비교하여 큰값의 +10%{badgeLearningTimeItem.allMylearningTime}</span><br/>
        <span>우리회사평균 학습시간 :{badgeLearningTimeItem.companyAvglearningTime}</span><br/>
        <span>전체 우리회사평균 학습시간 : MY와 우리회사평균 비교하여 큰값의 +10%{badgeLearningTimeItem.allCompanyAvglearningTime}</span><br/>
      </div>
    )}
    </>
  );
};

export default BadgeLearningTimeView;
