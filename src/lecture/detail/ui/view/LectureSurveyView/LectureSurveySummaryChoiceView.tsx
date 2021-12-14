import React, { Fragment } from 'react';
import { Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryChoiceView: React.FC<LectureSurveyItemProps> =
  function LectureSurveySummaryChoiceView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
  }) {
    const domainPath =
      process.env.NODE_ENV !== 'development'
        ? window.location.protocol + '//' + window.location.host
        : 'http://university.sk.com';

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

    return (
      <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
        <div className="course-survey-list">
          <div>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>
          {!canMultipleAnswer &&
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
            })}

          {canMultipleAnswer &&
            choices &&
            choices.map((choice) => {
              const choiceAvg =
                choice.count !== undefined &&
                respondCount !== undefined &&
                ((choice.count / totalCount) * 100).toFixed(1);

              const isChecked: any =
                lectureSurveyAnswerItem?.itemNumbers?.includes(`${choice.no}`);

              return (
                <Fragment key={choice.no}>
                  <li className="course-survey-list-cont">
                    <span className="course-survey-list-btnImg">
                      {isChecked ? (
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/all/survay-check-btn.png`}
                        />
                      ) : (
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/all/empty-check-nomal.png`}
                        />
                      )}
                    </span>
                    <div className="course-survey-list-backgrondBar">
                      <div
                        style={
                          choice.count === undefined || 0
                            ? {
                                height: '100%',
                                backgroundColor: '#f4f7fd',
                                opacity: 0.5,
                                borderRadius: '6px',
                              }
                            : {
                                width: `${choiceAvg}%`,
                                height: '100%',
                                backgroundColor: '#2185d0',
                                opacity: 0.5,
                                borderRadius: '6px',
                              }
                        }
                      />
                      <span className="course-survey-list-persent-right">
                        <span className="course-survey-list-persent-number">
                          {choice.count || 0}
                        </span>
                        ({choiceAvg || 0}%)
                      </span>
                      <li className="course-survey-list-text active">
                        {choice.title}
                      </li>
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
            })}
        </div>
      </LectureSurveySummaryChoiceLayout>
    );
  };

export default LectureSurveySummaryChoiceView;
