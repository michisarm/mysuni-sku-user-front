import React from 'react';
import { Icon } from 'semantic-ui-react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { AnswerItemModel } from '../../answer/model/AnswerItemModel';

interface Props {
  answer: AnswerItemModel
  disabled?: boolean
  onSetAnswer:(answer: string) => void
}

interface State {
  focus: boolean
  error: boolean
}

@reactAutobind
@observer
class ShortAnswerView extends React.Component<Props, State> {
  //
  state = {
    focus: false,
    error: false,
  };

  render() {
    const { focus, error } = this.state;
    const { answer, disabled, onSetAnswer } = this.props;
    const { sentence } = answer;

    return (
      <div className={classNames('ui right-top-count input', { focus, write: answer && !disabled, error })}>
        <span className="count"><span className="now">{sentence.length}</span>/<span className="max">100</span></span>
        <input
          type="text"
          placeholder="답변을 입력해주세요. (최대 100자 입력 가능)"
          value={sentence}
          disabled={disabled}
          onClick={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onChange={(e) => {
            if (e.target.value.length > 100 ) {
              this.setState({ error: true });
            } else {
              this.setState({ error: false });
              onSetAnswer(e.target.value);
            }
          }}
        />
        <Icon
          className="clear link"
          onClick={() => {
            this.setState({ error: false });
            onSetAnswer('');
          }}
        />
        <span className="validation">You can enter up to 100 characters.</span>
      </div>
    );
  }
}

export default ShortAnswerView;
