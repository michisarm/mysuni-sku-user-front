import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import numeral from 'numeral';

import { Icon, Button, Accordion } from 'semantic-ui-react';
import { MyTrainingModel, InMyLectureModel } from 'myTraining/model';
import Action from '../../model/Action';
import { CourseSectionContext } from '../CourseSection';
import { Title, Buttons } from '../../../ui/view/LectureElementsView';
import LectureModel from '../../../../model/LectureModel';
import { CategoryModel } from '../../../../../shared/model/CategoryModel';

interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel;
  children: React.ReactNode;
  thumbnailImage?: string;
  action?: Action;
  toggle?: boolean;
  open?: boolean;
  onAction?: () => void;
  onViewDetail?: (e: any) => void;
  onToggle?: (openState: boolean) => void;
}

interface State {
  open: boolean;
}

@reactAutobind
@observer
class CommunityLectureContainer extends Component<Props, State> {
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

  static contextType = CourseSectionContext;

  state = {
    open: false,
  };

  onToggle() {
    //
    const { open } = this.state;
    const { onToggle } = this.props;
    this.setState({ open: !open });

    if (typeof onToggle === 'function') onToggle(!open);
  }

  render() {
    //
    const {
      model,
      // thumbnailImage,
      children,
      toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.state;

    return (
      <Accordion className="community-item">
        <Accordion.Title active={open}>
          <div className="commu-list-item">
            <div className="thumbnail">
              <div>
                {/*TODO 썸네일 어쩔것인지*/}
                <Icon className="thumb60-1" />
              </div>
            </div>
            <Title
              title={<a>{model.name}</a>}
              category={new CategoryModel(model.category)}
            >
              <div className="deatil">
                {/*<span>새로운 글: 5</span>*/}
                <span>
                  멤버 : {numeral(model.studentCount).format('0,0') || 0}
                </span>
              </div>
            </Title>

            <Buttons>
              <Button className="fix line" onClick={onViewDetail}>
                상세보기
              </Button>
            </Buttons>

            {toggle && (
              <div className="icon-area">
                <Icon className="dropdown icon" onClick={this.onToggle} />
              </div>
            )}
          </div>
        </Accordion.Title>
        {children}
      </Accordion>
    );
  }
}

export default CommunityLectureContainer;
