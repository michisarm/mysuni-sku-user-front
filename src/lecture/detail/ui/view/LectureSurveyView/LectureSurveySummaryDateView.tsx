import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';

import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Icon, Form } from 'semantic-ui-react';
import { getLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
}

const LectureSurveySummaryDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveySummaryDateView({
  lectureSurveyItem,
}) {  
  const answerList = getLectureSurveyAnswerSummaryList();
  const onChangeValue = useCallback(
    (value: Date) => {
      const next = moment(value).format('YYYY-MM-DD');
      selectSentenceAnswer(lectureSurveyItem, next);
    },
    [lectureSurveyItem]
  );
  let dateMap : string[] = [];
  let countMap : number[] = [];

  {answerList?.map(answer => {
    if(answer.summaryItems.answerItemType === 'Date') {
      dateMap = Object.keys(answer.summaryItems.sentencesMap);
      countMap = Object.values(answer.summaryItems.sentencesMap);
    }
  })}
  
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <Form>
        <Form.Field>
          <div className="ui right-top-count input">
            {dateMap.map((key,idx) => {
            return (
              <>
                <div dangerouslySetInnerHTML={{ __html: key + '(' + countMap[idx] + ')' }} />
              </>
            );
          })}
          </div>
        </Form.Field>
      </Form>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryDateView;
