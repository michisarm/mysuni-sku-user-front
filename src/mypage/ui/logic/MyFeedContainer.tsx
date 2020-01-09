
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import CardGroup, { LearningCardContext, GroupType } from '../../../lecture/shared/Lecture/sub/CardGroup';
import LineHeader from '../../../lecture/shared/Lecture/sub/LineHeader';
import Course from '../../../lecture/shared/Lecture/sub/Course';
import CourseSection from '../../../lecture/shared/Lecture/sub/CourseSection';

import Action from '../../../lecture/shared/Lecture/model/Action';
import { ActionType } from '../../../lecture/shared/Lecture/model';
import MyFeedView from '../view/MyFeedView';
import MyFeedModel from '../../model/MyFeedModel';


interface Props {
  model: MyFeedModel,
  thumbnailImage?: string,
}

interface ActionWith extends Action {
  type: ActionType,
}

/**
 * 러닝카드 컴포넌트입니다.
 */
// @inject(({ learning }) => ({ cardService: learning.cardService }))
@reactAutobind
@observer
class LectureContainer extends Component<Props> {
  //
  static Group = CardGroup;

  static LineHeader = LineHeader;

  static CourseSection = CourseSection;

  static Course = Course;

  static GroupType = GroupType;

  static ActionType = ActionType;

  static contextType = LearningCardContext;

  static defaultProps = {
    thumbnailImage: null,
  };

  onBackLink() {

  }

  onRead() {

  }

  renderFeedCard() {
    const {
      model, thumbnailImage,
    } = this.props;

    return(
      <MyFeedView model={model} onBackLink={this.onBackLink} onRead={this.onRead}/>
    );
  }


  render() {
    //
    const { groupType } = this.context;

    return this.renderFeedCard();
  }
}

export default LectureContainer;
