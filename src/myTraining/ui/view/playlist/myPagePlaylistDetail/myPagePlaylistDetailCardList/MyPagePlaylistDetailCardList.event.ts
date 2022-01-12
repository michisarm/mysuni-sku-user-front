import { modifyPlaylist } from 'playlist/data/apis';
import { getMyPagePlaylistDetail } from '../MyPagePlaylistDetail.services';
import requestMyPagePlaylistDetailCardList from './MyPagePlaylistDetailCardList.request';
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
    modifyPlaylist(playlist.playlistId, {
      nameValues: [
        {
          name: 'cardIds',
          value: JSON.stringify(cardIds),
        },
      ],
    });
    requestMyPagePlaylistDetailCardList(cardIds);
  }
}
