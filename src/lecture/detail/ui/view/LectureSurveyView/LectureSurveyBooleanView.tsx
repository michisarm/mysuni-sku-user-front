import React, { useCallback } from 'react';
import { selectBooleanAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyBooleanViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyBooleanView: React.FC<LectureSurveyBooleanViewProps> =
  function LectureSurveyBooleanView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
    lectureSurveyState,
  }) {
    const onChangeValue = useCallback(() => {
      const next =
        lectureSurveyAnswerItem !== undefined &&
        lectureSurveyAnswerItem.itemNumbers !== undefined &&
        lectureSurveyAnswerItem.itemNumbers[0] === '1'
          ? '0'
          : '1';
      selectBooleanAnswer(lectureSurveyItem, next);
    }, [lectureSurveyItem, lectureSurveyAnswerItem]);
    const { questionNumber } = lectureSurveyItem;

    return (
      <LectureSurveyChoiceLayout {...lectureSurveyItem}>
        <div className="preview">
          <div style={{ margin: '20px 0' }}>
            {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
          </div>
          <div
            className="lms-toggle init"
            style={{ position: 'relative', top: '0' }}
          >
            {/*처음 로딩시 className="lms-switch init"*/}
            {/*클릭이후  className="lms-switch"*/}
            <label
              htmlFor={questionNumber}
              className={`lms-switch ${
                lectureSurveyAnswerItem === undefined ||
                lectureSurveyAnswerItem.itemNumbers === undefined
                  ? 'init'
                  : ''
              }`}
            >
              <input
                type="checkbox"
                id={questionNumber}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers[0] === '1'
                }
                onChange={onChangeValue}
              />
              <span className="slider" />
              <span className="lms-radio-text" />
            </label>
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

export default LectureSurveyBooleanView;
