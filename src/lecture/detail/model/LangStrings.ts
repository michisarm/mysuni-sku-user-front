import { getDefaultLang, LangSupport } from '../../model/LangSupport';
import { SkProfileService } from '../../../profile/stores';
import _ from 'lodash';

export default interface LangStrings {
  //
  defaultLanguage: string;
  langStringMap: Record<string, string>;
}

function parseLanguage(languange: string): 'ko' | 'en' | 'zh' {
  if (languange === 'English') {
    return 'en';
  }
  if (languange === 'Chinese') {
    return 'zh';
  }

  return 'ko';
}

export function langStringsToString(
  langStrins: LangStrings | null,
  langSupports?: LangSupport[]
) {
  if (langStrins === null) {
    return '';
  }
  let lang = langStrins.defaultLanguage;
  if (langSupports !== undefined) {
    lang = getDefaultLang(langSupports);
  }

  const userLanguage = parseLanguage(
    SkProfileService.instance.skProfile.language
  );
  if (!_.isEmpty(langStrins.langStringMap[userLanguage])) {
    return langStrins.langStringMap[userLanguage] || '';
  }

  return langStrins.langStringMap[lang];
}
