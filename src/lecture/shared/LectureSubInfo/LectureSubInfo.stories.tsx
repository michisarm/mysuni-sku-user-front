
import React from 'react';
import { select, object, boolean } from '@storybook/addon-knobs';
import { Segment } from 'semantic-ui-react';
import { storybookHelper } from 'shared';
import LectureSubInfo from '../LectureSubInfo';


export default {
  title: 'components|panel/LectureSubInfo',
  component: LectureSubInfo,
};

export const Basic = () =>
  //
  (
    <LectureSubInfo
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 0, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

Basic.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithState = () =>
  //
  (
    <LectureSubInfo
      state={select('state', storybookHelper.enumValues(LectureSubInfo.State), LectureSubInfo.State.Joined)}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithState.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithMainAction = () =>
  //
  (
    <LectureSubInfo
      mainAction={object('mainAction', { type: LectureSubInfo.ActionType.Enrollment, onAction: () => alert(LectureSubInfo.ActionType.Enrollment) })}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithMainAction.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithSubActions = () =>
  //
  (
    <LectureSubInfo
      subActions={object('subActions', [{ type: LectureSubInfo.ActionType.Enrollment, onAction: () => alert(LectureSubInfo.ActionType.Enrollment) }])}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithSubActions.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithCancel = () =>
  //
  (
    <LectureSubInfo
      onCancel={() => alert('cancel')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithCancel.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithClassCapacity = () =>
  //
  (
    <LectureSubInfo
      clazz={object('clazz', { learningTime: 750, capacity: 240, participantCount: '1,250' })}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithClassCapacity.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithOperationInstructor = () =>
  //
  (
    <LectureSubInfo
      operator={object('operator', { instructor: '서현진', email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithOperationInstructor.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithRemove = () =>
  //
  (
    <LectureSubInfo
      onRemove={() => alert('remove')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithRemove.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};

export const WithSurvey = () =>
  //
  (
    <LectureSubInfo
      onSurvey={() => alert('survey')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(LectureSubInfo.Level), LectureSubInfo.Level.Basic)}
      clazz={object('clazz', { learningTime: 750, participantCount: '1,250' })}
      operator={object('operator', { email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      onBookmark={() => alert('bookmark')}
      onShare={() => alert('share')}
    />
  );

WithSurvey.story = {
  decorators: [(storyFn: any) => (
    <section className="content">
      <Segment className="full">
        <div className="case-wrap">
          {storyFn()}
        </div>
      </Segment>
    </section>
  )],
};
