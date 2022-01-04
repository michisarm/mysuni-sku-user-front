import moment from 'moment';
import React, { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyDateView: React.FC<LectureSurveyDateViewProps> =
  function LectureSurveyDateView({
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
    let datePickerValue =
      lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence;
    if (datePickerValue === null) {
      datePickerValue = '';
    }
    return (
      <LectureSurveyChoiceLayout {...lectureSurveyItem}>
        <div className="ui h40 calendar" id="rangestart">
          <div style={{ margin: '20px 0' }}>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>
          <div className="ui input right icon">
            <DatePicker
              onChange={onChangeValue}
              selectsStart
              dateFormat="YYYY-MM-DD"
              value={datePickerValue}
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
              <div className="rev-noti">
                <Icon className="error16" />
                <span>
                  <PolyglotText
                    defaultString="해당 문항은 필수 항목 입니다."
                    id="survey-필수항목-alert2"
                  />
                </span>
              </div>
            ))}
      </LectureSurveyChoiceLayout>
    );
  };

export default LectureSurveyDateView;
