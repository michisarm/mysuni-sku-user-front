import { LectureCardRdo } from 'expert/model/LectureCardRdo';
import {
  getSelectedChannelId,
  getSelectedCollegeId,
  getPlaylistAddCardPopUpOffset,
  getSearchWord,
} from '../playlistAddCardPopUp.stores';

export function getLectureCardRdo() {
  const playlistAddCardPopUpOffset = getPlaylistAddCardPopUpOffset();
  const searchWord = getSearchWord();
  const selectedCollegeId = getSelectedCollegeId();
  const selectedChannelId = getSelectedChannelId();

  const lecturecardRdo: LectureCardRdo = {
    limit: 4,
    offset: (playlistAddCardPopUpOffset.offset - 1) * 4,
    cardOrderBy: 'TimeDesc', //TimeDesc, TimeAsc
    cardState: 'Opened',
    collegeIds: selectedCollegeId,
    channelIds: selectedChannelId,
    searchable: true,
    sharedOnly: false,
    name: searchWord,
  };

  return lecturecardRdo;
}
