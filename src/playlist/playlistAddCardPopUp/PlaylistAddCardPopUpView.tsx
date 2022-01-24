import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { CardSearch } from './components/CardSearch';
import { CardSearchResult } from './components/CardSearchResult';
import {
  onAddCardToPlaylist,
  onClosePlaylistAddCardPopUp,
} from './playlistAddCardPopUp.events';
import { useIsOpenPlaylistAddCardPopUp } from './playlistAddCardPopUp.stores';

interface PlaylistAddCardPopUpProps {
  onAddCardCallback?: (cardIds: string[]) => void;
}

/**
 * @param onAddCardCallback cardIds 를 받아서 처리할 수 있는 callback 함수
 */

export function PlaylistAddCardPopUpView({
  onAddCardCallback,
}: PlaylistAddCardPopUpProps) {
  const isOpen = useIsOpenPlaylistAddCardPopUp();
  return (
    <Modal open={isOpen} className="base popup_slt_card">
      <Modal.Header className="res xfl">
        <PolyglotText defaultString="Card 선택" id="playlist-popup-카드선택" />
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
          <PolyglotText defaultString="추가" id="playlist-popup-서밋버튼" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
