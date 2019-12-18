
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import {
  Card, Icon, Button,
} from 'semantic-ui-react';
import { CardModel } from '../../../shared';
import Action from '../../present/model/Action';
import { CategoryModel } from '../../present/model';
import {
  Title, Fields, Field, Buttons, Thumbnail, Ribbon,
} from './LectureElementsView';


interface Props {
  card?: CardModel,
  name?: string,
  category?: CategoryModel,
  thumbnailImage?: string,
  action?: Action,
  onAction?: () => void,
}

@reactAutobind
@observer
class ListCardView extends Component<Props> {
  //
  static defaultProps = {
    category: null,
    thumbnailImage: null,
    action: null,
    onAction: () => {},
  };

  render() {
    //
    const {
      card, name, category, thumbnailImage, action,
      onAction,
    } = this.props;
    const { hour, minute } = card!.splitLengthInMinute();

    return (
      <Card>
        <div className="card-inner">
          <Ribbon stampReady={card!.stampReady} />

          <Thumbnail image={thumbnailImage} />

          <Title title={card!.title} category={category}>
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
              <span className="location-name">{name}</span>
              { card!.cubeType &&  <Field icon="video2" text={card!.cubeType} bold />}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ListCardView;
