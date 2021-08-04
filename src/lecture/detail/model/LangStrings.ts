import { getDefaultLang, LangSupport } from '../../model/LangSupport';

export default interface LangStrings {
  //
  defaultLanguage: string;
  langStringMap: Record<string, string>;
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
  return langStrins.langStringMap[lang];
}
