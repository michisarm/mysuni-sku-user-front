import { Cube } from '../../model/Cube';

export function hasNoTestAndNoReport(cube: Cube) {
  return (
    !cube.hasTest &&
    (cube.reportName === undefined ||
      cube.reportName === null ||
      cube.reportName === '')
  );
}
