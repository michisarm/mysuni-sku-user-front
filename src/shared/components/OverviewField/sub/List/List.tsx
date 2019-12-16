
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import classNames from 'classnames';
import { List as SemanticList } from 'semantic-ui-react';


interface Props {
  icon?: boolean,
  className?: string,
  header?:  React.ReactNode,
  children: React.ReactNode,
}

@reactAutobind
class List extends Component<Props> {
  //
  static defaultProps = {
    icon: false,
    className: '',
    header: undefined,
  };

  render() {
    //
    const { icon, className, header, children } = this.props;

    return (
      <div className={classNames('ov-paragraph', className)}>
        {header}
        <SemanticList bulleted={!icon}>
          {children}
        </SemanticList>
      </div>
    );
  }
}

export default List;
