
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react';
import { LectureViewModel } from 'lecture/index';
import Action from '../../model/Action';
import { CubeIconType } from '../../model';
import { CourseSectionContext } from '../CourseSection';
import {
  Title, SubField, Buttons, Thumbnail,
} from '../../../ui/view/LectureElementsView';


interface Props {
  lectureView: LectureViewModel,
  className: string,
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
class CourseLectureContainer extends Component<Props> {
  //
  static defaultProps = {
    className: '',
    thumbnailImage: null,
    action: null,
    toggle: false,
    open: false,
    onAction: () => {},
    onViewDetail: () => {},
    onToggle: () => {},
  };

  static contextType = CourseSectionContext;


  onToggle() {
    //
    const { open, setOpen } = this.context;

    setOpen(!open);
  }

  render() {
    //
    // const {
    //   className, lectureView, thumbnailImage, action, toggle,
    //   onAction, onViewDetail, onToggle,
    // } = this.props;
    const {
      className, lectureView, thumbnailImage, toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.context;

    return (
      <div className={`card-box ${className}`}>

        <Thumbnail image={thumbnailImage} />

        <Title title={lectureView.name} category={lectureView.category}>
          <div className="deatil">
            { lectureView.cubeTypeName && (
              <Field>
                <SubField bold icon={CubeIconType[lectureView.cubeType] || CubeIconType[lectureView.serviceType]} text={lectureView.cubeTypeName} />
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
            onClick={this.onToggle}
          >
            <Icon className={classNames({ 'arrow-down': !open, 'arrow-up': open  })} />
          </Button>
        )}
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

export default CourseLectureContainer;
