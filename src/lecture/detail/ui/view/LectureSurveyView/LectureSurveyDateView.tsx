import moment from 'moment';
import React, { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveyDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
      selectSentenceAnswer(lectureSurveyItem, next);
    },
    [lectureSurveyItem]
  );
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="ui h40 calendar" id="rangestart">
        <div className="ui input right icon">
          <DatePicker
            onChange={onChangeValue}
            selectsStart
            dateFormat="YYYY-MM-DD"
            value={lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
          />
          <i className="calendar24 icon">
            <span className="blind">date</span>
          </i>
        </div>
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyDateView;
