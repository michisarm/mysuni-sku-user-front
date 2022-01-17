import {
  countLikeByFeedbackId,
  findMyLikeByFeedbackId,
} from 'hotTopic/api/hotTopicLikeApi';
import { getMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';
import {
  getPlaylistLikeInfo,
  setPlaylistLikeInfo,
} from './MyPagePlaylistDetailHeader.service';

export async function requestPlaylistLike() {
  const playlistDetail = getMyPagePlaylistDetail();

  if (playlistDetail === undefined) {
    return;
  }

  const likeCount = await countLikeByFeedbackId(playlistDetail?.likeFeedbackId);
  const myLike = await findMyLikeByFeedbackId(playlistDetail?.likeFeedbackId);

  const playlistLikeInfo = getPlaylistLikeInfo();
  setPlaylistLikeInfo({
    ...playlistLikeInfo,
    feedbackId: playlistDetail.likeFeedbackId,
    count: likeCount,
    my: myLike !== undefined && myLike !== null && myLike !== '',
  });
}
