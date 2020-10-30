import { IdName, PatronKey } from '@nara.platform/accent';
import { AreaType } from './AreaType';

export default interface ContentsProvider {
  id: string;
  entityVersion: number;
  patronKey: PatronKey;

  providerId: string;
  name: string;
  contentsProvider: IdName;
  areaType: AreaType;
  isUse: boolean;
  time: number;
}
