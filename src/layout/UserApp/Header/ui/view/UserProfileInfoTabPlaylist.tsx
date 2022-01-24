import * as React from 'react';
import { Accordion, Button, Icon, Tab } from 'semantic-ui-react';
import UserProfileInfoTabPlaylistView from './UserProfileInfoTablPlaylistView';
import {
  useProfileCardPlaylist,
  useProfileCardPlaylistCards,
} from '../../present/logic/PlaylistStore';
import { useCallback, useEffect, useState } from 'react';
import {
  findProfileCardPlaylistByDenizenId,
  registerLike,
  removeLike,
  addMyPlaylistByPlaylistId,
} from '../../present/logic/PlaylistService';
import { useHistory } from 'react-router-dom';
import { reactAlert } from '@nara.platform/accent';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  memberId: string | undefined;
  setOpen: (state: boolean) => void;
}

function UserProfileInfoTabPlaylist(props: Props) {
  //
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (props.memberId) {
      findProfileCardPlaylistByDenizenId(props.memberId);
    }
  }, [props.memberId]);

  const onClickPlaylistContents = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const onClickRegisterPlaylist = async (playlistId: string) => {
    //
    const added = await addMyPlaylistByPlaylistId(playlistId);

    if (added) {
      reactAlert({
        title: getPolyglotText(
          'Playlist 담기',
          'profilecard-playlist-alert-title'
        ),
        message: getPolyglotText(
          'Playlist를 담았습니다. My Page > Playlist 메뉴에서 확인하세요.',
          'profilecard-playlist-alert-text'
        ),
        onClose: () => {},
      });
    } else {
      reactAlert({
        title: getPolyglotText(
          '이미 담은 Playlist 입니다.',
          getPolyglotText(
            'My Page > Playlist 메뉴에서 확인해주세요.',
            'profilecard-playlist-alert-text2'
          )
        ),
        message: 'MyPage > Playlist 메뉴에서 확인하세요.',
        onClose: () => {},
      });
    }
  };

  const onClickLike = async (feedbackId: string, state: boolean) => {
    if (state) {
      await removeLike(feedbackId);
    } else {
      await registerLike(feedbackId);
    }
    if (props.memberId) {
      await findProfileCardPlaylistByDenizenId(props.memberId);
    }
  };

  const profileCardPlaylistSummaries = useProfileCardPlaylist();
  const playlistInCards = useProfileCardPlaylistCards();
  const history = useHistory();

  const routeToCardOverView = useCallback((cardId: string) => {
    history.push(`/lecture/card/${cardId}/view`);
  }, []);

  return (
    <Tab.Pane>
      <div className="pl-pc-wrap">
        <div className="inner">
          {(profileCardPlaylistSummaries &&
            profileCardPlaylistSummaries.playListSummaries && (
              <>
                <div
                  className="list-top"
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `총 {totalCount}개의 Playlist가 있습니다.`,
                      'profilecard-playlist-count',
                      {
                        totalCount:
                          profileCardPlaylistSummaries.playListSummaries.length.toString(),
                      }
                    ),
                  }}
                />
                <div className="pl-mylist">
                  <Accordion className="pl-mylist-acc">
                    {profileCardPlaylistSummaries.playListSummaries.map(
                      (playlistSummary, index) => {
                        //
                        const cards =
                          playlistInCards &&
                          playlistInCards.playlistInCards &&
                          playlistInCards.playlistInCards.filter((card) =>
                            playlistSummary.cardIds.includes(card.cardId)
                          );

                        return (
                          <UserProfileInfoTabPlaylistView
                            active={activeIndex === index}
                            index={index}
                            playlistSummary={playlistSummary}
                            playlistInCards={cards}
                            onClickPlaylistContents={onClickPlaylistContents}
                            routeToCardOverView={routeToCardOverView}
                            onClickRegisterPlaylist={onClickRegisterPlaylist}
                            onClickLike={onClickLike}
                          />
                        );
                      }
                    )}
                  </Accordion>
                </div>
              </>
            )) || (
            <div className="no-cont-wrap">
              <Icon aria-hidden="true" className="no-contents80" />
              <span className="blind">
                <PolyglotText
                  id="통검-전학강-콘텐츠없음"
                  defaultString="콘텐츠 없음"
                />
              </span>
              <div className="text">
                <PolyglotText
                  id="profilecard-playlist-nodata"
                  defaultString="생성된 Playlist가 없습니다."
                />
                생성된 PlayList가 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </Tab.Pane>
  );
}

export default UserProfileInfoTabPlaylist;
