import { Registrant } from './Registrant';

export type UserIdentities = Omit<
  Registrant,
  | 'backgroundImagePath'
  | 'gdiPhotoImagePath'
  | 'nickname'
  | 'photoImagePath'
  | 'selfIntroduction'
  | 'useGdiPhoto'
>;
