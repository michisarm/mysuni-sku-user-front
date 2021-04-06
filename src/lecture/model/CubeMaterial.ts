import OfficeWeb from '../detail/model/OfficeWeb';
import { Classroom } from './Classroom';
import { CubeCommunity } from './CubeCommunity';
import Media from './Media';

export interface CubeMaterial {}
interface Board {
  id: string;
}

export interface CubeMaterial {
  board: Board | null;
  media: Media | null;
  officeWeb: OfficeWeb | null;
  cubeCommunity: CubeCommunity | null;
  classrooms: Classroom[] | null;
}
