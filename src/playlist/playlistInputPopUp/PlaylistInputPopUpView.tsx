import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Modal,
  ModalActions,
} from 'semantic-ui-react';
import { getCurrentHistory } from 'shared/store/HistoryStore';
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
  setIsOpenPlaylistInputPopUp,
  setPlaylistInputPopUp,
  useIsOpenPlaylistInputPopUp,
  usePlaylistInputPopUp,
} from './playlistInputPopUp.store';
import myPageRoutePaths from 'myTraining/routePaths';

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

  useEffect(() => {
    setIsOpenPlaylistInputPopUp(false);
    setPlaylistInputPopUp({
      title: '',
      description: '',
      expose: true,
    });
  }, []);

  const onSubmitPlaylist = useCallback(() => {
    if (type === 'CREATE') {
      onSavePlaylistInput()?.then((playlistId) => {
        if (playlistId) {
          getCurrentHistory()?.push(
            myPageRoutePaths.myPagePlaylistDetail(playlistId)
          );
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
        {type === 'CREATE'
          ? getPolyglotText('Playlist 만들기', 'playlist-popup-만들기')
          : getPolyglotText('Playlist 수정하기', 'playlist-popup-수정하기')}
        <Button className="close24" onClick={onClosePlaylistInputPopUp}>
          <Icon className="close24" />
        </Button>
      </Modal.Header>
      <Modal.Content>
        <div className="inner">
          <Form className="create-form">
            <div className="form-tit">
              <PolyglotText
                defaultString="Playlist 명"
                id="playlist-popup-이름입력"
              />
              <Icon className="essential" />
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
          {type === 'CREATE'
            ? getPolyglotText('저장', 'mypage-playlist-저장하기')
            : getPolyglotText('수정', 'mypage-playlist-수정하기')}
        </Button>
      </ModalActions>
    </Modal>
  );
}
