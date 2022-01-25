import { Registrant } from './Registrant';

export type UserIdentities = Omit<
  Registrant,
  'backgroundImagePath' | 'selfIntroduction'
>;
