
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import {getPolyglotText, PolyglotText} from '../../ui/logic/PolyglotText';


interface Props {
  count: number,
  className?: string,
  countMessage?: string
}

@reactAutobind
@observer
class ListPanelTopLineContainer extends Component<Props> {
  //
  render() {
    //
    const { className, count, children, countMessage } = this.props;

    return (
      <div className={classNames('top-guide-title', className)}>
        <div className="list-number">
          <PolyglotText defaultString="총" id="Create-MainList-총" />{' '}
          <strong>
            {count || 0}<PolyglotText defaultString="개" id="Create-MainList-개" />
          </strong>
          <PolyglotText defaultString="의" id="Create-MainList-의" />{' '}
          {countMessage ? countMessage : getPolyglotText('리스트가 있습니다.', 'Create-MainList-리스트')}
        </div>
        { children }
      </div>
    );
  }
}

export default ListPanelTopLineContainer;
