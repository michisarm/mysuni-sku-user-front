import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { onOpenPlaylistAddCardPopUp } from 'playlist/playlistAddCardPopUp/playlistAddCardPopUp.events';
import { PlaylistAddCardPopUpView } from 'playlist/playlistAddCardPopUp/PlaylistAddCardPopUpView';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface propsType {
  type: PlaylistType;
}

function MyPagePlaylistDetailNoCardList(props: propsType) {
  return (
    <div className="playlist-view-content">
      <div className="list-top">
        <div className="list-top-left f-left">
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>{totalCount}개</strong> 학습카드`,
                'mypage-playlist-학습카드수',
                {
                  totalCount: '0',
                }
              ),
            }}
          />
          {/* 학습카드 추가 전엔 학습시간 표시 없음 */}
        </div>
        <div className="list-top-right f-right">
          {/* 학습카드 추가전엔 편집하기 버튼 없음 */}
        </div>
      </div>

      <div className="playlist-detail-wrap">
        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          {props.type === 'MadeByMyself' ? (
            <>
              <span className="blind">콘텐츠 없음</span>
              <div
                className="text"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `등록된 학습카드가 없습니다.
                <br />
                지금 바로 학습카드를 추가해보세요.`,
                    'mypage-playlist-NoCard'
                  ),
                }}
              />
              <Button
                className="btn-playlist big"
                onClick={onOpenPlaylistAddCardPopUp}
              >
                <Icon className="create16" />
                <PolyglotText
                  id="mypage-playlist-학카추가하기"
                  defaultString="학습카드 추가하기"
                />
              </Button>
            </>
          ) : (
            <>
              <span className="blind">콘텐츠 없음</span>
              <div
                className="text"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `등록된 학습카드가 없습니다.`,
                    'mypage-playlist-NoCard2'
                  ),
                }}
              />
            </>
          )}
          <PlaylistAddCardPopUpView />
        </div>
      </div>
    </div>
  );
}

export default MyPagePlaylistDetailNoCardList;
