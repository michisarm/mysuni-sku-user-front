
import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number, select, boolean } from '@storybook/addon-knobs';

import { Lecture, CubeType, CategoryModel, IdName } from 'shared';
import { LectureModel } from 'lecture';


export default {
  title: 'components|panel/Lecture',
  component: Lecture,
};


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
        onViewDetail={action('onViewDetail')}
      />
    </Lecture.Group>
  );
};


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


export const Required = () => {
  //
  const mockLecture = new LectureModel();

  const lecture = new LectureModel({
    ...mockLecture,
    requiredSubsidiaries: [
      new IdName({ id: 'SK-University', name: 'SK-University' })
    ],
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.Documents,
    learningTime: 40,
  });

  return (
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        lecture={lecture}
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
