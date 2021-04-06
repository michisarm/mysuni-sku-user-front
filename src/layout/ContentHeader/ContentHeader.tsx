
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';
import Cell from './sub/Cell';
import ProfileItem from './sub/ProfileItem';
import LearningTimeItem from './sub/LearningTimeItem';
import WaitingItem from './sub/WaitingItem';
import ChartItem from './sub/ChartItem';
import CommunityItem from './sub/CommunityItem';
import RecommendItem from './sub/RecommendItem';


interface Props {
  className?: string,
  bottom?: React.ReactNode,
  children: React.ReactNode,
  type?: string
}

@reactAutobind
class ContentHeader extends Component<Props> {
  //
  static Cell = Cell;

  static ProfileItem = ProfileItem;

  static LearningTimeItem = LearningTimeItem;

  static WaitingItem = WaitingItem;

  static ChartItem = ChartItem;

  static CommunityItem = CommunityItem;

  static RecommendItem = RecommendItem;

  typeClass(type?: string) {
    let classNames = 'progress-info-wrap'
    if(type === 'Learning' || type === 'Create') {
      classNames += ' mypage personal-detail'
    }
    return classNames
  }

  render() {
    //
    const { className, bottom, children, type } = this.props;
    return (
      <div className={classNames('main-info-area', className)}>
        <div className={this.typeClass(type)}>
          {children}
        </div>
        {bottom}
      </div>
    );
  }
}

export default ContentHeader;
