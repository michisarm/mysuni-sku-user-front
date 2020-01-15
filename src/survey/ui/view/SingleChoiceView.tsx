import React from 'react';
import { List, Radio } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { AnswerItemModel } from '../../answer/model/AnswerItemModel';
import { NumberValue } from '../../form/model/NumberValue';
import { QuestionModel } from '../../form/model/QuestionModel';

interface Props {
  question: QuestionModel
  answer: AnswerItemModel
  items: NumberValue[]
  onSetAnswer:(answer: string[]) => void
}

interface State {
}

@reactAutobind
@observer
class SingleChoiceView extends React.Component<Props, State> {
  //
  render() {
    const { answer, question, items, onSetAnswer } = this.props;

    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.number + '_item'}>
              <Radio
                className="base"
                label={item.value}
                name={`survey_radio_${question.sequence.toSequenceString()}`}
                value={item.number}
                checked={answer.itemNumbers.includes(item.number)}
                onChange={(e: any, data: any) => {
                  const newItemNumbers = [ data.value ];
                  onSetAnswer(newItemNumbers);
                }}
              />
            </List.Item>
          )) || null
        }
      </List>
    );
  }
}

export default SingleChoiceView;
