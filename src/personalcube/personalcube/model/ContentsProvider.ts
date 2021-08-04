import {
  getDefaultLang,
  LangSupport,
} from '../../../lecture/model/LangSupport';
import {
  parsePolyglotString,
  PolyglotString,
} from '../../../shared/viewmodel/PolyglotString';
import { AreaType } from './AreaType';

export interface ContentsProvider {
  id: string;
  name: PolyglotString | null;
  phoneNumber: string;
  email: string;
  url: string;
  creator: {
    keyString: string;
  };
  areaType: AreaType;
  enabled: boolean;
  link: boolean;
  remark: string;
  depotId: string;
  thumbnailPath: string;
  time: number;
  langSupports: LangSupport[];
}

export function getSelectOptions(
  contentsProviders: ContentsProvider[]
): SelectOption[] {
  const selectOptions: SelectOption[] = [];

  selectOptions.push({
    key: '',
    text: '선택해주세요',
    value: '',
  });

  contentsProviders.forEach((contentsProvider) => {
    selectOptions.push({
      key: contentsProvider.id,
      text: parsePolyglotString(
        contentsProvider.name,
        getDefaultLang(contentsProvider.langSupports)
      ),
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
