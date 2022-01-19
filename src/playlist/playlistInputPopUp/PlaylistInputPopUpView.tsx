import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Modal,
  ModalActions,
} from 'semantic-ui-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  onChangePlaylistDescription,
  onChangePlaylistExpose,
  onChangePlaylistTitle,
  onClosePlaylistInputPopUp,
  onEditPlaylistInput,
  onSavePlaylistInput,
} from './playlistInputPopUp.events';
import { useRequestPlaylistDetail } from './playlistInputPopUp.request';
import {
  useIsOpenPlaylistInputPopUp,
  usePlaylistInputPopUp,
} from './playlistInputPopUp.store';

interface PlaylistInputPopUpProps {
  type: 'CREATE' | 'EDIT';
  afterCloseCallback?: () => void;
}

export function PlaylistInputPopUpView(props: PlaylistInputPopUpProps) {
  const { type, afterCloseCallback } = props;
  const isOpen = useIsOpenPlaylistInputPopUp();
  const playlistInput = usePlaylistInputPopUp();

  const { title, description, expose } = playlistInput;

  useRequestPlaylistDetail(type);

  const onSubmitPlaylist = useCallback(() => {
    if (type === 'CREATE') {
      onSavePlaylistInput()?.then((result) => {
        if (result) {
          afterCloseCallback && afterCloseCallback();
        }
      });
    }
    if (type === 'EDIT') {
      onEditPlaylistInput(afterCloseCallback);
    }
  }, [type, afterCloseCallback]);

  return (
    <Modal open={isOpen} className="base w600 pl-create">
      <Modal.Header className="res xfl">
        Playlist {type === 'CREATE' ? '만들기' : '수정하기'}
        <Button className="close24" onClick={onClosePlaylistInputPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="inner">
          <Form className="create-form">
            <div className="form-tit">
              Playlist 명<Icon className="essential" />
            </div>
            <div
              className={`ui right-top-count input ${
                title.length > 30 ? 'error' : ''
              }`}
            >
              <span className="count">
                <span className="now">{title.length}</span>/
                <span className="max">30</span>
              </span>
              <input
                placeholder={getPolyglotText(
                  'Playlist 명을 입력해주세요.',
                  'playlist-popup-타이틀필수입력'
                )}
                type="text"
                onChange={onChangePlaylistTitle}
                value={title}
              />
              <span className="validation">
                <PolyglotText
                  id="playlist-popup-최대30"
                  defaultString="최대 30자까지 입력 가능합니다."
                />
              </span>
            </div>
          </Form>
          <Form className="create-form">
            <div className="form-tit">
              <PolyglotText
                id="playlist-popup-소개글"
                defaultString="Playlist 소개 글"
              />
            </div>
            <div
              className={`ui right-top-count input ${
                description.length > 200 ? 'error' : ''
              }`}
            >
              <span className="count">
                <span className="now">{description.length}</span>/
                <span className="max">200</span>
              </span>
              <textarea
                placeholder={getPolyglotText(
                  '소개 글을 입력해 주세요.',
                  'playlist-popup-소개글입력'
                )}
                onChange={onChangePlaylistDescription}
                value={description}
              />
              <span className="validation">
                <PolyglotText
                  id="playlist-popup-최대200"
                  defaultString="최대 200자까지 입력 가능합니다."
                />
              </span>
            </div>
          </Form>
          <div className="cr-check">
            <Checkbox
              className="base"
              label={getPolyglotText(
                'Playlist를 프로필카드에 노출합니다.',
                'playlist-popup-프로필카드노출'
              )}
              onChange={onChangePlaylistExpose}
              checked={expose}
            />
          </div>
        </div>
      </Modal.Content>
      <ModalActions>
        <Button className="w190 pop p" onClick={onSubmitPlaylist}>
          {type === 'CREATE' ? '저장' : '수정'}
        </Button>
      </ModalActions>
    </Modal>
  );
}
