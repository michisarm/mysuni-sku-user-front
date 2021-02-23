import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';

import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Icon, Form } from 'semantic-ui-react';
import {
  getLectureSurveyAnswerSummaryList,
  useLectureSurveyAnswerSummaryList,
} from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveySummaryDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const { sentencesMap } = lectureSurveyItem;
  const answerList = useLectureSurveyAnswerSummaryList();
  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
      selectSentenceAnswer(lectureSurveyItem, next);
    },
    [lectureSurveyItem]
  );
  let count: number | undefined;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="ui right-top-count input">
        {lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
        <br />
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryDateView;
