
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LectureModel, LectureViewModel } from 'lecture/index';
import CardGroup, { LearningCardContext, GroupType } from '../../sub/CardGroup';
import LineHeader from '../../sub/LineHeader';
import Course from '../../sub/Course';
import CourseSection from '../../sub/CourseSection';

import Action from '../../model/Action';
import { ActionType } from '../../model';
import BoxCardView from '../view/BoxCardView';
import ListCardView from '../view/ListCardView';
import CourseLectureContainer from '../../sub/Course/CourseLectureContainer';
import CommunityLectureContainer from '../../sub/Community/CommunityLectureContainer';


export interface OnViewDetailData {
  lecture: LectureModel,
}

interface Props {
  lecture: LectureModel,
  lectureView?: LectureViewModel,
  rating?: number,
  thumbnailImage?: string,
  action?: Action | ActionType,
  toggle?: boolean,
  onAction?: () => void,
  onViewDetail?: (e: any, data: OnViewDetailData ) => void,
  onToggle?: (openState: boolean) => void,
}

interface States {
  hovered: boolean,
  open: boolean,
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
class LectureContainer extends Component<Props, States> {
  //
  static Group = CardGroup;

  static LineHeader = LineHeader;

  static CourseSection = CourseSection;

  static Course = Course;

  static GroupType = GroupType;

  static ActionType = ActionType;

  static contextType = LearningCardContext;

  static defaultProps = {
    rating: null,
    thumbnailImage: null,
    action: null,
    toggle: false,
    onAction: () => {},
    onViewDetail: () => {},
  };

  static defaultActions: ActionWith[] = [
    { type: ActionType.Add,           iconName: 'add-list' },
    { type: ActionType.Remove,        iconName: 'remove2' },
    { type: ActionType.My,            iconName: 'my' },
    { type: ActionType.Play,          iconName: 'play2',      text: 'Play' },
    { type: ActionType.LearningStart, iconName: 'play2',      text: 'LearningStart' },
    { type: ActionType.Download,      iconName: 'download2',  text: 'Download' },
    { type: ActionType.Join,          iconName: 'join',       text: 'Join' },
  ];

  state = {
    hovered: false,
    open: false,
  };


  onHoverIn() {
    this.setState({
      hovered: true,
    });
  }

  onHoverOut() {
    this.setState({
      hovered: false,
    });
  }

  onToggleCourse() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  getAction() {
    //
    const { action } = this.props;
    let newAction: Action | undefined;

    const act: ActionWith | undefined = LectureContainer.defaultActions
      .find((defaultAction) => defaultAction.type === action);

    if (act) {
      newAction = {
        iconName: act.iconName,
        text: act.text,
      };
    }
    else {
      newAction = action as Action;
    }
    return newAction;
  }

  onViewDetail(e: any) {
    //
    const { lecture, onViewDetail } = this.props;
    const data = {
      lecture,
    };

    onViewDetail!(e, data);
  }

  renderBoxCard() {
    //
    const {
      lecture, rating, thumbnailImage,
      onAction,
    } = this.props;
    const { hovered } = this.state;

    return (
      <BoxCardView
        lecture={lecture}
        hovered={hovered}
        rating={rating}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        onAction={onAction}
        onViewDetail={this.onViewDetail}
        onHoverIn={this.onHoverIn}
        onHoverOut={this.onHoverOut}
      />
    );
  }

  renderListCard() {
    //
    const {
      lecture, thumbnailImage,
      onAction,
    } = this.props;

    return (
      <ListCardView
        lecture={lecture}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        onAction={onAction}
      />
    );
  }

  renderLineCard() {
    //
    const {
      lecture, rating, thumbnailImage,
      onAction,
    } = this.props;
    const { hovered } = this.state;

    return (
      <li>
        <CardGroup type={GroupType.Box}>
          <BoxCardView
            lecture={lecture}
            hovered={hovered}
            rating={rating}
            thumbnailImage={thumbnailImage}
            action={this.getAction()}
            onAction={onAction}
            onViewDetail={this.onViewDetail}
            onHoverIn={this.onHoverIn}
            onHoverOut={this.onHoverOut}
          />
        </CardGroup>
      </li>
    );
  }

  renderCourseCard() {
    //
    const {
      lectureView, thumbnailImage, toggle,
      onAction,
    } = this.props;
    const { open } = this.state;

    return (
      <CourseLectureContainer
        lectureView={lectureView || {} as any}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        toggle={toggle}
        open={open}
        onAction={onAction}
        onViewDetail={this.onViewDetail}
        onToggle={this.onToggleCourse}
      />
    );
  }

  renderCommunityCard() {
    //
    const {
      lectureView, thumbnailImage, toggle,
      onAction,
    } = this.props;
    const { open } = this.state;

    return (
      <CommunityLectureContainer
        lectureView={lectureView || {} as any}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        toggle={toggle}
        open={open}
        onAction={onAction}
        onViewDetail={this.onViewDetail}
        onToggle={this.onToggleCourse}
      />
    );
  }

  render() {
    //
    const { groupType } = this.context;

    if (groupType === GroupType.Box) {
      return this.renderBoxCard();
    }
    else if (groupType === GroupType.List) {
      return this.renderListCard();
    }
    else if (groupType === GroupType.Line) {
      return this.renderLineCard();
    }
    else if (groupType === GroupType.Course) {
      return this.renderCourseCard();
    }
    else if (groupType === GroupType.Community) {
      return this.renderCommunityCard();
    }
    return null;
  }
}

export default LectureContainer;
