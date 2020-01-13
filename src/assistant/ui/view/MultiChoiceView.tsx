import React from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { QuestionItemModel } from '../../paper/model/QuestionItemModel';

interface Props {
  answer: string
  items: QuestionItemModel[]
  onSetAnswer:(answer: string) => void
}

interface State {
}

@reactAutobind
@observer
class MultiChoiceView extends React.Component<Props, State> {
  //
  render() {
    const { answer, items, onSetAnswer } = this.props;

    const answers = answer && answer.length && answer.split(',') || [];

    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.itemNo + '_item'}>
              <Checkbox
                className="base"
                label={item.itemText}
                value={item.itemNo}
                checked={answers.includes(item.itemNo)}
                onChange={(e: any) => {
                  const value = e.target.value;
                  let newAnswers = [];
                  let newAnswer = '';
                  if (answers.includes(value)) {
                    newAnswers = answers.filter(ans => ans !== value);
                  }
                  else {
                    newAnswers = answers.concat([value]);
                  }
                  newAnswers.map(ans => {
                    if (newAnswer) newAnswer += `,${ans}`;
                    else newAnswer = ans;
                  });
                  onSetAnswer(newAnswer);
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
