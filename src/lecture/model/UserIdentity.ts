export interface UserIdentity {
  email: string;
  companyCode: string;
  companyNames?: {
    defaultLanguage: string;
    langStringMap: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  departmentCode: string;
  departmentNames?: {
    defaultLanguage: string;
    langStringMap: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  id: string;
  names?: {
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
