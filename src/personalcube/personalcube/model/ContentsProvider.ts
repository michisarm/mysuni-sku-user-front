export interface ContentsProvider {
  areaType: string;
  contentsProvider: {
    id: string;
    name: string;
  };
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
      key: contentsProvider.contentsProvider.id,
      text: contentsProvider.contentsProvider.name,
      value: contentsProvider.contentsProvider.id,
    });
  });

  return selectOptions;
}

interface SelectOption {
  key: string;
  text: string;
  value: string;
}