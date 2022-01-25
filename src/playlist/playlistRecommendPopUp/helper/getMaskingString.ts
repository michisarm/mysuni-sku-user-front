import { SkProfileService } from 'profile/stores';

const userLanguage = SkProfileService.instance.skProfile.language;

export function getNameMaskingString(name: string, isNickName: boolean = true) {
  if (isNickName) {
    return name;
  }

  if (userLanguage === 'en') {
    const parseName = name.split('').map((string, i) => {
      if (i > 2) {
        return '*';
      }

      return string;
    });

    return parseName;
  }

  const secondString = name.substring(1, 2);

  return name.replace(secondString, '*');
}

export function getEmailMaskingString(email: string) {
  return email.replace(new RegExp('.(?=.{0,1}@)', 'gi'), '*');
}
