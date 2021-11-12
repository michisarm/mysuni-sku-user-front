import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';
import { PersonalBoardDoughnutChartView } from '@sku/chart';
import React, { useMemo } from 'react';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { MyLearningSummaryService } from 'myTraining/stores';
import { useTotalLearningTimeRdo } from '../../model/TotalLearningTimeRdo';

interface Props {
  showApl: boolean;
}
const PUBLIC_URL = process.env.PUBLIC_URL;

type ChartDataItem = { label: string; value: number };

function LearningTimeDetailView(props: Props) {
  const { showApl } = props;

  const instructTimeSummary =
    MyLearningSummaryService.instance._instructTimeSummary;

  const totalLearningTimeRdo = useTotalLearningTimeRdo();

  const {
    collegeLearningTimes,
    myCompanyLearningTime,
    accumulatedLearningTime,
  } = totalLearningTimeRdo;

  const suniLearningTime = useMemo(
    () => collegeLearningTimes.reduce<number>((p, c) => p + c.learningTime, 0),
    [collegeLearningTimes]
  );

  const datas: ChartDataItem[] = useMemo<ChartDataItem[]>(() => {
    if (showApl) {
      return [
        {
          label: 'mySUNI',
          value: suniLearningTime || 0,
        },
        {
          label: '관계사',
          value: myCompanyLearningTime || 0,
        },
        {
          label: '강의시간',
          // value: badgeLearningTimeDetailItem?.totalCollegeTime || 0,
          value:
            instructTimeSummary?.sumOfCurrentYearInstructorLearningTime || 0,
        },
        {
          label: '개인학습',
          value: accumulatedLearningTime || 0,
        },
      ];
    } else {
      return [
        {
          label: 'mySUNI',
          value: suniLearningTime || 0,
        },
        {
          label: '관계사',
          value: myCompanyLearningTime || 0,
        },
        {
          label: '강의시간',
          value:
            instructTimeSummary?.sumOfCurrentYearInstructorLearningTime || 0,
        },
      ];
    }
  }, [
    instructTimeSummary,
    suniLearningTime,
    myCompanyLearningTime,
    accumulatedLearningTime,
  ]);

  const timeDataBoolean = useMemo<boolean[]>(() => {
    return datas.map((data) => {
      if (data.value === 0) {
        return false;
      } else {
        return true;
      }
    });
  }, [datas]);

  return (
    <>
      {datas.length > 0 && (
        <div className="personal-card-item-box">
          <div className="personal-card-item">
            <div className="card-item-tit mb23">
              <MyLearningSummaryModal
                trigger={
                  <a className="card-item-link">
                    <h3>
                      <PolyglotText
                        defaultString="학습 시간 상세"
                        id="home-PersonalBoard-TimeDetail"
                      />
                    </h3>
                  </a>
                }
                suniLearningTime={suniLearningTime}
                myCompanyLearningTime={myCompanyLearningTime}
                accumulatedLearningTime={accumulatedLearningTime}
                collegeLearningTimes={collegeLearningTimes}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    '{year}년 기준',
                    'home-PersonalBoard-TimeDetailYear',
                    { year: moment().year() + '' }
                  ),
                }}
              />
            </div>
            <div className="card-item-con sty2">
              <div className="item-con-box">
                {timeDataBoolean.indexOf(true) !== -1 && (
                  <div className="item-con-left detail">
                    <PersonalBoardDoughnutChartView datas={datas} />
                  </div>
                )}
                {timeDataBoolean.indexOf(true) === -1 && (
                  <div className="item-con-left detail">
                    <img src={`${PUBLIC_URL}/images/all/gr-none.png`} />
                  </div>
                )}
                <div className="item-con-right detail">
                  <div className="card-gauge-bar type2">
                    <div className="gauge-number sv">
                      <em className="col-con">
                        <PolyglotText
                          defaultString="mySUNI"
                          id="home-PersonalBoard-DetailSuni"
                        />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(suniLearningTime / 60)}
                          <em>
                            <PolyglotText
                              defaultString="h"
                              id="home-PersonalBoard-DetailSuniH"
                            />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(suniLearningTime % 60)}
                          <em>
                            <PolyglotText
                              defaultString="m"
                              id="home-PersonalBoard-DetailSuniM"
                            />
                          </em>
                        </strong>
                      </div>
                    </div>
                    <div className="gauge-number mana">
                      <em className="col-con">
                        <PolyglotText
                          defaultString="관계사"
                          id="home-PersonalBoard-Detail관계사"
                        />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(myCompanyLearningTime / 60)}
                          <em>
                            <PolyglotText
                              defaultString="h"
                              id="home-PersonalBoard-Detail관계사H"
                            />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(myCompanyLearningTime % 60)}
                          <em>
                            <PolyglotText
                              defaultString="m"
                              id="home-PersonalBoard-Detail관계사M"
                            />
                          </em>
                        </strong>
                      </div>
                    </div>
                    <div className="gauge-number semi">
                      <em className="col-con">
                        <PolyglotText
                          defaultString="강의시간"
                          id="home-PersonalBoard-Detail강의시간"
                        />
                      </em>
                      <div>
                        <strong>
                          {Math.floor(
                            (instructTimeSummary &&
                              instructTimeSummary.sumOfCurrentYearInstructorLearningTime /
                                60) ||
                              0
                          )}
                          <em>
                            <PolyglotText
                              defaultString="h"
                              id="home-PersonalBoard-Detail강의시간H"
                            />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(
                            (instructTimeSummary &&
                              instructTimeSummary.sumOfCurrentYearInstructorLearningTime %
                                60) ||
                              0
                          )}
                          <em>
                            <PolyglotText
                              defaultString="m"
                              id="home-PersonalBoard-Detail강의시간M"
                            />
                          </em>
                        </strong>
                      </div>
                    </div>
                    {showApl && (
                      <div className="gauge-number stu">
                        <em className="col-con">
                          <PolyglotText
                            defaultString="개인학습"
                            id="home-PersonalBoard-Detail개인학습"
                          />
                        </em>
                        <div>
                          <strong>
                            {Math.floor(accumulatedLearningTime / 60)}
                            <em>
                              <PolyglotText
                                defaultString="h"
                                id="home-PersonalBoard-Detail개인학습H"
                              />
                            </em>
                          </strong>
                          <strong>
                            {Math.floor(accumulatedLearningTime % 60)}
                            <em>
                              <PolyglotText
                                defaultString="m"
                                id="home-PersonalBoard-Detail개인학습M"
                              />
                            </em>
                          </strong>
                        </div>
                      </div>
                    )}
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
