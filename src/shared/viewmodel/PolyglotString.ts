export interface PolyglotString {
  ko: string;
  en: string;
  cn: string;
}

export function parsePolyglotString(
  polyglotString: PolyglotString,
  languange: 'ko' | 'en' | 'cn' = 'ko'
): string {
  return polyglotString[languange];
}
