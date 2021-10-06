import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export default class OperatorModel {
  denizenId: string = '';
  operatorGroupName: PolyglotString = { ko: '', en: '', zh: '' };
  operatorName: PolyglotString = { ko: '', en: '', zh: '' };
  company: PolyglotString = { ko: '', en: '', zh: '' };
  department: PolyglotString = { ko: '', en: '', zh: '' };
  email: string = '';

  constructor(operatorModel?: OperatorModel) {
    if (operatorModel) {
      Object.assign(this, { ...operatorModel });
    }
  }
}
