import { reactAlert } from '@nara.platform/accent';
import { trim } from 'lodash';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function textValidationCheck(searchText: string) {
  const trimSearchText = trim(searchText);

  if (trimSearchText.length === 0) {
    reactAlert({
      title: getPolyglotText('구성원 검색하기', 'playlist-popup-구성원검색'),
      message: getPolyglotText(
        '이름 또는 이메일을 입력해주세요.',
        'playlist-popup-구성원입력'
      ),
    });

    return false;
  }

  if (trimSearchText.length < 2) {
    reactAlert({
      title: getPolyglotText('구성원 검색하기', 'playlist-popup-구성원검색'),
      message: getPolyglotText(
        '두 글자 이상 검색해주세요.',
        'playlist-popup-두글자검색'
      ),
    });

    return false;
  }

  if (trimSearchText.includes('%')) {
    reactAlert({
      title: getPolyglotText('구성원 검색하기', 'playlist-popup-구성원검색'),
      message: getPolyglotText(
        '특수문자는 사용할 수 없습니다.',
        'playlist-popup-특수문자'
      ),
    });

    return false;
  }

  return true;
}
