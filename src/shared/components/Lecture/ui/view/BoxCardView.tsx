
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
// import numeral from 'numeral';
import { Card, Icon, Rating, Button } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LectureModel } from 'lecture';
import Action from '../../present/model/Action';
import { Title, Fields, Field, Buttons, Thumbnail, Ribbon } from './LectureElementsView';


interface Props {
  lecture: LectureModel,
  hovered: boolean,
  rating?: number,
  thumbnailImage?: string,
  action?: Action,
  onHover?: () => void,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
}

interface States {
  hovered: boolean,
}


@reactAutobind
@observer
class BoxCardView extends Component<Props, States> {
  //
  static defaultProps = {
    rating: null,
    thumbnailImage: null,
    action: null,
    onHover: () => {},
    onAction: () => {},
    onViewDetail: () => {},
  };


  renderBottom() {
    //
    const { rating } = this.props;

    return (
      <div className="foot-area">
        { typeof rating === 'number' && (
          <div className="fixed-rating">
            <Rating className="rating-num" size="small" disabled rating={rating} maxRating={5} />
          </div>
        )}

        {/* Todo: 기획, 도메인 확인 후 속성명 정의하여 props에 추가 */}
        {/*<Label className="bold onlytext">*/}
        {/*  <Icon className="state" /><span>Required</span> // In Progress, Enrolled, Completed, Cancelled */}
        {/*</Label>*/}
        {/*<div className="study-date">19.10.10 필수 학습 등록</div>*/}
      </div>
    );
  }

  render() {
    //
    const {
      lecture, hovered, thumbnailImage, action,
      onHover, onAction, onViewDetail,
    } = this.props;
    const { hour, minute } = dateTimeHelper.timeToHourMinute(lecture!.learningTime);
    const  hourAndMinute = `${hour > 0 ? `${hour}h ` : ''}${minute > 0 ? `${minute}m` : ''}`;

    return (
      <Card
        className={classNames({
          'card-h': true,
          on: hovered,
        })}
        onMouseEnter={onHover}
        onMouseLeave={onHover}
      >
        {/* Todo: stampReady */}
        <Ribbon stampReady={false} required={lecture!.required} />

        <div className="card-inner">
          <Thumbnail image={thumbnailImage} />

          <Title title={lecture.name} category={lecture.category} />

          <Fields>
            { lecture.cubeTypeName && <Field icon="video2" text={lecture.cubeTypeName} bold />}
            { hourAndMinute && <Field icon="time2" text={hourAndMinute} bold />}
            {/* Todo: 이수 */}
            {/*<Field icon="complete" text={`이수 ${numeral(lecture!.countOfComplete).format('0,0')}명`} />*/}
            {/*<Field icon="complete" text="이수 (?)명" />*/}
          </Fields>

          {this.renderBottom()}
        </div>

        {/* hover 시 컨텐츠 */}
        <div className="hover-content">
          <Title title={lecture.name} category={lecture.category} />

          <p className="text-area">
            {lecture.description}
          </p>

          <Buttons>
            { action && (
              <Button icon className="icon-line" onClick={onAction}>
                <Icon className={action.iconName} />
              </Button>
            )}
            <Button className="fix bg" onClick={onViewDetail}>View Details</Button>
          </Buttons>
        </div>
      </Card>
    );
  }
}

export default BoxCardView;
