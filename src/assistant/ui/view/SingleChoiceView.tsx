import React from 'react';
import { List, Radio } from 'semantic-ui-react';
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
class SingleChoiceView extends React.Component<Props, State> {
  //
  render() {
    const { answer, items, onSetAnswer } = this.props;

    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.itemNo + '_item'}>
              <Radio
                className="base"
                label={item.itemText}
                name="radioGroup"
                value={item.itemNo}
                checked={answer === item.itemNo}
                onChange={(e: any) => onSetAnswer(e.target.value)}
              />
            </List.Item>
          )) || null
        }
      </List>
    );
  }
}

export default SingleChoiceView;
