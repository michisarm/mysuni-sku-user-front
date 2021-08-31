import { SkProfileService } from 'profile/stores';

export function findForeignerUser() {
  const userGroupSequences: number[] = Array.from(
    SkProfileService.instance.skProfile.userGroupSequences.sequences
  );

  const isForeigner = userGroupSequences.some(
    (number) => number === 8 || number === 10
  );

  return isForeigner;
}
