
import React from 'react';
import {select, object, boolean, array} from '@storybook/addon-knobs';
import { Segment } from 'semantic-ui-react';
import { storybookHelper, Widget } from 'shared';


export default {
  title: 'components|widget/Widget',
  component: Widget,
};

export const Basic = () =>
  //
  (
    <Widget
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      state={select('state', storybookHelper.enumValues(Widget.State), Widget.State.Joined)}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      mainAction={object('mainAction', { type: Widget.ActionType.Enrollment, onAction: () => alert(Widget.ActionType.Enrollment)})}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      subActions={object('subActions', [{ type: Widget.ActionType.Retry, onAction: () => alert(Widget.ActionType.Retry)}])}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      onCancel={() => alert('cancel')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      clazz={object('clazz', { learningTime: '12h 20m', capacity: 240, participantCount: '1,250' })}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
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
    <Widget
      operator={object('operator', { instructor: '서현진', email: 'univ@sk.com', name: '김수현', company: 'SK Telecom' })}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      onRemove={() => alert('remove')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
    <Widget
      onSurvey={() => alert('survey')}
      required={boolean('required', false)}
      level={select('level', storybookHelper.enumValues(Widget.Level), Widget.Level.Basic)}
      clazz={object('clazz', { learningTime: '12h 20m', participantCount: '1,250' })}
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
