import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { isEmpty, find } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPlaylistColleges } from '../playlistAddCardPopUp.stores';

export function getChannelOption(collegeId: string) {
  const colleges = getPlaylistColleges();
  const channelOption = [
    {
      key: '',
      value: '',
      text: getPolyglotText('전체', 'mypage-playlist-전체리스트'),
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
