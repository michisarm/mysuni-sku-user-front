import React from 'react';
import { autobind } from '@nara.platform/accent';
import { action, computed, observable } from 'mobx';
import { AplCreateFocus, initAplCreateFocus } from '../aplCreate.models';

@autobind
export default class AplCreateFocusService {
  static instance: AplCreateFocusService;

  @observable
  private _aplCreateFocus: AplCreateFocus = initAplCreateFocus();

  @computed get aplCreateFocus() {
    return this._aplCreateFocus;
  }

  @action
  setAplCreateFocus(next: AplCreateFocus) {
    this._aplCreateFocus = next;
  }

  private _focusInputRefs: any = {
    title: React.createRef(),
    type: React.createRef(),
    typeName: React.createRef(),
    collegeId: React.createRef(),
    channelId: React.createRef(),
    institute: React.createRef(),
    requestHour: React.createRef(),
    requestMinute: React.createRef(),
    content: React.createRef(),
    startDate: React.createRef(),
    endDate: React.createRef(),
  };

  get focusInputRefs() {
    return this._focusInputRefs;
  }
}

Object.defineProperty(AplCreateFocusService, 'instance', {
  value: new AplCreateFocusService(),
  writable: false,
  configurable: false,
});
