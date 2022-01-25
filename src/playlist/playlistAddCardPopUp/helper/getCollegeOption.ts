import { isEmpty } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { Colleges } from '../playlistAddCardPopUp.stores';

export function getCollegeOption(colleges: Colleges[]) {
  const collegeOption = [
    {
      key: '',
      value: '',
      text: '전체',
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
