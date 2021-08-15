import { SkProfileService } from 'profile/stores';
import _ from 'lodash';

export interface PolyglotString {
  ko: string | null;
  en: string | null;
  zh: string | null;
  k?: string | null;
  e?: string | null;
  z?: string | null;
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

function parseLanguageToRaw(languange: string): 'k' | 'e' | 'z' {
  if (languange === 'English') {
    return 'e';
  }
  if (languange === 'Chinese') {
    return 'z';
  }

  return 'k';
}

export function parsePolyglotString(
  polyglotString: PolyglotString | null | undefined,
  languange: 'ko' | 'en' | 'zh' = 'ko'
): string {
  if (polyglotString === null || polyglotString === undefined) {
    return '';
  }
  const userLanguage = parseLanguage(
    SkProfileService.instance.skProfile.language
  );
  if (!_.isEmpty(polyglotString[userLanguage])) {
    return polyglotString[userLanguage] || '';
  }
  return (
    polyglotString[languange] ||
    parsePolyglotStringFromRaw(polyglotString) ||
    ''
  );
}

function parsePolyglotStringFromRaw(
  polyglotString: PolyglotString | null | undefined
): string | undefined {
  if (polyglotString === null || polyglotString === undefined) {
    return '';
  }
  const userLanguage = parseLanguageToRaw(
    SkProfileService.instance.skProfile.language
  );
  if (!_.isEmpty(polyglotString[userLanguage])) {
    return polyglotString[userLanguage] || '';
  }
  return undefined;
}
