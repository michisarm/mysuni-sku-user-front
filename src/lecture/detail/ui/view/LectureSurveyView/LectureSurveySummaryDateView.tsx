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
  const sentence = lectureSurveyAnswerItem?.sentence;

  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
      selectSentenceAnswer(lectureSurveyItem, next);
    },
    [lectureSurveyItem]
  );

  if (sentencesMap === undefined) {
    return null;
  }
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      {Object.keys(sentencesMap)
        .sort((a, b) => (a > b ? 1 : -1))
        .map(key => (
          <div
            className={`ui right-top-count input ${
              key === sentence ? 'active' : ''
            }`}
          >
            {key}
            <br />
            {sentencesMap[key]}
            <br />
          </div>
        ))}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryDateView;
