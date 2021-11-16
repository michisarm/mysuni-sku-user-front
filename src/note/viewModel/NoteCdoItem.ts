import { OffsetElementList } from '@nara.platform/accent';
import NoteCdo from '../model/NoteCdo';
import Note from '../model/Note';

export default interface NoteCdoItem {
  index: number;
  noteCdo?: NoteCdo;
}

export function getNoteCdoItem(index: number, noteCdo?: NoteCdo): NoteCdoItem {
  return {
    index,
    noteCdo,
  };
}
