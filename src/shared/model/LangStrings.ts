import { LangStrings as AccentLangStrings } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class LangStrings implements AccentLangStrings {
  //
  langStringMap: Map<string, string> = new Map<string, string>();
  defaultLanguage: string = '';
  string: string = '';

  constructor(langStrings?: LangStrings) {
    if (langStrings) {
      const langStringMap = langStrings.langStringMap && new Map(Object.entries(langStrings.langStringMap)) || new Map<string, string>();
      Object.assign(this, { ...langStrings, langStringMap });
    }
  }
}

decorate(LangStrings, {
  langStringMap: observable,
});
