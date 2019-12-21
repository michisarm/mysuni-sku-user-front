
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
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
      lecture, thumbnailImage, action, toggle, open,
      onAction, onViewDetail, onToggle,
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
                  {/*<span className="channel">{lecture.category.channel.name}</span>*/}
                </Field>
              )}
              <Field>
                <SubField icon="date" text="">
                  <span className="ml17" />
                </SubField>
              </Field>
            </div>
          </Title>

          <Buttons>
            <Button className="fix line" onClick={onViewDetail}>View Details</Button>
          </Buttons>

          { toggle && (
            <Button icon className={classNames('img-icon fn-more-toggle', { 'card-open': toggle, 'card-cloase': !toggle })}>
              <Icon className={classNames({ 'arrow-down': open, 'arrow-up': !open  })} />
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
