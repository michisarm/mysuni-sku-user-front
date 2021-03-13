import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import MyLearningSummaryModal from 'myTraining/ui/logic/MyLearningSummaryModal';
import React, { useEffect } from 'react';
import { useCollegeTopChartItem } from '../../store/PersonalBoardStore';

interface Props {
  myLearningSummary: MyLearningSummaryModel
  activeIndex: number
}

const CollegeTopChartView: React.FC<Props> = function CollegeTopChartView({
  activeIndex
}) {

  const collegeTopChartItem = useCollegeTopChartItem()

  return (
    <>
    {collegeTopChartItem && (
      <MyLearningSummaryModal
        trigger={(
          <a>
            <div className="personal-card-item">
              <div className="card-item-tit mb18">
                <h3>College별 학습 비중</h3>
                <span>전체 College 중 Top5</span>
              </div>
              <div className="card-item-con sty2">
                <div className="item-con-box">
                  <div className="item-con-left">
                    <div className="card-gauge-bar sty2 color-global">
                      <div className="rangeBox">
                        <div className="range">
                          <div
                            style={activeIndex === -1 ? {width:0} :{
                              width: `${collegeTopChartItem.length !== 0 ? collegeTopChartItem[0].percent : 0}%`,
                            }}
                            className="percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-gauge-bar sty2 color-sv">
                      <div className="rangeBox">
                        <div className="range">
                          <div
                            style={activeIndex === -1 ? {width:0} :{
                              width: `${collegeTopChartItem.length !== 0 ? collegeTopChartItem[1].percent : 0}%`,
                            }}
                            className="percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-gauge-bar sty2 color-semi">
                      <div className="rangeBox">
                        <div className="range">
                          <div
                            style={activeIndex === -1 ? {width:0} :{
                              width: `${collegeTopChartItem.length !== 0 ? collegeTopChartItem[2].percent : 0}%`,
                            }}
                            className="percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-gauge-bar sty2 color-manage">
                      <div className="rangeBox">
                        <div className="range">
                          <div
                            style={activeIndex === -1 ? {width:0} :{
                              width: `${collegeTopChartItem.length !== 0 ? collegeTopChartItem[3].percent : 0}%`,
                            }}
                            className="percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-gauge-bar sty2 color-inno">
                      <div className="rangeBox">
                        <div className="range">
                          <div
                            style={activeIndex === -1 ? {width:0} :{
                              width: `${collegeTopChartItem[4] ? collegeTopChartItem[4].percent : 0}%`,
                            }}
                            className="percent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-con-right">
                    <div className="card-gauge-bar">
                      <div className="gauge-number glo"><em className="col-con">Global</em><strong>{collegeTopChartItem.length !== 0 ? collegeTopChartItem[0].percent : 0}<em>%</em></strong></div>
                      <div className="gauge-number sv"><em className="col-con">SV</em><strong>{collegeTopChartItem.length !== 0 ? collegeTopChartItem[1].percent : 0}<em>%</em></strong></div>
                      <div className="gauge-number semi"><em className="col-con">반도체</em><strong>{collegeTopChartItem.length !== 0 ? collegeTopChartItem[2].percent : 0}<em>%</em></strong></div>
                      <div className="gauge-number mana"><em className="col-con">Management</em><strong>{collegeTopChartItem.length !== 0 ? collegeTopChartItem[3].percent : 0}<em>%</em></strong></div>
                      <div className="gauge-number inno"><em className="col-con">혁신디자인</em><strong>{collegeTopChartItem.length !== 0 ? collegeTopChartItem[4].percent : 0}<em>%</em></strong></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </a>
        )}
      />
    )}
    </>
  );
};

export default CollegeTopChartView;
