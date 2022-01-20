import { Accordion, Button, Icon } from 'semantic-ui-react';
import * as React from 'react';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';
import { PlaylistInCard } from '../../present/logic/PlaylistStore';
import { Simulate } from 'react-dom/test-utils';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  active: boolean;
  index: number;
  playlistSummary: PlaylistDetailSummary;
  playlistInCards: PlaylistInCard[] | undefined;

  onClickPlaylistContents: (index: number) => void;
  routeToCardOverView: (cardId: string) => void;
  onClickRegisterPlaylist: (playlistId: string) => void;
  onClickLike: (feedbackId: string, state: boolean) => void;
}

function getHourMinuteFormat(hour: number, minute: number) {
  //
  let time = '';

  time = hour > 0 ? time + `${hour}h` : time;
  time = minute > 0 ? time + ` ${minute}m` : time;

  if (hour === 0 && minute === 0) {
    time = '00h 00m';
  }

  return <span className="time">{time}</span>;
}

function UserProfileInfoTabPlaylistView(props: Props) {
  //
  const { active, index, playlistSummary, playlistInCards } = props;
  const {
    onClickPlaylistContents,
    routeToCardOverView,
    onClickRegisterPlaylist,
    onClickLike,
  } = props;

  return (
    <div className="mylist-acc-item" key={playlistSummary.id}>
      <Accordion.Title active={active}>
        <div className="acc-top">
          <div className="acc-tit">
            <strong>{playlistSummary.title}</strong>
          </div>
          <div className="acc-meta">
            <Button
              className="like"
              onClick={() =>
                onClickLike(
                  playlistSummary.likeFeedbackId,
                  playlistSummary.myLike
                )
              }
            >
              <Icon
                aria-hidden="true"
                className={
                  playlistSummary.myLike ? 'heart16' : 'heart16 active'
                }
              />
              {playlistSummary.likeCount}
            </Button>
            <Button
              className="add-black"
              onClick={() => onClickRegisterPlaylist(playlistSummary.id)}
            >
              <Icon aria-hidden="true" className="add-black16" />
              {getPolyglotText(`Playlist 담기`, 'profilecard-playlist-add')}
            </Button>
          </div>
          <div className="acc-cnt">
            <Button
              className="acc-updown"
              onClick={() => {
                if (playlistSummary.cardIds.length > 0) {
                  onClickPlaylistContents(index);
                }
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `총 {cardCount}개의 학습카드`,
                    'profilecard-playlist-cardcount',
                    {
                      cardCount: playlistSummary.cardIds.length.toString(),
                    }
                  ),
                }}
              />
              {(playlistSummary.cardIds.length > 0 && (
                <Icon area-hidden="true" className="drop24-down" />
              )) ||
                null}
            </Button>
          </div>
        </div>
      </Accordion.Title>
      <Accordion.Content active={active}>
        <div className="list-wrap">
          <ul className="acc-card-list">
            {playlistInCards &&
              playlistInCards.map((card) => {
                //

                return (
                  <li className="item">
                    <a
                      href=""
                      className="inner"
                      onClick={() => routeToCardOverView(card.cardId)}
                    >
                      <div className="ellipsis tit">{card.cardTitle}</div>
                      <div className="item-dt">
                        <span className="cnt">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: getPolyglotText(
                                `{cubeCount}개`,
                                'profilecard-playlist-cubecount',
                                {
                                  cubeCount: card.count.toString(),
                                }
                              ),
                            }}
                          />
                        </span>
                        <span className="time">
                          {getHourMinuteFormat(
                            Math.floor(card.leaningTime / 60),
                            card.leaningTime % 60
                          )}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </Accordion.Content>
    </div>
  );
}

export default UserProfileInfoTabPlaylistView;
