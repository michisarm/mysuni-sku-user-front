import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';
import { PersonalBoardDoughnutChartView } from '@sku/chart';
import React, { useEffect, useMemo } from 'react';
import { useLearningTimeDetailItem } from '../../store/PersonalBoardStore';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  showApl: boolean
}
const PUBLIC_URL = process.env.PUBLIC_URL;

type ChartDataItem = { label: string; value: number };

function LearningTimeDetailView(props: Props) {

  const { showApl } = props;

  const badgeLearningTimeDetailItem = useLearningTimeDetailItem();

  const datas: ChartDataItem[] = useMemo<ChartDataItem[]>(
    () => {
      if(showApl) {
        return (
          [
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
            }
          ]
        )
      } else {
        return (
          [
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
            }
          ]
        )
      }
    },
    [badgeLearningTimeDetailItem?.aplAllowTime, badgeLearningTimeDetailItem?.displayMyCompanyLearningTime, badgeLearningTimeDetailItem?.suniLearningTime, badgeLearningTimeDetailItem?.totalCollegeTime, showApl]
  );

  const timeDataBoolean: boolean[] = []

  datas.map((data) => {
    if(data.value === 0) {
      timeDataBoolean.push(false)
    } else {
      timeDataBoolean.push(true)
    }
  })

  return (
    <>
      {badgeLearningTimeDetailItem && (
        <div className="personal-card-item-box">
          <div className="personal-card-item">
            <div className="card-item-tit mb23">
              <MyLearningSummaryModal
                trigger={
                  <a className="card-item-link">
                    <h3>
                      <PolyglotText defaultString="학습 시간 상세" id="home-PersonalBoard-TimeDetail" />
                    </h3>
                  </a>
                }
              />
              <span>{moment().year()}년 기준</span>
            </div>
            <div className="card-item-con sty2">
              <div className="item-con-box">
                { timeDataBoolean.indexOf(true) !== -1 && (
                  <div className="item-con-left detail">
                      <PersonalBoardDoughnutChartView datas={datas} />
                  </div>
                  )
                }
                { timeDataBoolean.indexOf(true) === -1 && (
                  <div className="item-con-left detail">
                    <img src={`${PUBLIC_URL}/images/all/gr-none.png`} />
                  </div>
                  )
                }
                <div className="item-con-right detail">
                  <div className="card-gauge-bar type2">
                    <div className="gauge-number sv">
                      <em className="col-con">
                        <PolyglotText defaultString="mySUNI" id="home-PersonalBoard-DetailSuni" />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.suniLearningTime /
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="h" id="home-PersonalBoard-DetailSuniH" />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.suniLearningTime %
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="m" id="home-PersonalBoard-DetailSuniM" />
                          </em>
                        </strong>
                      </div>
                    </div>
                    <div className="gauge-number mana">
                      <em className="col-con">
                        <PolyglotText defaultString="관계사" id="home-PersonalBoard-Detail관계사" />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.displayMyCompanyLearningTime /
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="h" id="home-PersonalBoard-Detail관계사H" />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.displayMyCompanyLearningTime %
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="m" id="home-PersonalBoard-Detail관계사M" />
                          </em>
                        </strong>
                      </div>
                    </div>
                    <div className="gauge-number semi">
                      <em className="col-con">
                        <PolyglotText defaultString="강의시간" id="home-PersonalBoard-Detail강의시간" />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.totalCollegeTime /
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="h" id="home-PersonalBoard-Detail강의시간H" />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(
                            badgeLearningTimeDetailItem.totalCollegeTime %
                            60
                          )}
                          <em>
                            <PolyglotText defaultString="m" id="home-PersonalBoard-Detail강의시간M" />
                          </em>
                        </strong>
                      </div>
                    </div>
                    {
                      showApl && (
                      <div className="gauge-number stu">
                        <em className="col-con">
                          <PolyglotText defaultString="개인학습" id="home-PersonalBoard-Detail개인학습" />
                        </em>
                        <div>
                          <strong>
                            {Math.floor(
                              badgeLearningTimeDetailItem.aplAllowTime / 60
                            )}
                            <em>
                              <PolyglotText defaultString="h" id="home-PersonalBoard-Detail개인학습H" />
                            </em>
                          </strong>
                          <strong>
                            {Math.floor(
                              badgeLearningTimeDetailItem.aplAllowTime % 60
                            )}
                            <em>
                              <PolyglotText defaultString="m" id="home-PersonalBoard-Detail개인학습M" />
                            </em>
                          </strong>
                        </div>
                      </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LearningTimeDetailView;
