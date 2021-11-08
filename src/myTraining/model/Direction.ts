export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export function toggleDirection(prev: Direction) {
  return prev === Direction.DESC ? Direction.ASC : Direction.DESC;
}
