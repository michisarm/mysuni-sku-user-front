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
import { value } from 'numeral';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveySummaryDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const { sentencesMap } = lectureSurveyItem;

  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
      selectSentenceAnswer(lectureSurveyItem, next);
    },
    [lectureSurveyItem]
  );

  console.log('sentencesMap', sentencesMap);

  if (sentencesMap !== undefined) {
    const keys = Object.keys(sentencesMap);
    const values = Object.values(sentencesMap);
    console.log(keys);
    console.log(values);
  }
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
