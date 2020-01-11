
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

  panelRef = React.createRef<HTMLDivElement>();


  getPanelRef() {
    return this.panelRef.current;
  }

  render() {
    //
    const { icon, className, header, children } = this.props;

    return (
      <div
        className={classNames('ov-paragraph', className)}
      >
        {header}
        <div ref={this.panelRef}>
          <SemanticList bulleted={!icon}>
            {children}
          </SemanticList>
        </div>
      </div>
    );
  }
}

export default List;
