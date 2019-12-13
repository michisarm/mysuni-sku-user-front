
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import { Context } from 'shared/layout/UserApp';


interface Props {

  children: React.ReactNode,

  /** CSS className: html의 <div className="content"> 에 추가로 들어가는 클래스명을 명시합니다. */
  className?: string,

  /** breadcrumb (page navigation) */
  breadcrumb?: { text: string, path?: string }[],

  /** 내부사용 context */
  context?: any,
}


@reactAutobind
class ContentLayoutContainer extends Component<Props> {
  //
  static contextType = Context;


  componentDidMount() {
    //
    const { breadcrumb: breadcrumbContext } = this.context;
    const { breadcrumb } = this.props;

    breadcrumbContext.setBreadcrumb(breadcrumb);
  }

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
