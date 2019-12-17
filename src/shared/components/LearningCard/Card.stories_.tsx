
import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { storybookHelper, CubeType } from 'shared';

import CardService from '../shared/present/logic/CardService';
import Card from '.';


export default {
  title: 'components|card/[Todo: 사용금지] Card',
  component: Card,
};


const cardService = CardService.instance;

/**
 * Basic Story
 */
export const Basic = () => {
  //
  const cardId = cardService.newCard();
  cardService.setCardProp(cardId, 'title', text('card.title', 'Machine learning Complete Guide for Calculus'));
  cardService.setCardProp(cardId, 'description', text('card.description', 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three'));
  cardService.setCardProp(cardId, 'cubeType', select('card.cubeType', storybookHelper.enumValues(CubeType), CubeType.Video));
  cardService.setCardProp(cardId, 'lengthInMinute', number('card.lengthInMinute', 80));
  cardService.setCardProp(cardId, 'countOfComplete', number('card.countOfComplete', 2999));

  return (
    <Card.Group type={Card.GroupType.Box}>
      <Card
        id={cardId}
        category={select('category', storybookHelper.enumValues(Card.CategoryType), Card.CategoryType.AI)}
        rating={number('rating', 3, { range: true, min: 0, max: 5 })}
        thumbnailImage="http://placehold.it/60x60"
        action={select('action', {
          Add: Card.ActionType.Add,
          Remove: Card.ActionType.Remove,
          My: Card.ActionType.My,
        }, Card.ActionType.Add)}
        onAction={action('onAction')}
      />
    </Card.Group>
  );
};


/**
 * Minimal Story
 */
export const Minimal = () => {
  //
  const cardId = cardService.newCard();

  return (
    <Card.Group type={Card.GroupType.Box}>
      <Card
        id={cardId}
        onGoToActivity={action('onGoToActivity')}
      />
    </Card.Group>
  );
};


/**
 * Required and Stamp
 */
export const RequiredAndStamp = () => {
  //
  const requiredCardId = cardService.newCard();
  cardService.setCardProp(requiredCardId, 'required', boolean('card1.required', true));
  cardService.setCardProp(requiredCardId, 'title', text('card1.title', 'Required Learning Card'));

  const stampCardId = cardService.newCard();
  cardService.setCardProp(stampCardId, 'stampReady', boolean('card2.stampReady', true));
  cardService.setCardProp(stampCardId, 'title', text('card2.title', 'Stamp Learning Card'));

  return (
    <Card.Group type={Card.GroupType.Box}>
      <Card
        id={requiredCardId}
        action={{
          iconName: 'remove2',
        }}
      />
      <Card
        id={stampCardId}
        action={{
          iconName: 'remove2',
        }}
      />
    </Card.Group>
  );
};

/*
export const List = () => {
  //
  const cardId = cardService.newCard();
  cardService.setCardProp(cardId, 'stampReady', boolean('card.stampReady', true));
  cardService.setCardProp(cardId, 'title', text('card.title', 'Machine learning Complete Guide for Calculus'));
  cardService.setCardProp(cardId, 'cubeType', select('card.cubeType', storybookHelper.enumValues(CubeType), CubeType.Video));
  cardService.setCardProp(cardId, 'lengthInMinute', number('card.lengthInMinute', 80));

  return (
    <CardGroup type={GroupType.List}>
      <Card
        id={cardId}
        name="Learning Card"
        category={Card.CategoryType.AI}
        thumbnailImage="http://placehold.it/60x60"
        action={Card.ActionType.Play}
      />
    </CardGroup>
  );
};
 */
