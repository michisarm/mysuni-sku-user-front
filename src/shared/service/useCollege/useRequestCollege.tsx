import { useEffect } from 'react';
import CollegeApi, {
  findAllCollegeCache,
  clearfindAllCollegeCache,
} from '../../../college/present/apiclient/CollegeApi';
import { devideCollegeAndChannel } from './utility/devideCollegeAndChannel';
import {
  setCollegeStore,
  getCollegeStore,
  setCollegeModelStore,
} from '../../store/CollegeStore';
import { setChannelStore, getChannelStore } from '../../store/ChannelStore';
import { find } from 'lodash';
import CategoryColorType from '../../model/CategoryColorType';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

async function requestCollegeAndChannel() {
  const api = new CollegeApi();
  // const getCollegeData = await api.findAllCollege();
  const getCollegeData = await findAllCollegeCache();

  setCollegeModelStore(getCollegeData);
  const collegeAndChannelList = devideCollegeAndChannel(getCollegeData);

  setChannelStore(collegeAndChannelList.channels);
  setCollegeStore(collegeAndChannelList.colleges);
}

export function useRequestCollege() {
  useEffect(() => {
    requestCollegeAndChannel();

    return () => {
      clearfindAllCollegeCache();
    };
  }, []);
}

export function getCollgeName(collegeId: string) {
  const collegeList = getCollegeStore();

  const filterChannelName = find(collegeList, { id: collegeId });

  if (filterChannelName && filterChannelName.name !== undefined) {
    return parsePolyglotString(filterChannelName.name);
  }
  return '';
}

export function getChannelName(channelId: string) {
  const channelList = getChannelStore();

  const filterChannelName = find(channelList, { id: channelId });

  if (filterChannelName && filterChannelName.name !== undefined) {
    return parsePolyglotString(filterChannelName.name);
  }

  return '';
}

export function getColor(categoryId: string) {
  switch (categoryId) {
    case 'CLG00001':
      return CategoryColorType.AI;
    case 'CLG00002':
      return CategoryColorType.DT;
    case 'CLG00006':
      return CategoryColorType.Global;
    case 'CLG00007':
      return CategoryColorType.Leadership;
    case 'CLG00008':
      return CategoryColorType.Management;
    case 'CLG00004':
      return CategoryColorType.SV;
    case 'CLG00003':
      return CategoryColorType.Happiness;
    case 'CLG00019':
      return CategoryColorType.SemicondDesign;
    case 'CLG00005':
      return CategoryColorType.InnovationDesign;
    case 'CLG00020':
      return CategoryColorType.BMDesign;
    case 'CLG0001c':
      return CategoryColorType.EnergySolution;
    default:
      return CategoryColorType.Default;
  }
}
