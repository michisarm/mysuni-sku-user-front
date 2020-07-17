
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import classNames from 'classnames';


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
        <div className="list-number">총 <strong>{count || 0}개</strong>의 {countMessage ? countMessage : '리스트가 있습니다.'}</div>
        { children }
      </div>
    );
  }
}

export default ListPanelTopLineContainer;
