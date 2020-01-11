
import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import CardGroup, { LearningCardContext, GroupType } from '../../../lecture/shared/Lecture/sub/CardGroup';
import LineHeader from '../../../lecture/shared/Lecture/sub/LineHeader';
import Course from '../../../lecture/shared/Lecture/sub/Course';
import CourseSection from '../../../lecture/shared/Lecture/sub/CourseSection';

import Action from '../../../lecture/shared/Lecture/model/Action';
import { ActionType } from '../../../lecture/shared/Lecture/model';
import MyFeedView from '../view/MyFeedView';
import MyFeedModel from '../../model/MyFeedModel';
import { MyFeedService } from '../../index';



interface Props {
  model: MyFeedModel,
  thumbnailImage?: string,
  index: number,

  myFeedService?: MyFeedService,
}

interface ActionWith extends Action {
  type: ActionType,
}

/**
 * My Feed 컴포넌트입니다.
 */
@inject(mobxHelper.injectFrom(
  'myTraining.myFeedService',
))
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

  //Feed를 등록한 컨텐츠 URL
  onBackLink(backLink: string) {
    const { myFeedService, index } = this.props;
    window.location.href = backLink;
    myFeedService!.clearOnce(index);
  }

  // onRead(notieId: string) {
  //   const { myFeedService, index } = this.props;
  //   myFeedService!.onReadNotie(notieId);
  //   myFeedService!.clearOnce(index);
  // }

  onRead(notieId: string, feedType: string) {
    const { myFeedService, index } = this.props;
    myFeedService!.onReadNotie(notieId, feedType);
    myFeedService!.clearOnce(index);
  }

  renderFeedCard() {
    const {
      model, thumbnailImage,
    } = this.props;

    return (
      <MyFeedView model={model} onBackLink={this.onBackLink} onRead={this.onRead} />
    );
  }


  render() {
    //
    const { groupType } = this.context;

    return this.renderFeedCard();
  }
}

export default LectureContainer;
