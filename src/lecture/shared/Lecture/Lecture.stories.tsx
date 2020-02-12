
import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';

import { Segment } from 'semantic-ui-react';
import { CubeType, CategoryModel, IdName } from 'shared/model';
import { LectureModel } from 'lecture/model';
import { ChannelModel } from 'college/model';
import Lecture from './ui/logic/LectureContainer';


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
      college: new IdName({ id: 'Leadership', name: 'Leadership', active: false }),
    }),
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.ClassRoomLecture,
    learningTime: 90,
    state: undefined,
    timeStrByState: '',
    rating: 0,
  });

  const lectureProps = {
    model: lecture,
    rating: number('rating', 4, { range: true, min: 0, max: 5 }),
    thumbnailImage: 'http://placehold.it/60x60',
    action: select('action', {
      Add: Lecture.ActionType.Add,
      Remove: Lecture.ActionType.Remove,
      My: Lecture.ActionType.My,
    }, Lecture.ActionType.Add),
    onAction: action('onAction'),
    onViewDetail: action('onViewDetail'),
  };

  return (
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        {...lectureProps}
      />
      <Lecture
        {...lectureProps}
      />
      <Lecture
        {...lectureProps}
      />
      <Lecture
        {...lectureProps}
      />
      <Lecture
        {...lectureProps}
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
        model={lecture}
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
      new IdName({ id: 'SK-University', name: 'SK-University', active: false }),
    ],
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.Documents,
    learningTime: 40,
    state: undefined,
    timeStrByState: '',
    rating: 0,
  });

  return (
    <Lecture.Group type={Lecture.GroupType.Box}>
      <Lecture
        model={lecture}
        action={{
          iconName: 'remove2',
        }}
      />
    </Lecture.Group>
  );
};


export const Line = () => {
  //
  const mockLecture = new LectureModel();
  const mockCategory = new CategoryModel();

  const lecture = new LectureModel({
    ...mockLecture,
    category: new CategoryModel({
      ...mockCategory,
      college: new IdName({ id: 'Leadership', name: 'Leadership', active: false }),
    }),
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.ClassRoomLecture,
    learningTime: 90,
    state: undefined,
    timeStrByState: '',
    rating: 0,
  });

  const lectureProps = {
    model: lecture,
    rating: number('rating', 4, { range: true, min: 0, max: 5 }),
    thumbnailImage: 'http://placehold.it/60x60',
    action: select('action', {
      Add: Lecture.ActionType.Add,
      Remove: Lecture.ActionType.Remove,
      My: Lecture.ActionType.My,
    }, Lecture.ActionType.Add),
    onAction: action('onAction'),
    onViewDetail: action('onViewDetail'),
  };

  const mockChannel =  new ChannelModel();
  const channel = new ChannelModel({
    ...mockChannel,
    name: 'AI Tech Essential',
  });

  return (
    <div className="recommend-area">
      <Lecture.LineHeader
        channel={channel}
        title="의 학습과정입니다."
        onViewAll={action('onViewAll')}
      />
      <Lecture.Group type={Lecture.GroupType.Line}>
        <Lecture
          { ...lectureProps }
        />
        <Lecture
          { ...lectureProps }
        />
        <Lecture
          { ...lectureProps }
        />
        <Lecture
          { ...lectureProps }
        />
        <Lecture
          { ...lectureProps }
        />
      </Lecture.Group>
    </div>
  );
};


export const Course = () => {
  //
  const mockLecture = new LectureModel();
  const mockCategory = new CategoryModel();

  const lecture = new LectureModel({
    ...mockLecture,
    category: new CategoryModel({
      ...mockCategory,
      college: new IdName({ id: 'Leadership', name: 'Leadership', active: false }),
      channel: new IdName({ id: 'Leadership Clinic', name: 'Leadership Clinic', active: false }),
    }),
    name: 'Machine learning Complete Guide for Calculus - Deep',
    description: 'This is a template for a simple marketing or informational website. It includes a large callout called a jumbo Tron and three',
    cubeType: CubeType.ClassRoomLecture,
    learningTime: 90,
    state: undefined,
    timeStrByState: '',
    rating: 0,
  });

  const lectureProps = {
    model: lecture,
    rating: number('rating', 4, { range: true, min: 0, max: 5 }),
    thumbnailImage: 'http://placehold.it/60x60',
    action: select('action', {
      Add: Lecture.ActionType.LearningStart,
      Remove: Lecture.ActionType.Remove,
      My: Lecture.ActionType.My,
    }, Lecture.ActionType.Add),
    onAction: action('onAction'),
    onViewDetail: action('onViewDetail'),
  };

  return (
    <Segment className="full">
      <Lecture.Group type={Lecture.GroupType.Course}>
        <Lecture
          {...lectureProps}
        />
        <Lecture
          {...lectureProps}
          toggle
          onToggle={action('onToggle')}
        />
      </Lecture.Group>
    </Segment>
  );
};
