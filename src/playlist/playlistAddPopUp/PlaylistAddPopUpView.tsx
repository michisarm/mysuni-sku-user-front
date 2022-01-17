import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Modal, ModalActions } from 'semantic-ui-react';
import {
  onAddLearningCard,
  onClickAddPlaylist,
  onClosePlaylistAddPopUpView,
  onIsCheckPlaylist,
} from './playlistAddPopUpView.events';
import { useRequestPlaylistAddPopUpView } from './playlistAddPopUpView.request';
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
        <div className="text">{`생성된 Playlist가 없습니다.\n구성원들과 함께 학습할 Playlist를 만들어보세요!`}</div>
      </div>
    );
  }

  return (
    <>
      <div className="add-list-top">
        <span>나의 Playlist </span>
        <strong>{myPlaylist.length}개</strong>
      </div>
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
                  <div className="add-cnt">
                    전체 <strong>{playlist.learningCardCount}개</strong>{' '}
                    학습카드
                  </div>
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

  useRequestPlaylistAddPopUpView();

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
    onClickAddPlaylist(playlistName).then((result) => {
      if (result) {
        setIsShowAddPlaylistInput(false);
        setPlaylistName('');
      }
    });
  }, [playlistName]);

  useEffect(() => {
    if (!isOpen) {
      setIsShowAddPlaylistInput(false);
      setPlaylistName('');
    }
  }, [isOpen]);

  return (
    <Modal className="base w600 pl-add" open={isOpen}>
      <Modal.Header className="res xfl">
        Playlist 추가하기
        <Button className="close24" onClick={onClosePlaylistAddPopUpView}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="scroll">
          <div className={`add-top ${isShowAddPlaylistInput ? 'show' : ''}`}>
            <Button className="pl-add" onClick={onClickIsShowAddPlaylistInput}>
              <Icon className="listmore16-black" />
              새로운 Playlist 만들기
            </Button>
            <div className="pl-search">
              <div
                className={`ui input h38 ${
                  playlistName.length > 30 ? 'error' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder="Playlist 명을 입력해주세요."
                  onChange={onChangePlaylistName}
                  value={playlistName}
                />
                <span className="validation">
                  최대 30자까지 입력 가능합니다.
                </span>
              </div>
              <Button className="bl" onClick={handleAddPlaylistButton}>
                만들기
              </Button>
              <Button className="cl" onClick={onClickIsShowAddPlaylistInput}>
                취소
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
          추가
        </Button>
      </ModalActions>
    </Modal>
  );
}
