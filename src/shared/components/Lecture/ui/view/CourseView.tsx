
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LectureViewModel } from 'lecture';
import Action from '../../present/model/Action';
import {
  Title, SubField, Buttons, Thumbnail,
} from './LectureElementsView';


interface Props {
  lectureView: LectureViewModel,
  thumbnailImage?: string,
  action?: Action,
  toggle?: boolean,
  open?: boolean,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
  onToggle?: () => void,
}

@reactAutobind
@observer
class CourseView extends Component<Props> {
  //
  static defaultProps = {
    thumbnailImage: null,
    action: null,
    toggle: false,
    open: false,
    onAction: () => {},
    onViewDetail: () => {},
    onToggle: () => {},
  };

  render() {
    //
    const {
      lectureView, thumbnailImage, action, toggle, open,
      onAction, onViewDetail, onToggle,
    } = this.props;
    // const { hour, minute } = dateTimeHelper.timeToHourMinute(lecture.learningTime);

    return (
      <div className={classNames('course-card', 'fn-parents', { open })}>
        <div className="card-box first">

          <Thumbnail image={thumbnailImage} />

          <Title title={lectureView.name} category={lectureView.category}>
            <div className="deatil">
              { lectureView.cubeTypeName && (
                <Field>
                  <SubField bold icon="course" text={lectureView.cubeTypeName} />
                  <span className="channel">{lectureView.category.channel.name}</span>
                </Field>
              )}
              <Field>
                <SubField icon="date" text={`Creation date: ${moment(lectureView.creationDate).format('YYYY.MM.DD')}`}>
                  {lectureView.learningPeriod && (
                    <span className="ml17">
                      Study start date, end date :
                      {lectureView.learningPeriod && lectureView.learningPeriod.startDate}
                       ~ {lectureView.learningPeriod && lectureView.learningPeriod.endDate}
                    </span>
                  )}
                </SubField>
              </Field>
            </div>
          </Title>

          <Buttons>
            <Button className="fix line" onClick={onViewDetail}>View Details</Button>
          </Buttons>

          { toggle && (
            <Button
              icon
              className={classNames({
                'img-icon': true,
                'fn-more-toggle': true,
                'card-open': !open,
                'card-close': open,
              })}
              onClick={onToggle}
            >
              <Icon className={classNames({ 'arrow-down': !open, 'arrow-up': open  })} />
            </Button>
          )}
        </div>
      </div>
    );
  }
}


interface FieldProps {
  children: React.ReactNode,
}

const Field = ({ children }: FieldProps) => (
  <div className="item">
    {children}
  </div>
);

export default CourseView;
