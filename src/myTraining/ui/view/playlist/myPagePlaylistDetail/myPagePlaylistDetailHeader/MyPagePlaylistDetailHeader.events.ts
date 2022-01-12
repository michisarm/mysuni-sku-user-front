import React from 'react';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
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
    title: 'Playlist 삭제하기',
    message:
      'Playlist를 삭제하시겠습니까 ? \n 추천받은 구성원들에게도 삭제됩니다.',
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

export function copyPlaylistUrl(id: string) {
  const currentUrl = window.location.toString();
  const url = `${
    currentUrl.split('/my-training/my-page/')[0]
  }/my-training/my-page/Playlist/PlaylistDetail/${id}/pages/1`;
  const textarea = document.createElement('textarea');
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  reactAlert({
    title: getPolyglotText('알림', 'cicl-학상본문-알림'),
    message: getPolyglotText('URL이 복사되었습니다.', 'mypage-유저모달-url'),
  });
}
