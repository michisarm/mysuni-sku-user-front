
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Card, Icon, Button } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LectureModel } from 'lecture';
import Action from '../../present/model/Action';
import {
  Title, Fields, Field, Buttons, Thumbnail, Ribbon,
} from './LectureElementsView';


interface Props {
  lecture: LectureModel,
  thumbnailImage?: string,
  action?: Action,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
}

@reactAutobind
@observer
class ListCardView extends Component<Props> {
  //
  static defaultProps = {
    thumbnailImage: null,
    action: null,
    onAction: () => {},
    onViewDetail: () => {},
  };

  render() {
    //
    const {
      lecture, thumbnailImage, action,
      onAction,
    } = this.props;
    console.log(this.props);
    const { hour, minute } = dateTimeHelper.timeToHourMinute(lecture.learningTime);

    return (
      <Card>
        <div className="card-inner">
          {/* Todo: stampReady, 미사용이면 제거 */}
          <Ribbon stampReady={false} />

          <Thumbnail image={thumbnailImage} />

          <Title title={lecture.name} category={lecture.category}>
            <Fields>
              <Field icon="date" text="Complated date : 19. 01. 31" />
            </Fields>
          </Title>

          <Buttons>
            { action && (
              <Button className="icon-big-line" onClick={onAction}>
                <Icon className={action.iconName} />
                { action.text && (
                  <span>{action.text}</span>
                )}
              </Button>
            )}
          </Buttons>

          <div className="time-area">
            <div className="time">
              <strong>&nbsp;</strong>
              { hour > 0 && (
                <>
                  <strong>{hour}</strong><span>h</span>
                </>
              )}
              { (hour > 0 || minute > 0) && (
                <>
                  <strong className="ml9">{minute}</strong><span>m</span>
                </>
              )}
            </div>
            <div className="location">
              <span className="location-name">{lecture.name}</span>
              { lecture.cubeType &&  <Field icon="video2" text={lecture.cubeType} bold />}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ListCardView;
