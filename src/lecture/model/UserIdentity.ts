export interface UserIdentity {
  email: string;
  companyCode: string;
  companyName?: {
    defaultLanguage: string;
    langStringMap: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  departmentCode: string;
  departmentName?: {
    defaultLanguage: string;
    langStringMap: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  id: string;
  name?: {
    defaultLanguage: string;
    langStringMap: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  patronKey: {
    keyString: string;
  };
}
