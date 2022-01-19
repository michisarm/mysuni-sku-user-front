import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { reactConfirm } from '@nara.platform/accent';
import {
  likeByFeedbackId,
  unlikeByFeedbackId,
} from 'hotTopic/api/hotTopicLikeApi';
import {
  getPlaylistLikeInfo,
  setPlaylistLikeInfo,
} from './MyPagePlaylistDetailHeader.service';
import { removeMyPlaylist } from 'playlist/data/apis';
import myPageRoutePaths from 'myTraining/routePaths';

export async function onDeletePlaylistClick(myPlaylistId: string) {
  const history = getCurrentHistory();
  reactConfirm({
    title: getPolyglotText('Playlist 삭제하기', 'playlist-popup-플리삭제하기'),
    message: getPolyglotText(
      'Playlist를 삭제하시겠습니까?',
      'playlist-popup-삭제컨펌'
    ),
    onOk: () => {
      removeMyPlaylist(myPlaylistId).then(() => {
        history?.push(myPageRoutePaths.myPagePlaylist());
      });
    },
  });
}

export function likePlaylist() {
  const likeInfo = getPlaylistLikeInfo();
  if (likeInfo !== undefined) {
    setPlaylistLikeInfo({ ...likeInfo, count: likeInfo.count + 1, my: true });

    likeByFeedbackId(likeInfo.feedbackId);
  }
}

export function unlikePlaylist() {
  const likeInfo = getPlaylistLikeInfo();
  if (likeInfo !== undefined) {
    setPlaylistLikeInfo({ ...likeInfo, count: likeInfo.count - 1, my: false });

    unlikeByFeedbackId(likeInfo.feedbackId);
  }
}
