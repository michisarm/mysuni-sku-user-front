import { AccessRule } from './AccesRule';

export interface GroupBasedAccessRule {
  useWhitelistPolicy: boolean;
  accessRules: AccessRule[];
}
