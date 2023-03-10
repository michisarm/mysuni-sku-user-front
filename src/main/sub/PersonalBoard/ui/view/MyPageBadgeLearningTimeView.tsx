import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { timeToHourMinute } from '../../../../../shared/helper/dateTimeHelper';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { useBadgeLearningTimeItem } from '../../store/PersonalBoardStore';
import { MyLearningSummaryModal } from '../../../../../myTraining';

interface BadgeLearningTimeViewProps {
  year: string;
  totalLearningTime: number;
}

export function MyPageBadgeLearningTimeView({
  year,
  totalLearningTime,
}: BadgeLearningTimeViewProps) {
  //
  const history = useHistory();
  const badgeLearningTimeItem = useBadgeLearningTimeItem();

  const goToBadge = useCallback(() => {
    history.push('/my-training/my-page/EarnedBadgeList/pages/1');
  }, []);

  const goToLearning = useCallback(() => {
    history.push('/my-training/learning/Completed/pages/1');
  }, []);

  const { hour, minute } = useMemo(() => timeToHourMinute(totalLearningTime), [
    totalLearningTime,
  ]);

  const getMyGaugeWidth = (a: number, b: number) => {
    //
    let result;

    if (a > b) {
      result = (a / (a * 1.1)) * 100;
    } else {
      result = (a / (b * 1.1)) * 100;
    }
    return isNaN(result) ? 0 : result;
  };

  const getCompanyGaugeWidth = (a: number, b: number) => {
    //
    let result;

    if (a > b) {
      result = (b / (a * 1.1)) * 100;
    } else {
      result = (b / (b * 1.1)) * 100;
    }
    return isNaN(result) ? 0 : result;
  };

  return (
    <>
      {badgeLearningTimeItem && (
        <>
          <div className="ui card personal-content-box">
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
                    defaultString="???????????? ?????? Badge ??????"
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
                        '<strong>{badgeMyCount}</strong>???',
                        'home-PersonalBoard-??????',
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
                      defaultString="?????? ?????? ??????"
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
                        '<strong>{companyAvgBadgeCount}</strong>???',
                        'home-PersonalBoard-??????AVG',
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
          </div>
          <div className="ui card personal-content-box time">
            <div className="personal-card-item">
              <div className="card-item-tit">
                <MyLearningSummaryModal
                  year={year}
                  trigger={
                    <a className="card-item-link">
                      <h3>
                        <PolyglotText
                          defaultString="?????? ??????"
                          id="home-PersonalBoard-????????????TITLE"
                        />
                      </h3>
                    </a>
                  }
                />

                <span>
                  {year === '??????' ? (
                    <PolyglotText
                      defaultString="?????? ?????? ??????"
                      id="home-PersonalBoard-??????????????????"
                    />
                  ) : (
                    getPolyglotText(
                      '{year}??? ?????? ??????',
                      'home-PersonalBoard-????????????',
                      { year: `${year}` }
                    )
                  )}
                </span>
              </div>
              <div className="card-item-con">
                <div className="card-gauge-bar color-manage">
                  <span className="gauge-tit">
                    <PolyglotText
                      defaultString="MY ????????????"
                      id="home-PersonalBoard-????????????MY"
                    />
                  </span>
                  <div className="card-gauge-bar sty2 color-blue">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${getMyGaugeWidth(
                              totalLearningTime,
                              badgeLearningTimeItem.companyAvglearningTime
                            )}%`,
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
                        id="home-PersonalBoard-????????????myH"
                      />
                      &nbsp;
                      <strong>{minute ? minute : 0}</strong>
                      <PolyglotText
                        defaultString="m"
                        id="home-PersonalBoard-????????????myM"
                      />
                    </div>
                  </span>
                </div>
                <div className="card-gauge-bar">
                  <span className="gauge-tit">
                    <PolyglotText
                      defaultString="?????? ?????? ??????"
                      id="home-PersonalBoard-????????????AVG"
                    />
                  </span>
                  <div className="card-gauge-bar sty2">
                    <div className="rangeBox">
                      <div className="range">
                        <div
                          style={{
                            width: `${getCompanyGaugeWidth(
                              totalLearningTime,
                              badgeLearningTimeItem.companyAvglearningTime
                            )}%`,
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
                      id="home-PersonalBoard-????????????avgH"
                    />
                    &nbsp;
                    <strong>
                      {badgeLearningTimeItem.companyAvglearningTime
                        ? badgeLearningTimeItem.companyAvglearningTime % 60
                        : 0}
                    </strong>
                    <PolyglotText
                      defaultString="m"
                      id="home-PersonalBoard-????????????avgM"
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
