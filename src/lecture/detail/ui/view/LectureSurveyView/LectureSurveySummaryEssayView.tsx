import React, { ChangeEvent, useCallback, useState } from 'react';
import { Checkbox, Form, Icon, Radio, Button } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurvey, {
  LectureSurveyItem,
} from '../../../viewModel/LectureSurvey';
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
      {lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
      <br />

      {lectureSurveyItem.visible !== undefined &&
        lectureSurveyItem.visible === true &&
        answerList
          ?.filter(f => f.answerItemType === 'Essay')
          .map(answer =>
            answer.summaryItems.sentences?.map((result, index) => (
              <>{index >= 0 && index <= number ? <div>{result}</div> : ''}</>
            ))
          )}

      {lectureSurveyItem.visible !== undefined &&
      lectureSurveyItem.visible === true &&
      lastIndex - 1 > number ? (
        <div>
          <Button icon className="left moreview" onClick={setCheckNumber}>
            <Icon className="moreview" />
            더보기 ({lastIndex - number - 1}개)
          </Button>
        </div>
      ) : (
        ''
      )}

      {lectureSurveyItem.visible !== undefined &&
        lectureSurveyItem.visible !== true &&
        '해당 문항은 비공개 처리되어 답변이 조회되지 않습니다.'}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyEssayView;
