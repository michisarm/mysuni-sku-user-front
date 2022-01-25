import { SkProfileService } from 'profile/stores';

const userLanguage = SkProfileService.instance.skProfile.language;

export function getNameMaskingString(name: string, isNickName: boolean = true) {
  if (isNickName) {
    return name;
  }

  if (userLanguage === 'en') {
    return name.replace(/(?<=.{3})./gi, '*');
  }

  const secondString = name.substring(1, 2);

  return name.replace(secondString, '*');
}

// export function getKoNameMaskingString(name: string) {
//   return name.replace(/(?<=.{2})./gi, '*');
// }

// export function getEnNameMaskingString(name: string) {
//   return name.replace(/(?<=.{3})./gi, '*');
// }

export function getEmailMaskingString(email: string) {
  return email.replace(new RegExp('.(?=.{0,1}@)', 'gi'), '*');
}
