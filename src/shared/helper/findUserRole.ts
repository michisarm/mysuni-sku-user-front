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
