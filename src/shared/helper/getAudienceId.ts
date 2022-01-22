import { patronInfo } from '@nara.platform/dock';

export function getAudienceId() {
  const currentCineroomId = patronInfo.getCineroomId();
  const cineroom = patronInfo.getCinerooms()[0];
  if (currentCineroomId === undefined || cineroom === undefined) {
    return undefined;
  }
  const splited = cineroom.patronId.split('@');
  return splited[0].concat('@', currentCineroomId);
}
