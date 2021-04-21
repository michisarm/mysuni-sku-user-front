import OfficeWeb from '../detail/model/OfficeWeb';
import { Classroom } from './Classroom';
import { CubeCommunity } from './CubeCommunity';
import Media from './Media';
import { BoardConfig } from '../../personalcube/create/model/CubeMaterialSdo';
import { DatePeriod } from '../../shared/model/DatePeriod';

export interface CubeMaterial { }
interface Board {
  id: string;
  name: string;
  config: BoardConfig;
  learningPeriod: DatePeriod;
}


export interface CubeMaterial {
  board: Board | null;
  media: Media | null;
  officeWeb: OfficeWeb | null;
  cubeCommunity: CubeCommunity | null;
  classrooms: Classroom[] | null;
}
