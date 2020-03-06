import React from 'react';
import { List, Radio } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { AnswerItemModel } from '../../answer/model/AnswerItemModel';
import { CriteriaItemModel } from '../../form/model/CriteriaItemModel';
import { QuestionModel } from '../../form/model/QuestionModel';

interface Props {
  question: QuestionModel
  answer: AnswerItemModel
  disabled?: boolean
  items: CriteriaItemModel[]
  onSetAnswer:(answer: CriteriaItemModel) => void
}

interface State {
}

@reactAutobind
@observer
class CriterionView extends React.Component<Props, State> {
  //
  render() {
    const { answer, question, disabled, items, onSetAnswer } = this.props;

    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.index + '_item'}>
              <Radio
                className="base"
                label={item.name}
                name={`survey_criterion_${question.sequence.toSequenceString()}`}
                value={item.value}
                item={item}
                readOnly={disabled}
                checked={(answer.criteriaItem.value || answer.criteriaItem.value === 0 ) && answer.criteriaItem.value === item.value || false}
                onChange={(e: any, prop: any) => {
                  onSetAnswer(prop.item);
                }}
              />
            </List.Item>
          )) || null
        }
      </List>
    );
  }
}

export default CriterionView;
