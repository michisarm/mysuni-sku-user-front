import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useCallback, Fragment } from 'react';
import { CheckboxProps, Icon, Radio } from 'semantic-ui-react';
import { selectChoiceFixedAnswer } from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from 'lecture/detail/viewModel/LectureSurveyState';

import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface CommonUseType {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

export default function LectureSurveyChoiceFixedView(prop: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    prop;

  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceFixedAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer } = lectureSurveyItem;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      {!canMultipleAnswer && (
        <div className="survey-core core1">
          <div className="core-radiogroup">
            <Fragment>
              <Radio
                className="iconRadio radio05"
                label={getPolyglotText('전혀 아니다', 'survey-review-Notatall')}
                value={1}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`1`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio04"
                label={getPolyglotText('아니다', 'survey-review-Disagree')}
                value={2}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`2`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio03"
                label={getPolyglotText('보통이다', 'survey-review-Average')}
                value={3}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`3`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio02"
                label={getPolyglotText('그렇다', 'survey-review-Agree')}
                value={4}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`4`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio01"
                label={getPolyglotText(
                  '매우 그렇다',
                  'survey-review-Highlyagree'
                )}
                value={5}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`5`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
            </Fragment>
          </div>
        </div>
      )}

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
}
