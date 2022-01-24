import requestMyPagePlaylistDetail from '../MyPagePlaylistDetail.request';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { modifyPlaylist } from 'playlist/data/apis';
import { getMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';
import {
  getCheckedCardList,
  setCheckedCardList,
} from './MyPagePlaylistDetailCardList.service';

export function downCardContent(contentIndex: number) {
  const checkedCardList = getCheckedCardList();
  if (checkedCardList === undefined) {
    return;
  }
  if (contentIndex >= checkedCardList.length - 1) {
    return;
  }

  const nextContents = [
    ...checkedCardList.filter((_, i) => i < contentIndex),
    checkedCardList[contentIndex + 1],
    checkedCardList[contentIndex],
    ...checkedCardList.filter((_, i) => i > contentIndex + 1),
  ];

  setCheckedCardList(nextContents);
}

export function upCardContent(contentIndex: number) {
  if (contentIndex === 0) {
    return;
  }
  const checkedCardList = getCheckedCardList();
  if (checkedCardList === undefined) {
    return;
  }

  const nextContents = [
    ...checkedCardList.filter((_, i) => i < contentIndex - 1),
    checkedCardList[contentIndex],
    checkedCardList[contentIndex - 1],
    ...checkedCardList.filter((_, i) => i > contentIndex),
  ];

  setCheckedCardList(nextContents);
}

export function deleteCardContent() {
  const checkedCardList = getCheckedCardList();
  if (checkedCardList === undefined) {
    return;
  }
  if (!checkedCardList.some((c) => c.checked === true)) {
    reactAlert({
      title: getPolyglotText('학습카드 삭제하기', 'playlist-popup-삭제하기'),
      message: getPolyglotText(
        '삭제할 학습카드를 선택해주세요.',
        'playlist-popup-카드삭제'
      ),
    });
    return;
  }
  const nextContents = checkedCardList.filter((card) => card.checked !== true);

  setCheckedCardList(nextContents);
}

export function checkCardContent(contentIndex: number) {
  const checkedCardList = getCheckedCardList();
  if (checkedCardList === undefined) {
    return;
  }

  const next = checkedCardList.map((card, i) => {
    return {
      ...checkedCardList,
      cardId: card.cardId,
      cardTitle: card.cardTitle,
      cardThumNail: card.cardThumNail,
      checked: i === contentIndex ? !card.checked : card.checked,
    };
  });
  setCheckedCardList(next);
}

export function sumbitEditCardList() {
  const playlist = getMyPagePlaylistDetail();
  const cardList = getCheckedCardList();
  const cardIds = cardList?.map((card) => card.cardId);

  if (cardIds !== undefined && playlist?.playlistId !== undefined) {
    reactConfirm({
      title: getPolyglotText('Playlist 편집하기', 'playlist-popup-편집하기'),
      message: getPolyglotText(
        'Playlist를 편집하시겠습니까? <br/> 추천받은 구성원들에게도 편집한 내용이 반영됩니다.',
        'playlist-popup-편집컨펌'
      ),
      onOk: async () => {
        modifyPlaylist(playlist.playlistId, {
          nameValues: [
            {
              name: 'cardIds',
              value: JSON.stringify(cardIds),
            },
          ],
        }).then(() => {
          requestMyPagePlaylistDetail(playlist.playlistId);
        });
      },
      onCancel: () => {
        requestMyPagePlaylistDetail(playlist.playlistId);
        return false;
      },
    });
  }
}
