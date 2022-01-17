import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface UserIdentities {
  denizenId: string;
  displayNicknameFirst: boolean;
  nickname: string;
  name: PolyglotString;
  companyName: PolyglotString;
  departmentName: PolyglotString;
  email: string;
  photoImagePath: string;
}
