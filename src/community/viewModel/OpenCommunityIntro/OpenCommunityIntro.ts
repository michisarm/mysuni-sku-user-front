import FieldItem from './FieldItem';
import OpenCommunityItem from './OpenCommunityItem';

export default interface OpenCommunityIntro {
  fields: FieldItem[];
  communities: OpenCommunityItem[];
  communitiesTotalCount: number;
  fieldId?: string;
}
