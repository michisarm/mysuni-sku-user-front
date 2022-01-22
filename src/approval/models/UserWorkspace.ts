import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { AccessRule } from './AccessRule';

export interface UserWorkspace {
  id: string;
  name: PolyglotString;
  blacklistAccessRuleForPaidLecture?: AccessRule;
}
