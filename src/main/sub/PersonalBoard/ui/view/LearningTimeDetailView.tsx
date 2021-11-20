import { PersonalBoardDoughnutChartView } from '@sku/chart';
import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';
import { InstructorLearningTimeSummary } from 'personalcube/personalcube/model/InstructorLearningTimeSummary';
import React, { useMemo } from 'react';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  showApl: boolean;
  mySuniLearningTime: number;
  myCompanyLearningTime: number;
  instructorTimeSummary: InstructorLearningTimeSummary | undefined;
  aplTime: number;
}
const PUBLIC_URL = process.env.PUBLIC_URL;

type ChartDataItem = { label: string; value: number };

function LearningTimeDetailView(props: Props) {
  const {
    showApl,
    mySuniLearningTime,
    myCompanyLearningTime,
    instructorTimeSummary,
    aplTime,
  } = props;

  // const totalLearningTimeRdo = useTotalLearningTimeRdo();
  // const allColleges = useAllColleges();

  // const { collegeLearningTimes } = totalLearningTimeRdo;

  // const suniLearningTime = useMemo(
  //   () =>
  //     collegeLearningTimes
  //       .filter((c) =>
  //         allColleges.filter(isMySuniCollege).some((d) => d.id === c.collegeId)
  //       )
  //       .reduce<number>((p, c) => p + c.learningTime, 0),
  //   [collegeLearningTimes]
  // );

  const datas: ChartDataItem[] = useMemo<ChartDataItem[]>(() => {
    if (showApl) {
      return [
        {
          label: 'mySUNI',
          value: mySuniLearningTime || 0,
        },
        {
          label: '관계사',
          value: myCompanyLearningTime || 0,
        },
        {
          label: '강의시간',
          // value: badgeLearningTimeDetailItem?.totalCollegeTime || 0,
          value:
            (instructorTimeSummary &&
              instructorTimeSummary.sumOfCurrentYearInstructorLearningTime) ||
            0,
        },
        {
          label: '개인학습',
          value: aplTime || 0,
        },
      ];
    } else {
      return [
        {
          label: 'mySUNI',
          value: mySuniLearningTime || 0,
        },
        {
          label: '관계사',
          value: myCompanyLearningTime || 0,
        },
        {
          label: '강의시간',
          value:
            (instructorTimeSummary &&
              instructorTimeSummary.sumOfCurrentYearInstructorLearningTime) ||
            0,
        },
      ];
    }
  }, [
    mySuniLearningTime,
    myCompanyLearningTime,
    instructorTimeSummary,
    aplTime,
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
                          {Math.floor(mySuniLearningTime / 60)}
                          <em>
                            <PolyglotText
                              defaultString="h"
                              id="home-PersonalBoard-DetailSuniH"
                            />
                          </em>
                        </strong>
                        <strong>
                          {Math.floor(mySuniLearningTime % 60)}
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
                            (instructorTimeSummary &&
                              instructorTimeSummary.sumOfCurrentYearInstructorLearningTime /
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
                            (instructorTimeSummary &&
                              instructorTimeSummary.sumOfCurrentYearInstructorLearningTime %
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
                            {Math.floor(aplTime / 60)}
                            <em>
                              <PolyglotText
                                defaultString="h"
                                id="home-PersonalBoard-Detail개인학습H"
                              />
                            </em>
                          </strong>
                          <strong>
                            {Math.floor(aplTime % 60)}
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
