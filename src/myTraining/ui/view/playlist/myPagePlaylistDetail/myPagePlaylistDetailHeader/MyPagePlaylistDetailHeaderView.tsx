import classNames from 'classnames';
import { srcParser } from 'community/ui/components/Image';
import moment from 'moment';
import { onOpenPlaylistInputPopUp } from 'playlist/playlistInputPopUp/playlistInputPopUp.events';
import { PlaylistInputPopUpView } from 'playlist/playlistInputPopUp/PlaylistInputPopUpView';
import { onOpenPlaylistRecommendPopUp } from 'playlist/playlistRecommendPopUp/playlistRecommendPopUp.events';
import { PlaylistRecommendPopUpView } from 'playlist/playlistRecommendPopUp/PlaylistRecommendPopUpView';
import React, { useCallback } from 'react';
import { Icon, Image, Label } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import requestMyPagePlaylistDetail from '../MyPagePlaylistDetail.request';
import { PlaylistDetail } from '../MyPagePlaylistDetail.services';
import {
  likePlaylist,
  onDeletePlaylistClick,
  unlikePlaylist,
} from './MyPagePlaylistDetailHeader.events';
import { PlaylistLikeInfo } from './MyPagePlaylistDetailHeader.service';

export interface PlaylistHeaderViewType {
  playlistDetail: PlaylistDetail;
  PlaylistLikeInfo: PlaylistLikeInfo;
}

function MyPagePlaylistDetailHeaderView(props: PlaylistHeaderViewType) {
  const {
    playlistTitle,
    playlistDescription,
    registerdDisplayName,
    registeredTime,
    photoImagePath,
    recommendation,
    type,
    myPlaylistId,
    playlistId,
  } = props.playlistDetail;
  const { count, my } = props.PlaylistLikeInfo;
  const date = moment(registeredTime).format('YYYY.MM.DD'); // registeredTime 는 타입별로 생성날짜,담은날짜,추천날짜 값이 알아서 들어감

  const afterEditPlaylistCallback = useCallback(() => {
    requestMyPagePlaylistDetail(playlistId);
  }, [playlistId]);

  return (
    <>
      <div className="playlist-detail-info-inner">
        <div className="playlist-tit">{playlistTitle}</div>
        <div className="playlist-subtxt">{playlistDescription}</div>
        <div className="playlist-sub-infobox">
          <div className="f-left">
            <div className="maker-thumb">
              <Image
                src={srcParser(photoImagePath)}
                alt="만든사람 프로필이미지"
              />
            </div>
            <div className="maker-user">{registerdDisplayName}</div>
            {type === 'MadeByMyself' && (
              <div
                className="maker-date"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `{date} 생성`,
                    'mypage-playlist-생성',
                    {
                      date,
                    }
                  ),
                }}
              />
            )}
            {type === 'MadeByOthers' && (
              <div
                className="maker-date"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `{date} 담음`,
                    'mypage-playlist-담음',
                    {
                      date,
                    }
                  ),
                }}
              />
            )}
            {type === 'Recommended' && (
              <div
                className="maker-date"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `{date} 추천받음`,
                    'mypage-playlist-추천받음',
                    {
                      date,
                    }
                  ),
                }}
              />
            )}
          </div>
          <div className="f-right">
            <Label
              as="button"
              className={classNames('onlytext', { on: my })}
              onClick={my ? unlikePlaylist : likePlaylist}
            >
              <Icon className="like2" />
              <span>{count}</span>
            </Label>
            {type === 'MadeByMyself' ? (
              <>
                <Label
                  as="button"
                  className="onlytext"
                  onClick={onOpenPlaylistRecommendPopUp}
                >
                  <Icon className="share-comm line" />
                  <span>
                    <PolyglotText
                      id="mypage-playlist-추천하기"
                      defaultString="추천하기"
                    />
                  </span>
                </Label>
                <Label
                  as="button"
                  className="onlytext"
                  onClick={onOpenPlaylistInputPopUp}
                >
                  <Icon className="edit16" />
                  <span>Edit</span>
                </Label>
              </>
            ) : null}
            <Label
              as="button"
              className="onlytext"
              onClick={() => {
                onDeletePlaylistClick(myPlaylistId, type);
              }}
            >
              <Icon className="delete16" />
              <span>Delete</span>
            </Label>
          </div>
        </div>
      </div>
      {type === 'Recommended' ? (
        <div className="playlist-recommend-message">
          <span
            className="playlist-message-tit"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `{name}님의 추천 메시지`,
                'mypage-playlist-추천메세지',
                {
                  name: registerdDisplayName,
                }
              ),
            }}
          />
          {recommendation}
        </div>
      ) : null}
      <PlaylistInputPopUpView
        type="EDIT"
        afterCloseCallback={afterEditPlaylistCallback}
      />
      <PlaylistRecommendPopUpView />
    </>
  );
}

export default MyPagePlaylistDetailHeaderView;
