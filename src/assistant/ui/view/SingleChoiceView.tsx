import React from 'react';
import { List, Radio } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import cx from 'classnames';

import { QuestionItemModel } from '../../paper/model/QuestionItemModel';
import { ExamQuestionModel } from '../../paper/model/ExamQuestionModel';

interface Props {
  type?: string;
  answer: string;
  question: ExamQuestionModel;
  items: QuestionItemModel[];
  onSetAnswer: (answer: string) => void;
}

interface State {}

@reactAutobind
@observer
class SingleChoiceView extends React.Component<Props, State> {
  //
  render() {
    const { type, answer, question, items, onSetAnswer } = this.props;

    return (
      <List>
        {(items &&
          items.length &&
          items.map(item => (
            <List.Item key={item.itemNo + '_item'}>
              <Radio
                className="base"
                label={
                  <label
                    dangerouslySetInnerHTML={{
                      __html: `${item.itemNo}. ${item.itemText}`,
                    }}
                  />
                }
                name={`test_${question.questionNo}`}
                value={item.itemNo}
                checked={answer === item.itemNo}
                onChange={(e: any, data: any) => onSetAnswer(data.value)}
                {...(type === '5' && { readOnly: true })}
              />
            </List.Item>
          ))) ||
          null}
      </List>
    );
  }
}

export default SingleChoiceView;
