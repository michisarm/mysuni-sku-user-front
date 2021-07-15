import { Action, ActionType, Area, FieldType } from 'tracker/model/ActionType';
import React from 'react';

export interface Abtest {
  abtestId: string;
  abtestTargetId: string;
  abtestName: string;
  experimentalGroupId: string;
  experimentalGroupName: string;
  isNonExperimentalGroup: boolean;
}

export interface ExperimentalGroups {
  [key: string]: React.ReactNode;
}

export interface AbtestParams {
  userId?: string;
  referer?: string;
  refererSearch?: string;
  abtest?: string;
  target?: HTMLElement;
  area?: Area | string;
}

export enum DATA_TYPES {
  ABTEST = '[data-abtest]',
  AREA = '[data-area]',
}

export interface AbtestResult {
  abtestResultId: string;
}

export interface Result {
  message: string;
}

export interface AbtestResultModel {
  abtestId: string;
  abtestName?: string | null;
  experimentalId: string;
  experimentalName?: string | null;
  abtestTargetId: string;
  url: string;
}

export interface AbtestResultModifyModel {
  type: string;
  action: string;
  url: string;
  area?: Area | string;
}

export const initAbtest = () => {
  const abtest = {
    abtestId: '',
    abtestTargetId: '',
    abtestName: '',
    experimentalGroupId: '',
    experimentalGroupName: '',
    isNonExperimentalGroup: true,
  };
  return abtest;
};
