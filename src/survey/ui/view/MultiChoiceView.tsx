import React from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { AnswerItemModel } from '../../answer/model/AnswerItemModel';
import { NumberValue } from '../../form/model/NumberValue';

interface Props {
  answer: AnswerItemModel
  disabled?: boolean
  items: NumberValue[]
  onSetAnswer:(answer: string[]) => void
}

interface State {
}

@reactAutobind
@observer
class MultiChoiceView extends React.Component<Props, State> {
  //
  render() {
    const { answer, disabled, items, onSetAnswer } = this.props;

    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.number + '_item'}>
              <Checkbox
                className="base"
                label={item.value}
                value={item.number}
                readOnly={disabled}
                checked={answer.itemNumbers.includes(item.number)}
                onChange={(e: any, data: any) => {
                  const value = data.value;
                  let newItemNumbers: string[] = [];
                  if (answer.itemNumbers.includes(value)) {
                    newItemNumbers = answer.itemNumbers.filter(number => number !== value);
                  }
                  else {
                    newItemNumbers = answer.itemNumbers.concat([value]);
                  }
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

export default MultiChoiceView;
