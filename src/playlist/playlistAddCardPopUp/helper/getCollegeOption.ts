import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { isEmpty } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { Colleges } from '../playlistAddCardPopUp.stores';

export function getCollegeOption(colleges: Colleges[]) {
  const collegeOption = [
    {
      key: '',
      value: '',
      text: getPolyglotText('전체', 'mypage-playlist-전체리스트'),
    },
  ];

  if (!isEmpty(colleges)) {
    colleges.forEach((college) => {
      collegeOption.push({
        key: college.id,
        value: college.id,
        text: parsePolyglotString(college.name),
      });
    });
  }

  return collegeOption;
}
