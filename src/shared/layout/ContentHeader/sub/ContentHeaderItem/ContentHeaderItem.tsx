
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';


interface Props {
  className?: string,
  children: React.ReactNode,
}

@reactAutobind
class ContentHeaderItem extends Component<Props> {
  //
  render() {
    //
    const { className, children } = this.props;

    return (
      <div className={classNames('cell', className)}>
        {children}
      </div>
    );
  }
}

export default ContentHeaderItem;
