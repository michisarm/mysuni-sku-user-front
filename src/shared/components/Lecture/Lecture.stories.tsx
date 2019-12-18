
import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number, select, boolean } from '@storybook/addon-knobs';

import { Lecture, CubeType, CategoryModel, IdName } from 'shared';
import { LectureModel } from 'lecture';
import CardService from '../shared/present/logic/CardService';


export default {
  title: 'components|panel/[Todo: 사용금지] Lecture',
  component: Lecture,
};


const cardService = CardService.instance;

/**
 * Basic Story
 */
export const Basic = () => {
  //
  const mockLecture = new LectureModel();
  const mockCategory = new CategoryModel();

  const lecture = new LectureModel({
    ...mockLecture,
    category: new CategoryModel({
      ...mockCategory,
      college: new IdName({ id: 'Leadership', name: 'Leadership' }),
    }),
    required: true,
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.ClassRoomLecture,
    learningTime: 90,
  });

  return (
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        lecture={lecture}
        rating={number('rating', 4, { range: true, min: 0, max: 5 })}
        thumbnailImage="http://placehold.it/60x60"
        action={select('action', {
          Add: Lecture.ActionType.Add,
          Remove: Lecture.ActionType.Remove,
          My: Lecture.ActionType.My,
        }, Lecture.ActionType.Add)}
        onAction={action('onAction')}
        onGoToLecture={action('onGoToLecture')}
      />
    </Lecture.Group>
  );
};


/**
 * Minimal Story
 */
export const Minimal = () => {
  //
  const lecture = new LectureModel();

  return (
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        lecture={lecture}
      />
    </Lecture.Group>
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
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        lecture={new LectureModel()}
        action={{
          iconName: 'remove2',
        }}
      />
      <Lecture
        lecture={new LectureModel()}
        action={{
          iconName: 'remove2',
        }}
      />
    </Lecture.Group>
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
