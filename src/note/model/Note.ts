import { PatronKey } from '@nara.platform/accent';

export default interface Note {
  id: string;
  patronKey: PatronKey;
  cardId: string;
  cubeId: string;
  cubeType: string;
  content: string;
  folderId: string;
  playTime: string;
  registeredTime: number;
  modifiedTime: number;
}

export function getConvertEnter(content: string): string {
  let convertString: string = '';

  const stringArr = content.split('\n');
  stringArr.map((splitItem: string) => {
    convertString += '<p>' + splitItem + '</p>';
  });
  if (stringArr.length === 0) {
    convertString = content;
  }
  return convertString;
}
