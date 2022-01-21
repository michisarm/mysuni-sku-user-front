import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface Company {
  chartDisplayed: boolean;
  charts?: string;
  code: string;
  id: string;
  name: PolyglotString;
  parentCode?: string;
  sortOrder: string;
}
