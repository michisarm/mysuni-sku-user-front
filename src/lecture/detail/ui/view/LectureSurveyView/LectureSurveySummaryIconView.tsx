import React, { Fragment, useState } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import {
  useLectureSurveySummary,
  useLectureSurveyAnswerSummaryList,
} from 'lecture/detail/store/LectureSurveyStore';
import { SkProfileService } from 'profile/stores';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';
import { useLectureCoureSatisfaction } from 'lecture/detail/store/LectureOverviewStore';
import _ from 'lodash';

function chartSentenceText(num: number) {
  if (num === 0) {
    return '매우 그렇다';
  } else if (num === 1) {
    return '그렇다';
  } else if (num === 2) {
    return '보통이다';
  } else if (num === 3) {
    return '아니다';
  } else if (num === 4) {
    return '전혀 아니다';
  }
}

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryIconView: React.FC<LectureSurveyItemProps> =
  function LectureSurveySummaryChoiceFixedView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
  }) {
    const { no, title, image, isRequired } = lectureSurveyItem;
    const domainPath =
      process.env.NODE_ENV !== 'development'
        ? window.location.protocol + '//' + window.location.host
        : 'http://university.sk.com';
    const answerList = useLectureSurveyAnswerSummaryList();
    const lectureSurveySummary = useLectureSurveySummary();
    const respondCount =
      (lectureSurveySummary &&
        lectureSurveySummary.respondentCount.respondentCount) ||
      0;
    const { canMultipleAnswer, choices, questionNumber } = lectureSurveyItem;
    const totalCount =
      lectureSurveyItem.choices?.reduce((totalCount, { count }) => {
        return totalCount + (count || 0);
      }, 0) || 0;

    /*eslint-disable*/
    // 각 선택지 최댓값 구해서 파란색으로 표시
    const maxNum: number = Math.max.apply(
      Math,
      lectureSurveyItem.choices!.map((o) => {
        return o.count === undefined ? 0 : o.count;
      })
    );
    /*eslint-enable */

    const [number, setNumber] = useState(9);

    const setCheckNumber = () => {
      setNumber(number + 9);
    };
    const lastIndex =
      answerList?.find((f) => f.answerItemType === 'Essay')?.summaryItems
        .sentences?.length || 0;

    let iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important.png`;
    if (SkProfileService.instance.skProfile.language === 'English') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-2.png`;
    }
    if (SkProfileService.instance.skProfile.language === 'Chinese') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-3.png`;
    }

    const iconSurvey = choices
      ?.map((item) => {
        return item.count || 0;
      })
      .reverse();
    const topValue = _.max(iconSurvey) || 0;

    return (
      <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
        <div className="course-survey-list">
          <div>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>

          <div className="fb-chart">
            <ul className="chart-list">
              {iconSurvey &&
                iconSurvey.map((item, i) => {
                  const percentNumber = ((item / totalCount) * 100).toFixed(1);
                  console.log(item, 'item');
                  console.log(percentNumber, 'percentNumber');
                  console.log(totalCount, 'totalCount');
                  return (
                    <li className="chart-item">
                      <div className="item-text">
                        <Icon className={`feedback-18px face${5 - i}`} />
                        <strong>{chartSentenceText(i)}</strong>
                      </div>
                      <div className="item">
                        <div className="chart-bar">
                          {topValue === item ? (
                            <div
                              className="percent top"
                              style={{
                                width: `${percentNumber}%`,
                              }}
                            />
                          ) : (
                            <div
                              className="percent"
                              style={{
                                width: `${percentNumber}%`,
                              }}
                            />
                          )}
                        </div>
                        <span>{percentNumber}%</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {/* {!canMultipleAnswer &&
            choices &&
            choices.map((choice, index) => {
              const choiceAvg =
                choice.count !== undefined &&
                respondCount !== undefined &&
                ((choice.count / totalCount) * 100).toFixed(1);

              const isChecked = lectureSurveyAnswerItem?.itemNumbers?.includes(
                `${choice.no}`
              );
              return (
                <Fragment key={choice.no}>
                  <li className="course-survey-list-cont">
                    <span className="course-survey-list-btnImg">
                      {isChecked ? (
                        <Image src="https://image.mysuni.sk.com/suni-asset/public/images/all/btn-radio-type-2-selected.svg" />
                      ) : (
                        <Image src="https://image.mysuni.sk.com/suni-asset/public/images/all/btn-radio-type-2-nomal.svg" />
                      )}
                    </span>
                    <div className="course-survey-list-backgrondBar">
                      <div
                        style={
                          choice.count === undefined || 0
                            ? {
                                height: '100%',
                                borderRadius: '6px',
                              }
                            : {
                                width: `${choiceAvg}%`,
                                height: '100%',
                                backgroundColor: 'rgb(205, 228, 226)',
                                borderRadius: '6px',
                              }
                        }
                      />
                      <span className="course-survey-list-persent-right">
                        <span className="course-survey-list-persent-number">
                          {choice.count || 0}
                        </span>
                        {` (${choiceAvg || 0}%)`}
                      </span>
                      {isChecked ? (
                        <li className="course-survey-list-text active">
                          {choice.title}
                        </li>
                      ) : (
                        <li className="course-survey-list-text">
                          {choice.title}
                        </li>
                      )}
                    </div>
                    {choice.image && (
                      <div className="course-survey-list-img-selector">
                        <Image
                          style={{ display: 'inline-block' }}
                          src={`${domainPath + choice.image}`}
                        />
                      </div>
                    )}
                  </li>
                </Fragment>
              );
            })} */}
        </div>
      </LectureSurveySummaryChoiceLayout>
    );
  };

export default LectureSurveySummaryIconView;
