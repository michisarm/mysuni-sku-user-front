import { getPolyglotText } from './PolyglotText';

export enum CubeStateView {
  Created = '저장',
  OpenApproval = '승인대기',
  Opened = '승인',
  Rejected = '반려',
}

export enum AplStateView {
  Created = ' ',
  OpenApproval = '승인요청',
  Opened = '승인완료',
  Rejected = '반려',
}

type StringDict = { [key: string]: string };

const EnumUtil = {
  getEnumValue(dict: StringDict, targetKey: string) {
    const result: Map<string, string> = new Map<string, string>();
    Object.keys(dict).map((key) => {
      if (key === targetKey) result.set(key, dict[key]);
    });

    return result;
  },
};

export function cubeStatePolyglot(s: string) {
  if (s === '저장') {
    return getPolyglotText('저장', 'Create-MainList-저장');
  } else if (s === '승인') {
    return getPolyglotText('승인', 'Create-MainList-승인dd');
  } else if (s === '승인대기') {
    return getPolyglotText('승인대기', 'Create-MainList-승대');
  } else if (s === '반려') {
    return getPolyglotText('반려', 'Create-MainList-반려');
  } else {
    return '';
  }
}

export default EnumUtil;
