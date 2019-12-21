
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon, Button } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LectureModel } from 'lecture';
import Action from '../../present/model/Action';
import {
  Title, SubField, Buttons, Thumbnail,
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
class CourseView extends Component<Props> {
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
      onAction, onViewDetail,
    } = this.props;
    // const { hour, minute } = dateTimeHelper.timeToHourMinute(lecture.learningTime);
    console.log('category', lecture.category);

    return (
      <div className="course-card fn-parents">
        <div className="card-box first">

          <Thumbnail image={thumbnailImage} />

          <Title title={lecture.name} category={lecture.category}>
            <div className="deatil">
              { lecture.cubeTypeName && (
                <Field>
                  <SubField bold icon="course" text={lecture.cubeTypeName} />
                  <span className="channel">{lecture.category.channel.name}</span>
                </Field>
              )}
              <Field>
                <SubField icon="date" text={lecture.cubeTypeName}>
                  <span className="ml17">Study start date, end date : ??</span>
                </SubField>
              </Field>
            </div>
          </Title>

          <Buttons>
            <Button className="fix line" onClick={onViewDetail}>View Details</Button>
          </Buttons>

          {/*<Buttons>*/}
          {/*  { action && (*/}
          {/*    <Button className="icon-big-line" onClick={onAction}>*/}
          {/*      <Icon className={action.iconName} />*/}
          {/*      { action.text && (*/}
          {/*        <span>{action.text}</span>*/}
          {/*      )}*/}
          {/*    </Button>*/}
          {/*  )}*/}
          {/*</Buttons>*/}

          {/*<div className="time-area">*/}
          {/*  <div className="time">*/}
          {/*    <strong>&nbsp;</strong>*/}
          {/*    { hour > 0 && (*/}
          {/*      <>*/}
          {/*        <strong>{hour}</strong><span>h</span>*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*    { (hour > 0 || minute > 0) && (*/}
          {/*      <>*/}
          {/*        <strong className="ml9">{minute}</strong><span>m</span>*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*  <div className="location">*/}
          {/*    <span className="location-name">{lecture.name}</span>*/}
          {/*    { lecture.cubeType &&  <Field icon="video2" text={lecture.cubeType} bold />}*/}
          {/*  </div>*/}
          {/*</div>*/}
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
