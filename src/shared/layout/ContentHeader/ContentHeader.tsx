
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import ContentHeaderItem from './sub/ContentHeaderItem';
import ContentHeaderProfile from './sub/ContentHeaderProfile';


interface Props {
  className?: string,
  children: React.ReactNode,
}

@reactAutobind
class ContentHeader extends Component<Props> {
  //
  static Item = ContentHeaderItem;

  static Profile = ContentHeaderProfile;

  render() {
    //
    const { className, children } = this.props;

    return (
      <div className={classNames('main-info-area', className)}>
        <div className="progress-info-wrap">
          {children}
        </div>
      </div>
    );
  }
}

export default ContentHeader;
