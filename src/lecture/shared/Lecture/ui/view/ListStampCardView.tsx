
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Card, Icon, Button } from 'semantic-ui-react';
import { LectureModel } from 'lecture/index';
import { MyTrainingModel, InMyLectureModel } from 'mypage';
import Action from '../../model/Action';
import {
  Title, Fields, Field, Buttons, Thumbnail,
} from '../../../ui/view/LectureElementsView';



interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel,
  thumbnailImage?: string,
  action?: Action,
  onAction?: (e: any) => void,
  onViewDetail?: () => void,
}

@reactAutobind
@observer
class ListCardView extends Component<Props> {
  //
  static defaultProps = {
    thumbnailImage: null,
    action: null,
    onAction: (e: any) => {},
    onViewDetail: () => {},
  };

  render() {
    //
    const {
      model, thumbnailImage, action,
      onAction,
    } = this.props;

    return (
      <Card>
        <div className="card-inner">
          {/* Todo: stampReady, 미사용이면 제거 */}
          {/*<Ribbon stampReady={false} />*/}

          <Thumbnail image={thumbnailImage} />

          <Title title={model.name} category={model.category}>
            <Fields>
              <Field icon="date" text={`Completed date : ${new Date(model.time).toLocaleDateString()}`} />
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
            <div className="location">
              { model.cubeType &&  <Field icon="video2" text={model.cubeType} bold />}
            </div>
            <div className="stamp">Stamp<strong>x{model.stampCount}</strong></div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ListCardView;
