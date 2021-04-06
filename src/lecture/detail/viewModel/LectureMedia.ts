import { MediaContents } from '../../model/MediaContents';
import { MediaType } from '../../model/MediaType';
import LectureParams from './LectureParams';

export type State = 'None' | 'Progress' | 'Completed';

export interface LectureMedia {
  id: string;
  mediaType: MediaType;
  name: string;
  mediaContents: MediaContents;
}

interface Item {
  activated?: boolean;
  params: LectureParams;
  routerParams: LectureParams;
  path: string;
  state?: State;
}

export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  serviceId?: string;
}
