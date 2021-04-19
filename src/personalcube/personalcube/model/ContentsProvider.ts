export interface ContentsProvider {
  areaType: string;
  creatorEmail: string;
  creatorId: string;
  creatorName: string;
  depotId: string;
  id: string;
  patronKey: {
    keyString: string;
  };
  link: boolean;
  providerEmail: string;
  providerName: string;
  providerPhoneNumber: string;
  providerUrl: string;
  remark: string;
  thumbnail: string;
  time: number;
  use: boolean;
}

export function getSelectOptions(contentsProviders: ContentsProvider[]): SelectOption[] {
  const selectOptions: SelectOption[] = [];

  selectOptions.push({
    key: '',
    text: '선택해주세요',
    value: '',
  });

  contentsProviders.forEach(contentsProvider => {
    selectOptions.push({
      key: contentsProvider.id,
      text: contentsProvider.providerName,
      value: contentsProvider.id,
    });
  });

  return selectOptions;
}

interface SelectOption {
  key: string;
  text: string;
  value: string;
}