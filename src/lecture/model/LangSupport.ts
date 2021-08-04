export interface LangSupport {
  defaultLang: boolean;
  lang: string;
}

export function getDefaultLang(
  langSupports: LangSupport[]
): 'ko' | 'en' | 'zh' {
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
