import React from 'react';
import { List, Radio } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { AnswerItemModel } from '../../answer/model/AnswerItemModel';
import { CriteriaItemModel } from '../../form/model/CriteriaItemModel';
import { NumberValue } from '../../form/model/NumberValue';

interface Props {
  answer: AnswerItemModel
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
    const { answer, items, onSetAnswer } = this.props;
    return (
      <List>
        {
          items && items.length
          && items.map(item => (
            <List.Item key={item.index + '_item'}>
              <Radio
                className="base"
                label={item.name}
                name="radioGroup"
                value={item.value}
                item={answer.criteriaItem}
                checked={answer.criteriaItem.value === item.value}
                onChange={(e: any, prop: any) => onSetAnswer(prop.item)}
              />
            </List.Item>
          )) || null
        }
      </List>
    );
  }
}

export default CriterionView;
