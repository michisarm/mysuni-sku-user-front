import CommunityItem from '../MyCommunityIntro/CommunityItem';

type ApprovedState = 'None' | 'Wait' | 'Approved';

export default interface OpenCommunityItem extends CommunityItem {
  fieldName: string;
  description: string;
  approvedState: ApprovedState;
}
