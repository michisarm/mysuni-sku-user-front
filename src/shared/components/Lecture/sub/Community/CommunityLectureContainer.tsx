
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import { Icon, Button, Accordion } from 'semantic-ui-react';
import { LectureViewModel } from 'lecture';
import Action from '../../present/model/Action';
import { CourseSectionContext } from '../CourseSection';
import {
  Title, SubField, Buttons, Thumbnail,
} from '../../ui/view/LectureElementsView';


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
class CommunityLectureContainer extends Component<Props> {
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
    const {
      className, lectureView, thumbnailImage, toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.context;

    return (
      <Accordion className="community-item">
        <Accordion.Title>
          <div className="thumbnail">
            <div>
              {/*TODO 썸네일 어쩔것인지*/}
              <Icon className="thumb60-1" />
            </div>
          </div>
        </Accordion.Title>

        <Title title={lectureView.name} category={lectureView.category}>
          <div className="deatil">
            <span>새로운 글: 5</span>
            <span>멤버 : 1,427</span>
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
      </Accordion>
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

export default CommunityLectureContainer;
