
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';


interface Props {
  className?: string,
  children: React.ReactNode,
}


@reactAutobind
class ContentLayoutContainer extends Component<Props> {
  //
  render() {
    //
    const { className, children } = this.props;

    return (
      <section className={classNames('content', className)}>
        {children}
      </section>
    );
  }
}

export default ContentLayoutContainer;
