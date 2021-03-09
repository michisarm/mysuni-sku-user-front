import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';
import { PersonalBoardDoughnutChartView } from '@sku/chart';
import React, { useMemo } from 'react';
import { useLearningTimeDetailItem } from '../../store/PersonalBoardStore';

type ChartDataItem = { label: string; value: number };

const LearningTimeDetailView: React.FC = function LearningTimeDetailView({ }) {
  const badgeLearningTimeDetailItem = useLearningTimeDetailItem();
  const datas: ChartDataItem[] = useMemo<ChartDataItem[]>(
    () => [
      {
        label: 'mySUNI',
        value: badgeLearningTimeDetailItem?.suniLearningTime || 0,
      },
      {
        label: '관계사',
        value: badgeLearningTimeDetailItem?.displayMyCompanyLearningTime || 0,
      },
      {
        label: '강의시간',
        value: badgeLearningTimeDetailItem?.totalCollegeTime || 0,
      },
      {
        label: '개인학습',
        value: badgeLearningTimeDetailItem?.aplAllowTime || 0,
      },
    ],
    [badgeLearningTimeDetailItem]
  );
  return (
    <>
      {/* {badgeLearningTimeDetailItem && (
    <div style={{border: '2px solid', borderColor: 'blue'}}>
      <span>학습시간상세 pie chart</span><br/>
      <span>mySUNI{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.suniLearningTime)}</span><br/>
      <span>관계사{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.displayMyCompanyLearningTime)}</span><br/>
      <span>강의시간{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.aplAllowTime)}</span><br/>
      <span>개인학습{timeToHourMinutePaddingFormat(badgeLearningTimeDetailItem.totalCollegeTime)}</span><br/>
      <span>전체시간{badgeLearningTimeDetailItem.suniLearningTime+badgeLearningTimeDetailItem.displayMyCompanyLearningTime+badgeLearningTimeDetailItem.aplAllowTime+badgeLearningTimeDetailItem.totalCollegeTime}</span><br/>
    </div> */}
      {badgeLearningTimeDetailItem && (
        <MyLearningSummaryModal
          trigger={
            <a>
              <div className="personal-card-item">
                <div className="card-item-tit mb23">
                  <h3>학습 시간 상세</h3>
                  <span>{moment().year()}년 기준</span>
                </div>
                <div className="card-item-con sty2">
                  <div className="item-con-box">
                    <div className="item-con-left detail">
                      <PersonalBoardDoughnutChartView datas={datas} />
                    </div>
                    <div className="item-con-right detail">
                      <div className="card-gauge-bar">
                        <div className="gauge-number sv">
                          <em className="col-con">mySUNI</em>
                          <div>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.suniLearningTime /
                                60
                              )}
                              <em>h</em>
                            </strong>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.suniLearningTime %
                                60
                              )}
                              <em>m</em>
                            </strong>
                          </div>
                        </div>
                        <div className="gauge-number mana">
                          <em className="col-con">관계사</em>
                          <div>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.displayMyCompanyLearningTime /
                                60
                              )}
                              <em>h</em>
                            </strong>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.displayMyCompanyLearningTime %
                                60
                              )}
                              <em>m</em>
                            </strong>
                          </div>
                        </div>
                        <div className="gauge-number semi">
                          <em className="col-con">강의시간</em>
                          <div>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.totalCollegeTime /
                                60
                              )}
                              <em>h</em>
                            </strong>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.totalCollegeTime %
                                60
                              )}
                              <em>m</em>
                            </strong>
                          </div>
                        </div>
                        <div className="gauge-number stu">
                          <em className="col-con">개인학습</em>
                          <div>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.aplAllowTime / 60
                              )}
                              <em>h</em>
                            </strong>
                            <strong>
                              {Math.floor(
                                badgeLearningTimeDetailItem.aplAllowTime % 60
                              )}
                              <em>m</em>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          }
        />
      )}
    </>
  );
};

export default LearningTimeDetailView;
