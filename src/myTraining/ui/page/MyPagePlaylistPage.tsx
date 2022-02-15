import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Icon,
  Segment,
  Select,
} from 'semantic-ui-react';
import Image from 'shared/components/Image';
import myPageRoutePaths from 'myTraining/routePaths';
import {
  MyPlaylistsTable,
  selectOptions,
  setMyPagePlaylistFilterBox,
  useMyPagePlaylist,
  useMyPagePlaylistFilterBox,
} from '../view/playlist/myPagePlaylist/MyPagePlaylist.services';
import {
  playListItemClassName,
  playListItemType,
  onMyPagePlaylistPageFilter,
  onClickPlaylistSeeMore,
} from '../view/playlist/myPagePlaylist/MyPagePlaylist.events';
import { useHistory } from 'react-router-dom';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { PlaylistInputPopUpView } from 'playlist/playlistInputPopUp/PlaylistInputPopUpView';
import { onOpenPlaylistInputPopUp } from 'playlist/playlistInputPopUp/playlistInputPopUp.events';
import { SeeMoreButton } from 'lecture';
import {
  requestMyPagePlaylist,
  useRequestMyPagePlaylist,
} from '../view/playlist/myPagePlaylist/MyPagePlaylist.request';
import { Area } from 'tracker/model';

interface PropsType {
  playlist: MyPlaylistsTable;
}

function PlaylistItem(props: PropsType) {
  const { playlist } = props;
  const history = useHistory();

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((c) => {
        if (c.isIntersecting) {
          onClickPlaylistSeeMore();
        }
      });
    },
    []
  );

  const observer = useMemo<IntersectionObserver | null>(() => {
    const options = {
      threshold: 0.01,
    };
    if (window.IntersectionObserver !== undefined) {
      const next = new IntersectionObserver(intersectionCallback, options);
      return next;
    }

    return null;
  }, [intersectionCallback]);

  const seeMoreButtonViewRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (ref !== null) {
        observer?.observe(ref);
      } else {
        observer?.disconnect();
      }
    },
    [observer]
  );

  return (
    <>
      <CardGroup className="palylist-container">
        {playlist.results.map((item) => {
          let registerdDisplayName: string;
          if (item.displayNicknameFirst) {
            registerdDisplayName =
              item.nickname || parsePolyglotString(item.name) || '';
          } else {
            registerdDisplayName =
              parsePolyglotString(item.name) || item.nickname || '';
          }

          return (
            <Card
              className={`playlist-box card-item ${playListItemClassName(
                item.type
              )}`}
              onClick={() => {
                history.push(myPageRoutePaths.myPagePlaylistDetail(item.id));
              }}
            >
              <div className="playlist-info-box">
                <div className="list-type">{playListItemType(item.type)}</div>
                <div className="list-title">{item.title}</div>
                <div
                  className="list-course"
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `총 {totalCount}개 학습카드`,
                      'mypage-playlist-학습카드총수',
                      {
                        totalCount: item.cardIds.length.toString(),
                      }
                    ),
                  }}
                />
              </div>
              <div className="maker-info-box">
                <div className="maker-thumb">
                  <Image
                    src={item.photoImagePath}
                    alt="만든사람 프로필이미지"
                  />
                </div>
                <div className="maker-user">{registerdDisplayName}</div>
              </div>
            </Card>
          );
        })}
      </CardGroup>

      {playlist.totalCount > playlist.results.length && (
        <SeeMoreButton
          onClick={onClickPlaylistSeeMore}
          ref={seeMoreButtonViewRef}
        />
      )}
    </>
  );
}

function NoPlaylistItem() {
  const afterAddPlaylistCallback = useCallback(() => {
    // setMyPagePlaylistFilterBox({ playlistType: '', offset: 0 });
    // requestMyPagePlaylist();
  }, []);

  return (
    <>
      <div className="no-cont-wrap">
        <Icon className="no-contents80" />
        <span className="blind">콘텐츠 없음</span>
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '추천받거나 생성된 Playlist가 없습니다.<br />구성원들과 함께 학습할 Playlist를 만들어보세요!',
              'mypage-playlist-No플레이리스트'
            ),
          }}
        />
        <Button className="btn-playlist big" onClick={onOpenPlaylistInputPopUp}>
          <Icon className="create16" />
          <PolyglotText
            id="mypage-playlist-만들기버튼"
            defaultString="Playlist 만들기"
          />
        </Button>
      </div>
      <PlaylistInputPopUpView
        type="CREATE"
        afterCloseCallback={afterAddPlaylistCallback}
      />
    </>
  );
}

function MyPagePlaylistPage() {
  useRequestMyPagePlaylist();
  const filter = useMyPagePlaylistFilterBox();
  const playlist = useMyPagePlaylist();

  const afterAddPlaylistCallback = useCallback(() => {
    // setMyPagePlaylistFilterBox({ playlistType: '', offset: 0 });
    // requestMyPagePlaylist();
  }, []);

  return (
    <>
      <div
        className="mypage_contents profile-playlist-contents"
        data-area={Area.PLAYLIST_LIST}
      >
        <strong className="mypage_title">Playlist</strong>
        <div className="top-line">
          <span
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>{totalCount} 개</strong>의 Playlist가 있습니다.`,
                'mypage-playlist-리스트갯수',
                {
                  totalCount: (playlist?.totalCount || 0).toString(),
                }
              ),
            }}
          />
          <div className="select-wrap">
            <Select
              placeholder={getPolyglotText(
                `전체`,
                'mypage-playlist-전체리스트'
              )}
              className="ui small-border dropdown m0"
              options={selectOptions}
              onChange={onMyPagePlaylistPageFilter}
              value={filter?.playlistType || ''}
            />
            <Button className="btn-playlist" onClick={onOpenPlaylistInputPopUp}>
              +{' '}
              <PolyglotText
                id="mypage-playlist-만들기버튼"
                defaultString="Playlist 만들기"
              />
            </Button>
          </div>
        </div>

        <Segment className="full">
          <div className="group-wrapper">
            <div className="playlist-list list-wrapper">
              {playlist && playlist.totalCount !== 0 ? (
                <PlaylistItem playlist={playlist} />
              ) : (
                <NoPlaylistItem />
              )}
              {/*<NoPlaylistItem />*/}
            </div>
          </div>
        </Segment>
      </div>
      <PlaylistInputPopUpView
        type="CREATE"
        afterCloseCallback={afterAddPlaylistCallback}
      />
    </>
  );
}

export default MyPagePlaylistPage;
