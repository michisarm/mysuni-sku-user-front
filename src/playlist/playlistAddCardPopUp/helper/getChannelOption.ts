import { isEmpty, find } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import {
  getSelectedCollegeId,
  getPlaylistColleges,
  Colleges,
} from '../playlistAddCardPopUp.stores';

export function getChannelOption(colleges: Colleges[]) {
  const checkedCollege = getSelectedCollegeId();
  const channelOption = [
    {
      key: '',
      value: '',
      text: '전체',
    },
  ];

  if (isEmpty(colleges)) {
    return channelOption;
  }

  const findCheckedCollege = find(colleges, { id: checkedCollege });

  if (findCheckedCollege !== undefined) {
    findCheckedCollege.channels.map((college) => {
      return {
        key: college.id,
        value: college.id,
        text: parsePolyglotString(college.name),
      };
    });
  }

  return channelOption;
}
