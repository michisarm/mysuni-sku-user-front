
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { Context } from 'layout/UserApp';


interface Props extends RouteComponentProps {

  children: React.ReactNode,

  /** CSS className: html의 <div className="content"> 에 추가로 들어가는 클래스명을 명시합니다. */
  className?: string,

  disabled?: boolean

  /** breadcrumb (page navigation) */
  breadcrumb?: Breadcrumb[],

  /** 내부사용 context */
  context?: any,
}

interface Breadcrumb {
  text: string,
  path?: string,
}


@reactAutobind
class ContentLayoutContainer extends Component<Props> {
  //
  static contextType = Context;


  componentDidMount() {
    //
    this.initScrollTop();
    this.setBreadcrumb(this.props.breadcrumb);
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.breadcrumb !== this.props.breadcrumb) {
      this.setBreadcrumb(this.props.breadcrumb);
    }
  }

  initScrollTop() {
    //
    window.scrollTo(0, 0);
  }

  setBreadcrumb(breadcrumb?: Breadcrumb[]) {
    //
    const { breadcrumb: breadcrumbContext } = this.context;

    breadcrumbContext.setBreadcrumb(breadcrumb);
  }


  render() {
    //
    const { className, disabled, children } = this.props;

    if (disabled) {
      return children;
    }

    return (
      <section className={classNames('content', className)}>
        {children}
      </section>
    );
  }
}

export default withRouter(ContentLayoutContainer);
