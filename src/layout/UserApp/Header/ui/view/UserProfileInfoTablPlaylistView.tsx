import { Accordion, Button, Icon, Image } from 'semantic-ui-react';
import * as React from 'react';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';
import { PlaylistInCard } from '../../present/logic/PlaylistStore';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import ProfileImage from '../../../../../shared/components/Image/Image';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import moment from 'moment';
import { playListItemTypeForProfileCard } from '../../../../../myTraining/ui/view/playlist/myPagePlaylist/MyPagePlaylist.events';
import { SkProfileService } from '../../../../../profile/stores';

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

function getTimeAndStatFormat(playlistSummary: PlaylistDetailSummary) {
  //
  const language = SkProfileService.instance.skProfile.language;

  if (language === 'English') {
    return (
      <>
        <span className="stat">
          {playListItemTypeForProfileCard(playlistSummary.type)}
        </span>
        <span className="date">
          {moment(playlistSummary.registeredTime).format('YYYY-MM-DD')}
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="date">
          {moment(playlistSummary.registeredTime).format('YYYY-MM-DD')}
        </span>
        <span className="stat">
          {playListItemTypeForProfileCard(playlistSummary.type)}
        </span>
      </>
    );
  }
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

  const profileName =
    playlistSummary.displayNicknameFirst === true
      ? playlistSummary.nickname
      : parsePolyglotString(playlistSummary.name);

  return (
    <div className="mylist-acc-item" key={playlistSummary.id}>
      <Accordion.Title active={active}>
        <div className="acc-top">
          <div className="acc-tit">
            <strong>{playlistSummary.title}</strong>
          </div>
          <div className="acc-meta">
            {/*<Button*/}
            {/*  className="like"*/}
            {/*  onClick={() =>*/}
            {/*    onClickLike(*/}
            {/*      playlistSummary.likeFeedbackId,*/}
            {/*      playlistSummary.myLike*/}
            {/*    )*/}
            {/*  }*/}
            {/*>*/}
            {/*  <Icon*/}
            {/*    aria-hidden="true"*/}
            {/*    className={*/}
            {/*      playlistSummary.myLike ? 'heart16' : 'heart16 active'*/}
            {/*    }*/}
            {/*  />*/}
            {/*  {playlistSummary.likeCount}*/}
            {/*</Button>*/}

            <div className="ui profile">
              <div className="pic s36">
                <ProfileImage
                  className="ui image"
                  src={playlistSummary.photoImagePath}
                  alt=""
                />
              </div>
              <div className="prf-info">
                <span className="prf-name">{profileName}</span>
                <span className="prf-date">
                  {getTimeAndStatFormat(playlistSummary)}
                </span>
              </div>
            </div>
          </div>
          <div className="acc-cnt">
            <Button
              className="add-black"
              onClick={() => onClickRegisterPlaylist(playlistSummary.id)}
            >
              <Icon aria-hidden="true" className="add-black16" />
              {getPolyglotText(`Playlist ??????`, 'profilecard-playlist-add')}
            </Button>
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
                    `??? {cardCount}?????? ????????????`,
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
                  <li className="item" key={card.cardId}>
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
                                `{cubeCount}???`,
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
