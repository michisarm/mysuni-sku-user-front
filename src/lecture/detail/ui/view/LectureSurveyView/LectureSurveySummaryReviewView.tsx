import React, { Fragment, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import {
  useLectureSurveySummary,
  useLectureSurveyAnswerSummaryList,
} from 'lecture/detail/store/LectureSurveyStore';
import { SkProfileService } from 'profile/stores';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryReviewView: React.FC<LectureSurveyItemProps> =
  function LectureSurveySummaryChoiceFixedView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
  }) {
    const { no, title, isRequired } = lectureSurveyItem;
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
    const { choices } = lectureSurveyItem;
    const totalCount =
      lectureSurveyItem.choices?.reduce((totalCount, { count }) => {
        return totalCount + (count || 0);
      }, 0) || 0;

    const [number, setNumber] = useState(9);

    const setCheckNumber = () => {
      setNumber(number + 9);
    };
    const lastIndex =
      answerList?.find((f) => f.answerItemType === 'Review')?.summaryItems
        .sentences?.length || 0;

    let iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important.png`;
    if (SkProfileService.instance.skProfile.language === 'English') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-2.png`;
    }
    if (SkProfileService.instance.skProfile.language === 'Chinese') {
      iconRequired = `${process.env.PUBLIC_URL}/images/all/survey-important-3.png`;
    }
    return (
      <div className="course-radio-survey-new">
        <p>
          <span>{no}</span>
          {isRequired === true && (
            <>
              <span>
                {title}
                <span className="importantBtn">
                  <Image
                    style={{ display: 'inline-block' }}
                    src={iconRequired}
                  />
                </span>
              </span>
            </>
          )}
          {isRequired === false && (
            <>
              <span>{title}</span>
            </>
          )}
        </p>
        <div className="course-survey-list">
          <div>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>
          {choices &&
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
          <p className="improve-text">
            {(lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence) ||
              ''}
          </p>
          {lectureSurveyItem.visible !== undefined && (
            <ul className="improve-list">
              {lectureSurveyItem.visible !== undefined &&
                answerList
                  ?.filter(
                    (f) =>
                      f.answerItemType === 'Review' &&
                      f.questionNumber === lectureSurveyItem.questionNumber
                  )
                  .map((answer) =>
                    answer.summaryItems.sentences?.map((result, index) => (
                      <>
                        {index >= 0 && index <= number ? <li>{result}</li> : ''}
                      </>
                    ))
                  )}
              <li className="improve-list-more">
                {lectureSurveyItem.visible !== undefined &&
                lastIndex - 1 > number ? (
                  <>
                    <Image
                      style={{ display: 'inline-block' }}
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-list-more-16-px.svg"
                    />
                    <span onClick={setCheckNumber}>
                      더보기 ({lastIndex - number - 1}개)
                    </span>
                  </>
                ) : (
                  ''
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

export default LectureSurveySummaryReviewView;
