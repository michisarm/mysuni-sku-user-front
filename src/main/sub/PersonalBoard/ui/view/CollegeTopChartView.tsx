import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import MyLearningSummaryModal from 'myTraining/ui/logic/MyLearningSummaryModal';
import React from 'react';
import BadgeLearningTime from '../../viewModel/BadgeLearningTime';
import LearningTimeDetail from '../../viewModel/LearningTimeDetail';

interface Props {
  myLearningSummary: MyLearningSummaryModel
}

const CollegeTopChartView: React.FC<Props> = function CollegeTopChartView({
  myLearningSummary
}) {
  return (
    <>
    {/* <div style={{border: '2px solid', borderColor: 'yellow'}}> */}
      <MyLearningSummaryModal
        trigger={(
          <div className="personal-card-item">
            <div className="card-item-tit mb18">
              <h3>College별 학습 비중</h3>
              <span>전체 College 중 Top5</span>
            </div>
            <div className="card-item-con sty2">

              <div className="item-con-box">
                <div className="item-con-left">
                  <div className="card-gauge-bar sty2 color-global">
                    {/* <ProgressBar /> */}
                    1234
                  </div>
                  <div className="card-gauge-bar sty2 color-sv">
                    {/* <ProgressBar /> */}
                    1234
                  </div>
                  <div className="card-gauge-bar sty2 color-semi">
                    {/* <ProgressBar /> */}
                    1234
                  </div>
                  <div className="card-gauge-bar sty2 color-manage">
                    {/* <ProgressBar /> */}
                    1234
                  </div>
                  <div className="card-gauge-bar sty2 color-inno">
                    {/* <ProgressBar /> */}
                    1234
                  </div>

                </div>
                <div className="item-con-right">
                  <div className="card-gauge-bar">
                    <div className="gauge-number glo"><em className="col-con">Global</em><strong>32<em>%</em></strong></div>
                    <div className="gauge-number sv"><em className="col-con">SV</em><strong>24<em>%</em></strong></div>
                    <div className="gauge-number semi"><em className="col-con">반도체</em><strong>10<em>%</em></strong></div>
                    <div className="gauge-number mana"><em className="col-con">Management</em><strong>8<em>%</em></strong></div>
                    <div className="gauge-number inno"><em className="col-con">혁신디자인</em><strong>5<em>%</em></strong></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      />
      {/* <span>college별 학습 비중 (정적인 데이터 아니기때문에 api 호출하기로)</span> */}
      
    {/* </div> */}
    </>
  );
};

export default CollegeTopChartView;
