import CommunityItem from '../MyCommunityIntro/CommunityItem';

type ApprovedState = 'None' | 'Wait' | 'Approved';

export default interface OpenCommunityItem extends CommunityItem {
  fieldTitle: string;
  approvedState: ApprovedState;
  contents: string;
}
