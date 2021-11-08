import NoteCdo from '../model/NoteCdo';

export default interface NoteCdoItem {
  index: number;
  noteCdo: NoteCdo;
}

export function getNoteCdoItem(index: number, noteCdo: NoteCdo): NoteCdoItem {
  return {
    index,
    noteCdo,
  };
}
