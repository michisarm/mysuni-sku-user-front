import React, { useState } from 'react';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { Button, Icon, Label } from 'semantic-ui-react';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { useMyPagePlaylistDetailCards } from '../MyPagePlaylistDetail.services';
import MyPageMadeMyselfPlaylistCardList from './MyPageMadeMyselfPlaylistCardList';
import MyPageOthersPlaylistCardList from './MyPageOthersPlaylistCardList';
import classNames from 'classnames';
import MyPageMadeMyselfPlaylistEditCardList from './MyPageMadeMyselfPlaylistEditCardList';
import {
  deleteCardContent,
  sumbitEditCardList,
} from './MyPagePlaylistDetailCardList.event';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { onOpenPlaylistAddCardPopUp } from 'playlist/playlistAddCardPopUp/playlistAddCardPopUp.events';
import { PlaylistAddCardPopUpView } from 'playlist/playlistAddCardPopUp/PlaylistAddCardPopUpView';

interface propsType {
  type: PlaylistType;
}

function MyPagePlaylistDetailCardList(props: propsType) {
  const isMadeByMyself: Boolean = props.type === 'MadeByMyself' ? true : false;
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const cards = useMyPagePlaylistDetailCards();

  if (cards === undefined) {
    return null;
  }
  const totalLearningTime = timeToHourMinutePaddingFormat(
    cards.totalLearningTime
  );

  if (isMadeByMyself) {
    return (
      <div className="playlist-view-content">
        <div className={classNames('list-top', { active: isEdit })}>
          <div className="list-top-left f-left">
            {isEdit ? (
              <div className="list-top-left f-left">
                <Button className="btn-delete-list" onClick={deleteCardContent}>
                  <PolyglotText
                    defaultString="학습카드 삭제"
                    id="playlist-popup-삭제버튼"
                  />
                </Button>
                <Label
                  as="Button"
                  className="onlytext btn-add-list"
                  onClick={onOpenPlaylistAddCardPopUp}
                >
                  <Icon className="plus round16" />
                  <span>
                    <PolyglotText
                      id="mypage-playlist-학습카드추가"
                      defaultString="학습카드 추가"
                    />
                  </span>
                </Label>
                <PlaylistAddCardPopUpView />
              </div>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      `총 <strong>{totalCount}개</strong> 학습카드`,
                      'mypage-playlist-학습카드수',
                      {
                        totalCount: cards.totalCount.toString(),
                      }
                    ),
                  }}
                />
                <div>{totalLearningTime}</div>
              </>
            )}
          </div>
          <div className="list-top-right f-right">
            <Label
              as="button"
              className="onlytext btn-modify-list"
              onClick={() => {
                setIsEdit(!isEdit);
                isEdit && sumbitEditCardList();
              }}
            >
              <Icon className="cog16" />
              <span>
                {isEdit
                  ? getPolyglotText('편집완료', 'mypage-playlist-편집완료')
                  : getPolyglotText('편집하기', 'mypage-playlist-편집하기')}
              </span>
            </Label>
          </div>
        </div>
        {isEdit ? (
          <MyPageMadeMyselfPlaylistEditCardList />
        ) : (
          <MyPageMadeMyselfPlaylistCardList {...cards} />
        )}
      </div>
    );
  } else {
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
                    totalCount: cards.totalCount.toString(),
                  }
                ),
              }}
            />
            <div>{totalLearningTime}</div>
          </div>
        </div>
        <MyPageOthersPlaylistCardList {...cards} />
      </div>
    );
  }
}

export default MyPagePlaylistDetailCardList;
