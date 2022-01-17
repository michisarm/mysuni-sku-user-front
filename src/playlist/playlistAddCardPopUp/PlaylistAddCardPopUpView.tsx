import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { CardSearch } from './components/CardSearch';
import { CardSearchResult } from './components/CardSearchResult';
import {
  onAddCardToPlaylist,
  onClosePlaylistAddCardPopUp,
} from './playlistAddCardPopUp.events';
import { useIsOpenPlaylistAddCardPopUp } from './playlistAddCardPopUp.stores';

export function PlaylistAddCardPopUpView() {
  const isOpen = useIsOpenPlaylistAddCardPopUp();
  return (
    <Modal open={isOpen} className="base popup_slt_card">
      <Modal.Header className="res xfl">
        Card 선택
        <Button className="close24" onClick={onClosePlaylistAddCardPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content className="scrolling-80vh">
        {/* 카드 검색  */}
        <CardSearch />
        {/* 검색 결과 */}
        <CardSearchResult />
      </Modal.Content>
      <Modal.Actions>
        <Button className="w190 pop p" onClick={onAddCardToPlaylist}>
          추가
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
