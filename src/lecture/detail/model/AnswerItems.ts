import LangStrings from './LangStrings';

interface Item {
  number: string;
  values: LangStrings;
}

interface ImageUrl {
  number: string;
  imageUrl: string;
}

export default interface AnswerItems {
  multipleChoice?: boolean;
  items?: Item[];
  columnItems?: Item[];
  rowItems?: Item[];
  imageUrls?: ImageUrl[];
  maxLength?: number;
}
