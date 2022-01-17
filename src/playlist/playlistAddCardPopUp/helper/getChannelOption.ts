import { isEmpty, find } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPlaylistColleges } from '../playlistAddCardPopUp.stores';

export function getChannelOption(collegeId: string) {
  const colleges = getPlaylistColleges();
  const channelOption = [
    {
      key: '',
      value: '',
      text: '전체',
    },
  ];

  if (isEmpty(collegeId)) {
    return channelOption;
  }

  const findCheckedCollege = find(colleges, { id: collegeId });

  if (findCheckedCollege !== undefined) {
    findCheckedCollege.channels.forEach((college) => {
      channelOption.push({
        key: college.id,
        value: college.id,
        text: parsePolyglotString(college.name),
      });
    });
  }

  return channelOption;
}
