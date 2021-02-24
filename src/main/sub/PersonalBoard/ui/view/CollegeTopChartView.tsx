import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import React from 'react';
import BadgeLearningTime from '../../viewModel/BadgeLearningTime';
import LearningTimeDetail from '../../viewModel/LearningTimeDetail';

interface Props {
  collegeInfo: any
  myLearningSummary: MyLearningSummaryModel
}

const CollegeTopChartView: React.FC<Props> = function CollegeTopChartView({
  collegeInfo,
  myLearningSummary
}) {
  return (
    <>
    <div style={{border: '2px solid', borderColor: 'yellow'}}>
      <span>college별 학습 비중 (정적인 데이터 아니기때문에 api 호출하기로)</span>
    </div>
    </>
  );
};

export default CollegeTopChartView;
