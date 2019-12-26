
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';

import ThumbnailCell from './sub/ThumbnailCell';
import TitleCell from './sub/TitleCell';
import RightCell from './sub/RightCell';
import StarRatingItem from './sub/StarRatingItem';
import StampItem from './sub/StampItem';


interface Props {
  className?: string,
  bottom?: React.ReactNode,
  children: React.ReactNode,
}

@reactAutobind
class LectureContentHeader extends Component<Props> {
  //
  static ThumbnailCell = ThumbnailCell;

  static TitleCell = TitleCell;

  static RightCell = RightCell;

  static StarRatingItem = StarRatingItem;

  static StampItem =  StampItem;


  render() {
    //
    const { className, bottom, children } = this.props;

    return (
      <div className={classNames('main-info-area', className)}>
        <div className="main-info-wrap">
          {children}
        </div>
        {bottom}
      </div>
    );
  }
}

export default LectureContentHeader;
