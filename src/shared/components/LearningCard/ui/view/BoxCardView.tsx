
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import numeral from 'numeral';
import {
  Card, Icon, Rating, Button,
} from 'semantic-ui-react';
import { CardModel } from '../../../shared';
import Action from '../../present/model/Action';
import { CategoryType, ActionType } from '../../present/model';
import { Title, Fields, Field, Buttons, Thumbnail, Ribbon } from './CardElementsView';


interface Props {
  hovered: boolean,
  card?: CardModel,
  category?: CategoryType,
  rating?: number,
  thumbnailImage?: string,
  action?: Action,
  onHover?: () => void,
  onAction?: () => void,
  onGoToActivity?: () => void,
}

interface States {
  hovered: boolean,
}


@reactAutobind
@observer
class BoxCardView extends Component<Props, States> {
  //
  static defaultProps = {
    category: null,
    rating: null,
    thumbnailImage: null,
    action: null,
    onHover: () => {},
    onAction: () => {},
    onGoToActivity: () => {},
  };


  static CategoryType = CategoryType;

  static ActionType = ActionType;


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
      card, hovered, category, thumbnailImage, action,
      onHover, onAction, onGoToActivity,
    } = this.props;
    const { hour, minute } = card!.splitLengthInMinute();
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
        <Ribbon stampReady={card!.stampReady} required={card!.required} />

        <div className="card-inner">
          <Thumbnail image={thumbnailImage} />

          <Title title={card!.title} category={category} />

          <Fields>
            { card!.cubeType && <Field icon="video2" text={card!.cubeType} bold />}
            { hourAndMinute && <Field icon="time2" text={hourAndMinute} bold />}
            <Field icon="complete" text={`이수 ${numeral(card!.countOfComplete).format('0,0')}명`} />
          </Fields>

          {this.renderBottom()}
        </div>

        {/* hover 시 컨텐츠 */}
        <div className="hover-content">
          <Title title={card!.title} category={category} />

          <p className="text-area">
            {card!.description}
          </p>

          <Buttons>
            { action && (
              <Button icon className="icon-line" onClick={onAction}>
                <Icon className={action.iconName} />
              </Button>
            )}
            <Button className="fix bg" onClick={onGoToActivity}>Go to this activity</Button>
          </Buttons>
        </div>
      </Card>
    );
  }
}

export default BoxCardView;
