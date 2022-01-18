import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { CheckboxProps } from 'semantic-ui-react';
import {
  setPlaylistInputPopUp,
  setIsOpenPlaylistInputPopUp,
  getPlaylistInputPopUp,
} from './playlistInputPopUp.store';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import {
  requestEditPlaylistInput,
  requestSavePlaylistInput,
} from './playlistInputPopUp.request';
import { isEmpty } from 'lodash';

export function onOpenPlaylistInputPopUp() {
  setIsOpenPlaylistInputPopUp(true);
}

export function onClosePlaylistInputPopUp() {
  setIsOpenPlaylistInputPopUp(false);
  setPlaylistInputPopUp({
    title: '',
    description: '',
    expose: true,
  });
}

// 플레이리스트 타이틀
export function onChangePlaylistTitle(e: React.ChangeEvent<HTMLInputElement>) {
  const title = e.target.value;
  const playlistInputPopUp = getPlaylistInputPopUp();

  setPlaylistInputPopUp({
    ...playlistInputPopUp,
    title,
  });
}

//플레이리스트 설명
export function onChangePlaylistDescription(
  e: React.ChangeEvent<HTMLTextAreaElement>
) {
  const description = e.target.value;
  const playlistInputPopUp = getPlaylistInputPopUp();

  setPlaylistInputPopUp({
    ...playlistInputPopUp,
    description,
  });
}

//플레이리스트 노출 정보
export function onChangePlaylistExpose(
  _: React.FormEvent,
  data: CheckboxProps
) {
  const isExpose = data.checked || true;
  const playlistInputPopUp = getPlaylistInputPopUp();

  setPlaylistInputPopUp({
    ...playlistInputPopUp,
    expose: isExpose,
  });
}

// 플레이 리스트 만들기
export function onSavePlaylistInput() {
  const playlistInputPopUp = getPlaylistInputPopUp();
  const { title, description, expose } = playlistInputPopUp;

  if (isEmpty(title)) {
    reactAlert({
      title: getPolyglotText('Playlist 만들기', 'playlist-popup-만들기'),
      message: getPolyglotText(
        'Playlist 명을 입력해주세요.',
        'playlist-popup-타이틀필수입력'
      ),
    });
    return;
  }

  //글자 수 초과 체크
  if (title.length > 30 || description.length > 200) {
    return;
  }

  setPlaylistInputPopUp({
    title: '',
    description: '',
    expose: true,
  });
  return requestSavePlaylistInput(title, description, expose);
}

// 플레이리스트 수정
export function onEditPlaylistInput(callback?: () => void) {
  const playlistInputPopUp = getPlaylistInputPopUp();
  const { title, description, expose } = playlistInputPopUp;

  // 필수 입력값 체크
  if (isEmpty(title)) {
    reactAlert({
      title: getPolyglotText('Playlist 수정하기', 'playlist-popup-수정하기'),
      message: getPolyglotText(
        'Playlist 명을 입력해주세요.',
        'playlist-popup-타이틀필수입력'
      ),
    });
    return;
  }

  //글자 수 초과 체크
  if (title.length > 30 || description.length > 200) {
    return;
  }

  reactConfirm({
    title: getPolyglotText('Playlist 수정하기', 'playlist-popup-수정하기'),
    message: getPolyglotText(
      'Playlist를 수정하시겠습니까 ? \n 추천받은 구성원들에게도 수정된 내용이 반영됩니다.',
      'playlist-popup-수정컨펌'
    ),
    onOk: () => {
      setPlaylistInputPopUp({
        title: '',
        description: '',
        expose: true,
      });
      requestEditPlaylistInput(title, description, expose)?.then((result) => {
        if (result) {
          callback && callback();
        }
      });
    },
  });
}
