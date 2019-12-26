
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';


interface Props {
  className?: string,
  inner?: boolean,
  children: React.ReactNode,
}

@reactAutobind
class ContentHeaderCell extends Component<Props> {
  //
  render() {
    //
    const { className, inner, children } = this.props;


    return (
      <div className={classNames('cell', className)}>
        {inner ?
          <div className="cell-inner">{children}</div>
          :
          children
        }
      </div>
    );
  }
}

export default ContentHeaderCell;
