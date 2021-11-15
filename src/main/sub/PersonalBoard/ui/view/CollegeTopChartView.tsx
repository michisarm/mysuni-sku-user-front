import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import React, { useEffect } from 'react';
import { useCollegeTopChartItem } from '../../store/PersonalBoardStore';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  myLearningSummary: MyLearningSummaryModel;
}

const CollegeTopChartView: React.FC<Props> = function CollegeTopChartView({}) {
  const collegeTopChartItem = useCollegeTopChartItem();

  return (
    <>
      {collegeTopChartItem && (
        <div className="personal-card-item-box">
          <div className="personal-card-item">
            <div className="card-item-tit mb18">
              <a className="card-item-link">
                <h3>
                  <PolyglotText
                    defaultString="College별 학습 비중"
                    id="home-PersonalBoard-college비중"
                  />
                </h3>
              </a>
              <span>
                <PolyglotText
                  defaultString="전체 College 중 Top5"
                  id="home-PersonalBoard-collegeTop5"
                />
              </span>
            </div>
            <div className="card-item-con sty2">
              <div className="item-con-box">
                <div className="item-con-left">
                  <div className="card-gauge-bar sty2 color-global">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${
                              collegeTopChartItem.length !== 0
                                ? collegeTopChartItem[0].percent
                                : 0
                            }%`,
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
                          style={{
                            width: `${
                              collegeTopChartItem.length !== 0
                                ? collegeTopChartItem[1]
                                  ? collegeTopChartItem[1].percent
                                  : 0
                                : 0
                            }%`,
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
                          style={{
                            width: `${
                              collegeTopChartItem.length !== 0
                                ? collegeTopChartItem[2]
                                  ? collegeTopChartItem[2].percent
                                  : 0
                                : 0
                            }%`,
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
                          style={{
                            width: `${
                              collegeTopChartItem.length !== 0
                                ? collegeTopChartItem[3]
                                  ? collegeTopChartItem[3].percent
                                  : 0
                                : 0
                            }%`,
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
                          style={{
                            width: `${
                              collegeTopChartItem[4]
                                ? collegeTopChartItem[4]
                                  ? collegeTopChartItem[4].percent
                                  : 0
                                : 0
                            }%`,
                          }}
                          className="percent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-con-right">
                  <div className="card-gauge-bar">
                    <div className="gauge-number glo">
                      <em className="col-con">
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[0].college
                          : ''}
                      </em>
                      <strong>
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[0]
                            ? collegeTopChartItem[0].percent
                            : 0
                          : 0}
                        <em>%</em>
                      </strong>
                    </div>
                    <div className="gauge-number sv">
                      <em className="col-con">
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[1]
                            ? collegeTopChartItem[1].college
                            : ''
                          : ''}
                      </em>
                      <strong>
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[1]
                            ? collegeTopChartItem[1].percent
                            : 0
                          : 0}
                        <em>%</em>
                      </strong>
                    </div>
                    <div className="gauge-number semi">
                      <em className="col-con">
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[2]
                            ? collegeTopChartItem[2].college
                            : ''
                          : ''}
                      </em>
                      <strong>
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[2]
                            ? collegeTopChartItem[2].percent
                            : 0
                          : 0}
                        <em>%</em>
                      </strong>
                    </div>
                    <div className="gauge-number mana">
                      <em className="col-con">
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[3]
                            ? collegeTopChartItem[3].college
                            : ''
                          : ''}
                      </em>
                      <strong>
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[3]
                            ? collegeTopChartItem[3].percent
                            : 0
                          : 0}
                        <em>%</em>
                      </strong>
                    </div>
                    <div className="gauge-number inno">
                      <em className="col-con">
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[4]
                            ? collegeTopChartItem[4].college
                            : ''
                          : ''}
                      </em>
                      <strong>
                        {collegeTopChartItem.length !== 0
                          ? collegeTopChartItem[4]
                            ? collegeTopChartItem[4].percent
                            : 0
                          : 0}
                        <em>%</em>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollegeTopChartView;
