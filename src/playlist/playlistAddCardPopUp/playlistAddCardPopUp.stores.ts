import { CardWithContentsAndRelatedCountRom } from 'lecture/model/CardWithContentsAndRelatedCountRom';
import { createStore } from 'restoa';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import dayjs from 'dayjs';
import { Channel, College } from 'shared/service/requestAllColleges';

export interface PlaylistCard {
  cardId: string;
  cardName: string;
  creator: string;
  registerTime: string;
}

export interface PlaylistAddCardPopUpOffset {
  offset: number;
  totalCount: number;
}

export interface Colleges {
  id: string;
  name: PolyglotString;
  channels: Channel[];
}

export function cardRdoToPlaylistAddCard(
  cardRdo: CardWithContentsAndRelatedCountRom[]
) {
  const playlistAddCard = cardRdo.map((card) => {
    return {
      cardId: card.card?.id || '',
      cardName: parsePolyglotString(card.card?.name),
      creator: parsePolyglotString(card.cardContents.registrantName),
      registerTime: dayjs(card.cardOperatorIdentity?.registeredTime).format(
        'YYYY.MM.DD hh:mm:ss'
      ),
    };
  });

  return playlistAddCard;
}

export function collegesToPlaylistColleges(colleges: College[]) {
  const playlistCollege: Colleges[] = colleges.map((college) => {
    return {
      id: college.id,
      name: college.name,
      channels: college.channels,
    };
  });

  return playlistCollege;
}

// 팝업 on/off 상태값
export const [
  useIsOpenPlaylistAddCardPopUp,
  setIsOpenPlaylistAddCardPopUp,
  getIsOpenPlaylistAddCardPopUp,
] = createStore<boolean>(false);

export const [usePlaylistCards, setPlaylistCards, getPlaylistCards] =
  createStore<PlaylistCard[]>([]);

export const [usePlaylistColleges, setPlaylistColleges, getPlaylistColleges] =
  createStore<Colleges[]>([]);

//검색에 필요한 Stroe 값들
export const [
  usePlaylistAddCardPopUpOffset,
  setPlaylistAddCardPopUpOffset,
  getPlaylistAddCardPopUpOffset,
] = createStore<PlaylistAddCardPopUpOffset>({
  offset: 1,
  totalCount: 0,
});
export const [useSearchWord, setSearchWord, getSearchWord] =
  createStore<string>('');
export const [
  useSelectedCollegeId,
  setSelectedCollegeId,
  getSelectedCollegeId,
] = createStore<string>('');
export const [
  useSelectedChannelId,
  setSelectedChannelId,
  getSelectedChannelId,
] = createStore<string>('');

// 선택한 카드 상태값
export const [useCheckedCardIds, setCheckedCardIds, getCheckedCardIds] =
  createStore<string[]>([]);
