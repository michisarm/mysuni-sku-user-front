import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Modal, ModalActions } from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  onAddLearningCard,
  onClickAddPlaylist,
  onClosePlaylistAddPopUpView,
  onIsCheckPlaylist,
} from './playlistAddPopUpView.events';
import {
  useMyPlaylist,
  useIsOpenPlayListAddPopUp,
  MyPlaylist,
} from './playlistAddPopUpView.store';

interface AddPlaylistBottomViewProps {
  myPlaylist: MyPlaylist[];
}

// 학습카드 추가 플레이리스트 팝업 하단 부분
function AddPlaylistBottomView(props: AddPlaylistBottomViewProps) {
  const { myPlaylist } = props;

  if (myPlaylist.length === 0) {
    return (
      <div className="no-cont-wrap">
        <Icon className="no-contents80" />
        <span className="blind">콘텐츠 없음</span>
        <div className="text">
          <PolyglotText
            defaultString="생성된 Playlist가 없습니다."
            id="playlist-popup-NoPlaylist1"
          />
          <br />
          <PolyglotText
            defaultString="구성원들과 함께 학습할 Playlist를 만들어보세요!"
            id="playlist-popup-NoPlaylist2"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="add-list-top"
        dangerouslySetInnerHTML={{
          __html: getPolyglotText(
            `<span>나의 Playlist </span>
            <strong>{count}개</strong>`,
            'playlist-popup-나의리스트갯수',
            { count: myPlaylist.length.toString() }
          ),
        }}
      />

      <div className="add-list">
        {myPlaylist.map((playlist) => (
          <div className="add-item" id={playlist.playlistId}>
            <div className="inner">
              <div className="add-left">
                <Checkbox
                  className="base"
                  value={playlist.playlistId}
                  onChange={onIsCheckPlaylist}
                  checked={playlist.checked}
                />
              </div>
              <div className="add-right">
                <div className="add-tit">
                  <strong className="ellipsis">{playlist.title}</strong>
                </div>
                <div className="add-info">
                  <div
                    className="add-cnt"
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `전체 <strong>{totalCount}개</strong> 학습카드`,
                        'mypage-playlist-학습카드수',
                        { totalCount: playlist.learningCardCount.toString() }
                      ),
                    }}
                  />
                  <span>{playlist.registeredTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function PlaylistAddPopUpView() {
  const myPlaylist = useMyPlaylist();
  const isOpen = useIsOpenPlayListAddPopUp();
  const [isShowAddPlaylistInput, setIsShowAddPlaylistInput] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  const onChangePlaylistName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlaylistName(e.target.value);
    },
    []
  );

  const onClickIsShowAddPlaylistInput = useCallback(() => {
    if (isShowAddPlaylistInput) {
      setIsShowAddPlaylistInput(false);
      setPlaylistName('');
    } else {
      setIsShowAddPlaylistInput(true);
    }
  }, [isShowAddPlaylistInput]);

  const handleAddPlaylistButton = useCallback(() => {
    onClickAddPlaylist(playlistName).then((isSuccess) => {
      if (isSuccess) {
        setIsShowAddPlaylistInput(false);
        setPlaylistName('');
      }
    });
  }, [playlistName]);

  const onClickClose = useCallback(() => {
    onClosePlaylistAddPopUpView();
    setIsShowAddPlaylistInput(false);
    setPlaylistName('');
  }, []);

  useEffect(() => {
    return () => {
      onClosePlaylistAddPopUpView();
    };
  }, []);

  return (
    <Modal className="base w600 pl-add" open={isOpen}>
      <Modal.Header className="res xfl">
        <PolyglotText
          defaultString="Playlist 추가하기"
          id="playlist-popup-추가하기"
        />
        <Button className="close24" onClick={onClickClose}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="scroll">
          <div className={`add-top ${isShowAddPlaylistInput ? 'show' : ''}`}>
            <Button className="pl-add" onClick={onClickIsShowAddPlaylistInput}>
              <Icon className="listmore16-black" />
              <PolyglotText
                defaultString="새로운 Playlist 만들기"
                id="playlist-popup-새로생성"
              />
            </Button>
            <div className="pl-search">
              <div
                className={`ui input h38 ${
                  playlistName.length > 30 ? 'error' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder={getPolyglotText(
                    'Playlist 명을 입력해주세요.',
                    'playlist-popup-타이틀필수입력'
                  )}
                  onChange={onChangePlaylistName}
                  value={playlistName}
                />
                <span className="validation">
                  <PolyglotText
                    defaultString="최대 30자까지 입력 가능합니다."
                    id="playlist-popup-최대30"
                  />
                </span>
              </div>
              <Button className="bl" onClick={handleAddPlaylistButton}>
                <PolyglotText
                  defaultString="확인"
                  id="playlist-popup-확인버튼"
                />
              </Button>
              <Button className="cl" onClick={onClickIsShowAddPlaylistInput}>
                <PolyglotText
                  defaultString="취소"
                  id="playlist-popup-취소버튼"
                />
              </Button>
            </div>
          </div>
          <div className="add-bottom">
            <AddPlaylistBottomView myPlaylist={myPlaylist} />
          </div>
        </div>
      </Modal.Content>
      <ModalActions>
        <Button className="w190 pop p" onClick={onAddLearningCard}>
          <PolyglotText defaultString="추가" id="playlist-popup-서밋버튼" />
        </Button>
      </ModalActions>
    </Modal>
  );
}
