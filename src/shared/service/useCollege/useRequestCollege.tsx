import { find } from 'lodash';
import CategoryColorType from '../../model/CategoryColorType';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../lecture/model/LangSupport';
import { Channel, getAllColleges } from '../requestAllColleges';

export function getCollgeName(collegeId: string) {
  const collegeList = getAllColleges();
  const foundCollege = find(collegeList, { id: collegeId });

  if (foundCollege && foundCollege.name !== undefined) {
    return parsePolyglotString(
      foundCollege.name,
      getDefaultLang(foundCollege.langSupports)
    );
  }
  return '';
}

export function getChannelName(channelId: string) {
  const collegeList = getAllColleges();
  const channelList = collegeList.reduce<Channel[]>(
    (p, c) => [...p, ...c.channels],
    []
  );
  const foundChannel = find(channelList, { id: channelId });

  if (foundChannel && foundChannel.name !== undefined) {
    return parsePolyglotString(
      foundChannel.name,
      getDefaultLang(foundChannel.langSupports)
    );
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

export function compareCollgeCineroom(collegeId: string) {
  const collegeList = getAllColleges();
  const findCollege = find(collegeList, { id: collegeId });

  if (findCollege) {
    return findCollege.cineroomId === 'ne1-m2-c2';
  }

  return false;
}

export function findMyAplCollege(cineroomId: string) {
  const collegeList = getAllColleges();
  const findAplcollege = collegeList.filter(
    (college) => college.cineroomId === cineroomId
  );

  return findAplcollege;
}
