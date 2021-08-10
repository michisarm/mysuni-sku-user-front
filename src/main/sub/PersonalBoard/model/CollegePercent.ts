// export interface ListDataRes<T> {
//   items: T[];
// }

// export interface CollegePercent {
//   items: CollegePercentData[]
// }

import { PolyglotString } from '../../../../shared/viewmodel/PolyglotString';

export interface CollegePercentData {
  collegeName: PolyglotString;
  learningTime: number;
}
