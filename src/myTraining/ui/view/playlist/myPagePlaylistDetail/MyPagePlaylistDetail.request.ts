import { SkProfileService } from 'profile/stores';
import { findPlaylistDetail } from 'playlist/data/apis';
import { setMyPagePlaylistDetail } from './MyPagePlaylistDetail.services';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import requestMyPagePlaylistDetailCardList from './myPagePlaylistDetailCardList/MyPagePlaylistDetailCardList.request';
import { setPlaylistResistrantProfileInfo } from './myPagePlaylistDetailHeader/MyPagePlaylistDetailHeader.service';

async function requestMyPagePlaylistDetail(playlistId: string) {
  const playlistDetail = await findPlaylistDetail(playlistId);
  if (playlistDetail === undefined) {
    return;
  }
  const { recommendedUserCount, sharedUserCount } = playlistDetail;
  const { description, title, cardIds, likeFeedbackId, commentFeedbackId } =
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

  const commentHasPinRole: boolean =
    playlistDetail.registrant.id === SkProfileService.instance.skProfile.id;

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
    commentFeedbackId,
    commentHasPinRole,
  });

  setPlaylistResistrantProfileInfo({
    id: playlistDetail.registrant.id,
    profileImg: playlistDetail.registrant.photoImagePath,
    introduce: playlistDetail.registrant.selfIntroduction,
    nickName: playlistDetail.registrant.nickname,
    creatorName: parsePolyglotString(playlistDetail.registrant.name),
  });

  requestMyPagePlaylistDetailCardList(cardIds);
}

export default requestMyPagePlaylistDetail;
