import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { timeToHourMinute } from '../../../../../shared/helper/dateTimeHelper';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';

interface BadgeLearningTimeViewProps {
  totalLearningTime: number;
}

export function BadgeLearningTimeView({
  totalLearningTime,
}: BadgeLearningTimeViewProps) {
  //

  const history = useHistory();
  const badgeLearningTimeItem = useBadgeLearningTimeItem();

  const goToBadge = useCallback(() => {
    history.push('/certification/badge/EarnedBadgeList/pages/1');
  }, []);

  const goToLearning = useCallback(() => {
    history.push('/my-training/learning/Completed/pages/1');
  }, []);

  const { hour, minute } = useMemo(() => timeToHourMinute(totalLearningTime), [
    totalLearningTime,
  ]);

  return (
    <>
      {badgeLearningTimeItem && (
        <>
          <div className="personal-card">
            <div className="personal-card-item">
              <div className="card-item-tit">
                <a className="card-item-link" onClick={goToBadge}>
                  <h3>
                    <PolyglotText
                      defaultString="Badges"
                      id="home-PersonalBoard-Badges"
                    />
                  </h3>
                </a>
                <span>
                  <PolyglotText
                    defaultString="보유중인 전체 Badge 갯수"
                    id="home-PersonalBoard-badgesEA"
                  />
                </span>
              </div>
              <div className="card-item-con">
                <div className="card-gauge-bar color-sv">
                  <div className="gauge-tit">
                    <PolyglotText
                      defaultString="MY Badges"
                      id="home-PersonalBoard-mybadges"
                    />
                  </div>
                  <div className="card-gauge-bar sty2 color-sv">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${
                              badgeLearningTimeItem.badgeMyCount /
                                badgeLearningTimeItem.AllBadgeMyCount >
                              1
                                ? 100
                                : (badgeLearningTimeItem.badgeMyCount /
                                    badgeLearningTimeItem.AllBadgeMyCount) *
                                  100
                            }%`,
                            // width: `${badgeLearningTimeItem.badgeMyCount > badgeLearningTimeItem.companyAvgBadgeCount ? (badgeLearningTimeItem.badgeMyCount/(badgeLearningTimeItem.badgeMyCount*1.1))*100 : badgeLearningTimeItem.badgeMyCount/(badgeLearningTimeItem.companyAvgBadgeCount*1.1)*100}%`,
                          }}
                          className="percent"
                        />
                      </div>
                    </div>
                  </div>
                  <span
                    className="gauge-number"
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        '<strong>{badgeMyCount}</strong>개',
                        'home-PersonalBoard-갯수',
                        {
                          badgeMyCount: badgeLearningTimeItem.badgeMyCount
                            ? badgeLearningTimeItem.badgeMyCount + ''
                            : 0 + '',
                        }
                      ),
                    }}
                  />
                </div>
                <div className="card-gauge-bar">
                  <span className="gauge-tit">
                    <PolyglotText
                      defaultString="우리 회사 평균"
                      id="home-PersonalBoard-badgesAVG"
                    />
                  </span>
                  <div className="card-gauge-bar sty2">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${
                              badgeLearningTimeItem.companyAvgBadgeCount /
                                badgeLearningTimeItem.allCompanyAvgBadgeCount >
                              1
                                ? 100
                                : (badgeLearningTimeItem.companyAvgBadgeCount /
                                    badgeLearningTimeItem.allCompanyAvgBadgeCount) *
                                  100
                            }%`,
                            // width: `${badgeLearningTimeItem.badgeMyCount > badgeLearningTimeItem.companyAvgBadgeCount ? (badgeLearningTimeItem.companyAvgBadgeCount/(badgeLearningTimeItem.badgeMyCount*1.1))*100 : badgeLearningTimeItem.companyAvgBadgeCount/(badgeLearningTimeItem.companyAvgBadgeCount*1.1)*100}%`,
                          }}
                          className="percent"
                        />
                      </div>
                    </div>
                  </div>
                  <span
                    className="gauge-number"
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        '<strong>{companyAvgBadgeCount}</strong>개',
                        'home-PersonalBoard-갯수AVG',
                        {
                          companyAvgBadgeCount: badgeLearningTimeItem.companyAvgBadgeCount
                            ? badgeLearningTimeItem.companyAvgBadgeCount + ''
                            : 0 + '',
                        }
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="personal-card-item">
              <div className="card-item-tit">
                <a className="card-item-link" onClick={goToLearning}>
                  <h3>
                    <PolyglotText
                      defaultString="학습 시간"
                      id="home-PersonalBoard-학습시간TITLE"
                    />
                  </h3>
                </a>
                <span
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '{year}년 완료 학습',
                      'home-PersonalBoard-완료학습',
                      { year: moment().year() + '' }
                    ),
                  }}
                />
              </div>
              <div className="card-item-con">
                <div className="card-gauge-bar color-manage">
                  <span className="gauge-tit">
                    <PolyglotText
                      defaultString="MY 학습시간"
                      id="home-PersonalBoard-학습시간MY"
                    />
                  </span>
                  <div className="card-gauge-bar sty2 color-blue">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${
                              totalLearningTime >
                              badgeLearningTimeItem.companyAvglearningTime
                                ? (totalLearningTime /
                                    (totalLearningTime * 1.1)) *
                                  100
                                : (totalLearningTime /
                                    (badgeLearningTimeItem.companyAvglearningTime *
                                      1.1)) *
                                  100
                            }%`,
                          }}
                          className="percent"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="gauge-number">
                    <div>
                      <strong>{hour ? hour : 0}</strong>
                      <PolyglotText
                        defaultString="h"
                        id="home-PersonalBoard-학습시간myH"
                      />
                      &nbsp;
                      <strong>{minute ? minute : 0}</strong>
                      <PolyglotText
                        defaultString="m"
                        id="home-PersonalBoard-학습시간myM"
                      />
                    </div>
                  </span>
                </div>
                <div className="card-gauge-bar">
                  <span className="gauge-tit">
                    <PolyglotText
                      defaultString="우리 회사 평균"
                      id="home-PersonalBoard-학습시간AVG"
                    />
                  </span>
                  <div className="card-gauge-bar sty2">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${
                              totalLearningTime >
                              badgeLearningTimeItem.companyAvglearningTime
                                ? (badgeLearningTimeItem.companyAvglearningTime /
                                    (totalLearningTime * 1.1)) *
                                  100
                                : (badgeLearningTimeItem.companyAvglearningTime /
                                    (badgeLearningTimeItem.companyAvglearningTime *
                                      1.1)) *
                                  100
                            }%`,
                          }}
                          className="percent"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="gauge-number">
                    <strong>
                      {badgeLearningTimeItem.companyAvglearningTime
                        ? Math.floor(
                            badgeLearningTimeItem.companyAvglearningTime / 60
                          )
                        : 0}
                    </strong>
                    <PolyglotText
                      defaultString="h"
                      id="home-PersonalBoard-학습시간avgH"
                    />
                    &nbsp;
                    <strong>
                      {badgeLearningTimeItem.companyAvglearningTime
                        ? badgeLearningTimeItem.companyAvglearningTime % 60
                        : 0}
                    </strong>
                    <PolyglotText
                      defaultString="m"
                      id="home-PersonalBoard-학습시간avgM"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// export const BadgeLearningTimeView = withRouter((Props) => {
//   const { history, totalLearningTime } = Props;

//   const badgeLearningTimeItem = useBadgeLearningTimeItem();

//   const goToBadge = useCallback(() => {
//     history.push('/certification/badge/EarnedBadgeList/pages/1');
//   }, []);

//   const goToLearning = useCallback(() => {
//     history.push('/my-training/learning/Completed/pages/1');
//   }, []);

//   // const sumOfCurrentYearLectureTime =
//   //   (lectureTimeSummary && lectureTimeSummary.sumOfCurrentYearLectureTime) || 0;

//   const { hour, minute } = useMemo(
//     () => timeToHourMinute(totalLearningTime),
//     [totalLearningTime]
//   );

// });
