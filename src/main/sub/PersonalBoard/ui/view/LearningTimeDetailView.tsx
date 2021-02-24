import React from 'react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { useLearningTimeDetailItem } from '../../store/PersonalBoardStore';

const LearningTimeDetailView: React.FC = function LearningTimeDetailView({
}) {

  const badgeLearningTimeDetailItem = useLearningTimeDetailItem()
  console.log('badgeLearningTimeDetailItem@@@@@@@@@@@2', badgeLearningTimeDetailItem)

  return (
    <>
    {badgeLearningTimeDetailItem && (
    <div style={{border: '2px solid', borderColor: 'blue'}}>
      <span>학습시간상세 pie chart</span><br/>
      <span>mySUNI{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.suniLearningTime)}</span><br/>
      {/* {
        badgeLearningTimeDetailItem.displayMyCompanyLearningTime && ( */}
          <span>관계사{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.displayMyCompanyLearningTime)}</span><br/>
        {/* )
      } */}
      <span>강의시간{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.aplAllowTime)}</span><br/>
      <span>개인학습{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.totalCollegeTime)}</span><br/>
      <span>전체시간{badgeLearningTimeDetailItem.suniLearningTime+badgeLearningTimeDetailItem.displayMyCompanyLearningTime+badgeLearningTimeDetailItem.aplAllowTime+badgeLearningTimeDetailItem.totalCollegeTime}</span><br/>
    </div>
    )}
    </>
  );
};

export default LearningTimeDetailView;
