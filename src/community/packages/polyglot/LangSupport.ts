import { isObservableArray } from 'mobx';

export interface LangSupport {
  defaultLang: boolean;
  lang: string;
}

export function getDefaultLang(
  langSupports: LangSupport[]
): 'ko' | 'en' | 'zh' {
  if (isObservableArray(langSupports)) {
    langSupports = Array.from(langSupports);
  }

  if (Array.isArray(langSupports)) {
    const langSupport = langSupports.find((c) => c.defaultLang);
    if (langSupport !== undefined) {
      if (langSupport.lang === 'English') {
        return 'en';
      }
      if (langSupport.lang === 'Chinese') {
        return 'zh';
      }
    }
  }
  return 'ko';
}
