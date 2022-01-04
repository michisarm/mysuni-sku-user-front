import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import LectureCourseFeedbackSlide from './LectureCourseFeedbackSlide';
import { useLectureCoureSatisfaction } from 'lecture/detail/store/LectureOverviewStore';
import _ from 'lodash';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function chartSentenceText(num: number) {
  if (num === 0) {
    return getPolyglotText('매우 만족', 'survey-reviewOverview-VerySatisfied');
  } else if (num === 1) {
    return getPolyglotText('만족', 'survey-reviewOverview-Satisfied');
  } else if (num === 2) {
    return getPolyglotText('보통', 'survey-reviewOverview-Average');
  } else if (num === 3) {
    return getPolyglotText('불만족', 'survey-reviewOverview-Dissatisfied');
  } else if (num === 4) {
    return getPolyglotText(
      '매우 불만족',
      'survey-reviewOverview-Verydissatisfied'
    );
  }
}

export default function LectureCourseFeedbackView() {
  const answerSummary = useLectureCoureSatisfaction();
  if (answerSummary === undefined) {
    return null;
  }

  const { reversedValues, totalCount } = answerSummary;

  const topValue = _.max(reversedValues) || 0;

  return (
    <div className="badge-detail" id="lms-review">
      <div className="ov-paragraph">
        <div className="section-head">
          <div className="title">
            <h3 className="title-style">
              <Label className="onlytext bold size24">
                <Icon className="review" />
                <span>Review</span>
              </Label>
            </h3>
          </div>
        </div>
        <div className="feedback-body">
          <div className="inner">
            <div className="body-left">
              <div
                className="tit"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `이 강의를 <strong>{totalCount}명이 평가</strong>했어요!`,
                    'survey-reviewOverview-totalCount',
                    {
                      totalCount: totalCount.toString(),
                    }
                  ),
                }}
              />
              <div className="fb-chart">
                <ul className="chart-list">
                  {reversedValues.map((num, i) => {
                    const percentNumber = ((num / totalCount) * 100).toFixed(1);
                    return (
                      <li className="chart-item">
                        <div className="item-text">
                          <Icon className={`feedback-18px face${5 - i}`} />
                          <strong>{chartSentenceText(i)}</strong>
                        </div>
                        <div className="item">
                          <div className="chart-bar">
                            {topValue === num ? (
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
            </div>
            <div className="body-right">
              <LectureCourseFeedbackSlide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
