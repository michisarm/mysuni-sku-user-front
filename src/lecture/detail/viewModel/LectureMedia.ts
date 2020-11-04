import MediaContents from '../model/MediaContents';
import { MediaType } from '../model/MediaType';
import LectureParams from './LectureParams';
import LectureRouterParams from './LectureRouterParams';
import { State } from './LectureState';

export interface LectureMedia {
  id: string;
  mediaType: MediaType;
  name: string;
  mediaContents: MediaContents;
}

interface Item {
  activated?: boolean;
  params: LectureParams;
  routerParams: LectureRouterParams;
  path: string;
  state?: State;
}

export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  serviceId?: string;
}
