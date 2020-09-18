export enum CubeStateView {
  Created = '저장',
  OpenApproval = '승인대기',
  Opened = '승인',
  Rejected = '반려',
}

export enum AplStateView {
  Created = '승인요청',
  OpenApproval = '승인대기',
  Opened = '승인완료',
  Rejected = '반려',
}

type StringDict = { [key: string]: string };

const EnumUtil = {
  getEnumValue(dict: StringDict, targetKey: string) {
    const result: Map<string, string> = new Map<string, string>();
    Object.keys(dict).map(key => {
      if (key === targetKey) result.set(key, dict[key]);
    });

    return result;
  },
};

export default EnumUtil;
