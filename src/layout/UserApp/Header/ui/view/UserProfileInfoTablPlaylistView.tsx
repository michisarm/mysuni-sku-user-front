import { Accordion, Button, Icon } from 'semantic-ui-react';
import * as React from 'react';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';
import { PlaylistInCard } from '../../present/logic/PlaylistStore';

interface Props {
  active: boolean;
  index: number;
  playlistSummary: PlaylistDetailSummary;
  playlistInCards: PlaylistInCard[] | undefined;

  onClickPlaylistContents: (index: number) => void;
  routeToCardOverView: (cardId: string) => void;
}

function getHourMinuteFormat(hour: number, minute: number) {
  //
  let time = '';

  time = hour > 0 ? time + `${hour}h` : time;
  time = minute > 0 ? time + ` ${minute}m` : time;

  return <span className="time">{time}</span>;
}

function UserProfileInfoTabPlaylistView(props: Props) {
  //
  const { active, index, playlistSummary, playlistInCards } = props;
  const { onClickPlaylistContents, routeToCardOverView } = props;

  return (
    <div className="mylist-acc-item" key={playlistSummary.id}>
      <Accordion.Title active={active}>
        <div className="acc-top">
          <div className="acc-tit">
            <strong>{playlistSummary.title}</strong>
          </div>
          <div className="acc-meta">
            <Button className="like">
              <Icon aria-hidden="true" className="heart16 active" />
              {`4,288`}
            </Button>
            <Button className="add-black">
              <Icon aria-hidden="true" className="add-black16" />
              {`Playlist 담기`}
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
              {`총 `}
              <strong
                className={playlistSummary.cardIds.length > 0 ? 'cnt' : ''}
              >
                {`${playlistSummary.cardIds.length} 개`}
              </strong>
              {` 학습카드`}
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
                        <span className="cnt">{`${card.count}개`}</span>
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
