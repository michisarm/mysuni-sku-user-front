import CommunityItem from '../MyCommunityIntro/CommunityItem';

type ApprovedState = 'None' | 'Wait' | 'Approved';

export default interface OpenCommunityItem extends CommunityItem {
  approvedState: ApprovedState;
  contents: string;
}
