export interface PolyglotString {
  ko: string | null;
  en: string | null;
  zh: string | null;
}

export function parsePolyglotString(
  polyglotString: PolyglotString | null,
  languange: 'ko' | 'en' | 'zh' = 'ko'
): string {
  if (polyglotString === null) {
    return '';
  }
  return polyglotString[languange] || '';
}
