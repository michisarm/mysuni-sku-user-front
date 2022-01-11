import React, { useCallback } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Modal,
  ModalActions,
} from 'semantic-ui-react';
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
}

export function PlaylistInputPopUpView(props: PlaylistInputPopUpProps) {
  const { type } = props;
  const isOpen = useIsOpenPlaylistInputPopUp();
  const playlistInput = usePlaylistInputPopUp();

  const { title, description, expose } = playlistInput;

  useRequestPlaylistDetail(type);

  const onSubmitPlaylist = useCallback(() => {
    if (type === 'CREATE') {
      onSavePlaylistInput();
    }
    if (type === 'EDIT') {
      onEditPlaylistInput();
    }
  }, [type]);

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
                placeholder="Playlist 명을 입력해 주세요. "
                type="text"
                onChange={onChangePlaylistTitle}
                value={title}
              />
              <span className="validation">최대 30자까지 입력 가능합니다.</span>
            </div>
          </Form>
          <Form className="create-form">
            <div className="form-tit">Playlist 소개 글</div>
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
                placeholder="소개 글을 입력해 주세요."
                onChange={onChangePlaylistDescription}
                value={description}
              />
              <span className="validation">
                최대 200자까지 입력 가능합니다.
              </span>
            </div>
          </Form>
          <div className="cr-check">
            <Checkbox
              className="base"
              label="Playlist를 프로필카드에 노출합니다."
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
