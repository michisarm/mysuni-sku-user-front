
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import _ from 'lodash';
import { mobxHelper } from 'shared';
import CardGroup, { LearningCardContext, GroupType } from '../../sub/CardGroup';
import CardService from '../../../shared/present/logic/CardService';
import Action from '../../present/model/Action';
import { CategoryType, ActionType } from '../../present/model';
import BoxCardView from '../view/BoxCardView';
import ListCardView from '../view/ListCardView';


interface Props {
  /** 내부 card service */
  cardService?: CardService,
  id?: string,
  name?: string,
  category?: CategoryType,
  rating?: number,
  thumbnailImage?: string,
  action?: Action | ActionType,
  onAction?: () => void,
  onGoToActivity?: () => void,
}

interface States {
  id: string,
  hovered: boolean,
}

interface ActionWith extends Action {
  type: ActionType,
}


/**
 * 러닝카드 컴포넌트입니다.
 */
@inject(mobxHelper.injectFrom('learning.cardService'))
// @inject(({ learning }) => ({ cardService: learning.cardService }))
@reactAutobind
@observer
class CardContainer extends Component<Props, States> {
  //
  static Group = CardGroup;

  static GroupType = GroupType;

  static CategoryType = CategoryType;

  static ActionType = ActionType;

  static contextType = LearningCardContext;

  static defaultProps = {
    name: null,
    category: null,
    rating: null,
    thumbnailImage: null,
    onAction: () => {},
    onGoToActivity: () => {},
  };

  static defaultActions: ActionWith[] = [
    { type: ActionType.Add,           iconName: 'add-list' },
    { type: ActionType.Remove,        iconName: 'remove2' },
    { type: ActionType.My,            iconName: 'my' },
    { type: ActionType.Play,          iconName: 'play2',      text: 'Play' },
    { type: ActionType.LearningStart, iconName: 'play2',      text: 'LearningStart' },
    { type: ActionType.Download,      iconName: 'download2',  text: 'Download' },
    { type: ActionType.Join,          iconName: 'join',       text: 'Join' },
  ];

  state = {
    id: '',
    hovered: false,
  };


  constructor(props: Props) {
    //
    super(props);
    this.state.id = props.id ? props.id : _.uniqueId('Card.');
  }

  handleHover() {
    this.setState(prevState => ({
      hovered: !prevState.hovered,
    }));
  }

  getAction() {
    //
    const { action } = this.props;
    let newAction: Action | undefined;

    const act: ActionWith | undefined = CardContainer.defaultActions
      .find((defaultAction) => defaultAction.type === action);

    if (act) {
      newAction = {
        iconName: act.iconName,
        text: act.text,
      };
    }
    else {
      newAction = action as Action;
    }
    return newAction;
  }

  renderBoxCard() {
    //
    const {
      cardService, category, rating, thumbnailImage,
      onAction, onGoToActivity,
    } = this.props;
    const { id, hovered } = this.state;

    if (!cardService) {
      return null;
    }
    const card = cardService.cardMap.get(id);

    return (
      <BoxCardView
        card={card}
        hovered={hovered}
        category={category}
        rating={rating}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        onAction={onAction}
        onGoToActivity={onGoToActivity}
        onHover={this.handleHover}
      />
    );
  }

  renderListCard() {
    //
    const {
      cardService, name, category, thumbnailImage,
      onAction,
    } = this.props;
    const { id } = this.state;

    if (!cardService) {
      return null;
    }
    const card = cardService.cardMap.get(id);

    return (
      <ListCardView
        card={card}
        name={name}
        category={category}
        thumbnailImage={thumbnailImage}
        action={this.getAction()}
        onAction={onAction}
      />
    );
  }

  render() {
    //
    const { groupType } = this.context;

    if (groupType === GroupType.Box) {
      return this.renderBoxCard();
    }
    else {
      return this.renderListCard();
    }
  }
}

export default CardContainer;
