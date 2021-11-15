import { LangSupport } from '../../../../packages/polyglot/LangSupport';
import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';
import { PatronKey } from '../../accent/models/PatronKey';
import { Channel } from './Channel';
import { Creator } from './Creator';

export interface College {
  id: string;
  entityVersion: number;
  patronKey: PatronKey;
  collegeType: CollegeType;
  name: PolyglotString | null;
  description: PolyglotString | null;
  iconFileBoxId: string;
  panoptoFolderId: string;
  channels: Channel[];
  creator: Creator;
  openState: string;
  time: number;
  langSupports: LangSupport[];
}

export enum CollegeType {
  University = 'University',
  Company = 'Company',
}

export interface SelectTypeModel {
  key: string;
  text: string;
  value: string | number | boolean;
}
