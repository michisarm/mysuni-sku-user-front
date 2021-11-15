// import { SkProfileService } from 'profile/stores';
import { isEmpty } from 'lodash';

export interface PolyglotString {
  ko: string | null;
  en: string | null;
  zh: string | null;
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

export function parsePolyglotString(
  polyglotString: PolyglotString | null | undefined,
  languange: 'ko' | 'en' | 'zh' = 'ko'
): string {
  if (polyglotString === null || polyglotString === undefined) {
    return '';
  }
  // const userLanguage = parseLanguage(
  //   SkProfileService.instance.skProfile.language
  // );
  // if (!_.isEmpty(polyglotString[userLanguage])) {
  //   return polyglotString[userLanguage] || '';
  // }
  return polyglotString[languange] || '';
}
