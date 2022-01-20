import { MyPageRouteParams } from 'myTraining/model/MyPageRouteParams';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PlaylistType } from '../../../../../playlist/data/models/PlaylistType';
import { createStore } from 'shared/store/Store';
import requestMyPagePlaylistDetail from './MyPagePlaylistDetail.request';

export interface PlaylistDetail {
  type: PlaylistType;
  playlistId: string;
  myPlaylistId: string;
  playlistTitle: string;
  playlistDescription: string;
  registerdDisplayName: string;
  registeredTime: number;
  playlistLikeCount: number;
  photoImagePath: string;
  recommendedUserCount: number;
  sharedUserCount: number;
  likeFeedbackId: string;
  recommendation: string;
  cardIds: string[];
  commentFeedbackId: string;
  commentHasPinRole: boolean;
}

export const [
  setMyPagePlaylistDetail,
  onMyPagePlaylistDetail,
  getMyPagePlaylistDetail,
  useMyPagePlaylistDetail,
] = createStore<PlaylistDetail>();

export const [
  setMyPagePlaylistDetailCards,
  onMyPagePlaylistDetailCards,
  getMyPagePlaylistDetailCards,
  useMyPagePlaylistDetailCards,
] = createStore<PlaylistCardTable>();

export function useRequestMyPagePlaylistDetail() {
  const params = useParams<MyPageRouteParams>();
  const { playlistId } = params;

  useEffect(() => {
    requestMyPagePlaylistDetail(playlistId);
    return setMyPagePlaylistDetail();
  }, [playlistId]);
}

export interface PlaylistCardTable {
  playlistCard: PlaylistCard[];
  totalCount: number;
  totalLearningTime: number;
}

export interface PlaylistCard {
  cardThumbnailImage: string;
  cardTitle: string;
  phaseCount: number;
  completePhaseCount: number;
  learningTime: number;
  stepCount: number;
  cardId: string;
}

export interface PlaylistComment {
  commentId: string;
  reviewId: string;
  commentsCount: number;
}

export const [setPlaylistComment, onPlaylistComment, getPlaylistComment] =
  createStore<PlaylistComment>();
