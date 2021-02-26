import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { useLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyEssayView: React.FC<LectureSurveyEssayViewProps> = function LectureSurveyEssayView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();

  const [number, setNumber] = useState(9);

  const setCheckNumber = () => {
    setNumber(number + 9);
  };

  const lastIndex =
    answerList?.find(f => f.answerItemType === 'Essay')?.summaryItems.sentences
      ?.length || 0;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-radio-survey-new">
        <div className="course-survey-list">
          <p className="improve-text">
            {lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
          </p>
          <ul className="improve-list">
            {lectureSurveyItem.visible !== undefined &&
              lectureSurveyItem.visible === true &&
              answerList
                ?.filter(f => f.answerItemType === 'Essay')
                .map(answer =>
                  answer.summaryItems.sentences?.map((result, index) => (
                    <>
                      {index >= 0 && index <= number ? <li>{result}</li> : ''}
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
                  <span onClick={setCheckNumber}>
                    더보기 ({lastIndex - number - 1}개)
                  </span>
                </>
              ) : (
                ''
              )}
            </li>
          </ul>
        </div>
        {lectureSurveyItem.visible !== undefined &&
          lectureSurveyItem.visible !== true &&
          '해당 문항은 비공개 처리되어 답변이 조회되지 않습니다.'}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyEssayView;
