import { LangStrings as AccentLangStrings } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class LangStrings implements AccentLangStrings {
  //
  langStringMap: Map<string, string> = new Map<string, string>();
  defaultLanguage: string = '';
  string: string = '';

  constructor(langStrings?: LangStrings) {
    if (langStrings) {
      let langStringMap = langStrings.langStringMap && new Map(Object.entries(langStrings.langStringMap)) || new Map<string, string>();
      // todo 다른 부분 영향 있는지 확인 - JuneHee
      if (langStrings.langStringMap instanceof Map) {
        langStringMap = langStrings.langStringMap;
      }
      Object.assign(this, { ...langStrings, langStringMap });
    }
  }
}

decorate(LangStrings, {
  langStringMap: observable,
});
