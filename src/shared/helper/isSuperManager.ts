import { patronInfo } from '@nara.platform/dock';
import { find } from 'lodash';

export function isSuperManager() {
  const cinerooms = patronInfo.getCinerooms();
  const mySUNICineroom = 'ne1-m2-c2';

  if (Array.isArray(cinerooms) && cinerooms.length > 0) {
    const findCineRoom = find(cinerooms, { id: mySUNICineroom });
    if (findCineRoom !== undefined) {
      return findCineRoom.roles.includes('SuperManager');
    }
  }
  return false;
}
