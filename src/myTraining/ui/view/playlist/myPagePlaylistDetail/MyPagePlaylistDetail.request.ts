import { findPlaylistDetail } from 'playlist/data/apis';
import { setMyPagePlaylistDetail } from './MyPagePlaylistDetail.services';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import requestMyPagePlaylistDetailCardList from './myPagePlaylistDetailCardList/MyPagePlaylistDetailCardList.request';

async function requestMyPagePlaylistDetail(playlistId: string) {
  console.log('처음?');
  const playlistDetail = await findPlaylistDetail(playlistId);
  if (playlistDetail === undefined) {
    return;
  }
  const { recommendedUserCount, sharedUserCount } = playlistDetail;
  const { description, title, cardIds, likeFeedbackId } =
    playlistDetail.playlist;
  const { photoImagePath, name, nickname, displayNicknameFirst } =
    playlistDetail.registrant;
  const { type, registeredTime, recommendation, id } =
    playlistDetail.myPlaylist;

  let registerdDisplayName: string;
  if (displayNicknameFirst) {
    registerdDisplayName = nickname || parsePolyglotString(name);
  } else {
    registerdDisplayName = parsePolyglotString(name) || nickname;
  }

  setMyPagePlaylistDetail({
    type,
    playlistId,
    myPlaylistId: id,
    recommendation,
    playlistTitle: title,
    playlistDescription: description,
    registerdDisplayName,
    registeredTime,
    sharedUserCount,
    recommendedUserCount,
    playlistLikeCount: 0,
    photoImagePath,
    likeFeedbackId,
    cardIds,
  });
  console.log('불러오냐?');
  requestMyPagePlaylistDetailCardList(cardIds);
}

export default requestMyPagePlaylistDetail;
