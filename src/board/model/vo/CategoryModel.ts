import { SupportType } from './SupportType';
import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export default class CategoryModel {
  //
  id: string = '';
  supportType: SupportType = SupportType.QNA;
  name: PolyglotString = { ko: '', en: '', zh: '' };
  parentId: string | null = null;
  displayOrder: number = 0;
  enabled: boolean = false;
  deleted: boolean = false;

  registrant: string = '';
  registeredTime: number = 0;
  modifier: string = '';
  modifiedTime: number = 0;

  constructor(category?: CategoryModel) {
    if (category) {
      Object.assign(this, { ...category });
    }
  }
}
