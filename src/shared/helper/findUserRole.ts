import { patronInfo } from "@nara.platform/dock";

export function isExternalInstructor() {
  const externalInstructor = localStorage.getItem('nara.externalInstructor');

  if (externalInstructor && externalInstructor === 'true') {
    return true;
  }

  return false;
}

export function isInternalInstructor() {
  const externalInstructor = localStorage.getItem('nara.externalInstructor');
  const instructorId = localStorage.getItem('nara.instructorId');

  if (instructorId && externalInstructor && externalInstructor === 'false') {
    return true;
  }

  return false;
}

export function isExternalUser() {
  const cinerooms = patronInfo.getCinerooms();

  if(cinerooms === null || 
    cinerooms === undefined || 
    cinerooms.length === 0) {
    return false;
  }

  let isExternalUser = false;
  for(let i = 0; i < cinerooms.length; i++) {
    if(cinerooms[i].patronId.includes('@ne1-m4-c')) {
      isExternalUser = true;
      break;
    }
  }

  return isExternalUser;
}