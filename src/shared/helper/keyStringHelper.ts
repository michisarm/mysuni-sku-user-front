export function getDenizenIdFromAudienceId(
  AudienceId: string | undefined
): string {
  if (!AudienceId) {
    return '';
  }
  //AudienceId 구조 : a-b@c-d-e
  //DenizenId 구조 : A@B-C

  const splitedValue = AudienceId.split('@');

  const ab = splitedValue[0].split('-'); // [a,b]
  const cde = splitedValue[1].split('-'); // [c,d,e]

  const first = ab[0]; //a
  const second = cde[0].concat('-', cde[1]); //c-d

  const next = first.concat('@', second); //a@c-d

  return next;
}
