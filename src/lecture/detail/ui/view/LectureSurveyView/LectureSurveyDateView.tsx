import moment from 'moment';
import React, { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Image } from 'semantic-ui-react';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveyDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
  lectureSurveyState,
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

      {lectureSurveyState === undefined ||
        (lectureSurveyState.state === 'Progress' &&
          lectureSurveyItem.isRequired === true &&
          lectureSurveyAnswerItem === undefined && (
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
          ))}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyDateView;
