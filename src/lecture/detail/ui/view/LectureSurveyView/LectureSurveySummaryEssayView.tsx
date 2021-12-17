import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { useLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyEssayView: React.FC<LectureSurveyEssayViewProps> =
  function LectureSurveyEssayView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
  }) {
    const answerList = useLectureSurveyAnswerSummaryList();

    const [number, setNumber] = useState(9);

    const setCheckNumber = () => {
      setNumber(number + 9);
    };

    const lastIndex =
      answerList?.find((f) => f.answerItemType === 'Essay')?.summaryItems
        .sentences?.length || 0;

    return (
      <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
        <div className="course-radio-survey-new">
          <div style={{ margin: '20px 0' }}>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>
          <div className="course-survey-list">
            <p className="improve-text">
              {lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
            </p>
            {lectureSurveyItem.visible !== undefined &&
              lectureSurveyItem.visible === true && (
                <ul className="improve-list">
                  {lectureSurveyItem.visible !== undefined &&
                    lectureSurveyItem.visible === true &&
                    answerList
                      ?.filter(
                        (f) =>
                          f.answerItemType === 'Essay' &&
                          f.questionNumber === lectureSurveyItem.questionNumber
                      )
                      .map((answer) =>
                        answer.summaryItems.sentences?.map((result, index) => (
                          <>
                            {index >= 0 && index <= number ? (
                              <li>{result}</li>
                            ) : (
                              ''
                            )}
                          </>
                        ))
                      )}
                  <li className="improve-list-more">
                    {lectureSurveyItem.visible !== undefined &&
                    lectureSurveyItem.visible === true &&
                    lastIndex - 1 > number ? (
                      <>
                        <Image
                          style={{ display: 'inline-block' }}
                          src={`${process.env.PUBLIC_URL}/images/all/survey-list-more.png`}
                        />
                        <span
                          onClick={setCheckNumber}
                          dangerouslySetInnerHTML={{
                            __html: getPolyglotText(
                              ` 더보기 ({totalCount}개)`,
                              'survey-review-moreView',
                              {
                                totalCount: (lastIndex - number - 1).toString(),
                              }
                            ),
                          }}
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </li>
                </ul>
              )}
            {lectureSurveyItem.visible !== undefined &&
              lectureSurveyItem.visible === false && (
                <div style={{ marginTop: '10px' }}>
                  <Image
                    style={{ display: 'inline-block', marginRight: '5px' }}
                    src={`${process.env.PUBLIC_URL}/images/all/icon-info-error-16-px.png`}
                  />
                  <span
                    style={{
                      color: '#e1002a',
                      fontSize: '14px',
                      lineHeight: '16px',
                      verticalAlign: 'text-bottom',
                    }}
                  >
                    해당 문항은 비공개 처리되어 답변이 조회되지 않습니다.
                  </span>
                </div>
              )}
          </div>
        </div>
      </LectureSurveySummaryChoiceLayout>
    );
  };

export default LectureSurveyEssayView;
