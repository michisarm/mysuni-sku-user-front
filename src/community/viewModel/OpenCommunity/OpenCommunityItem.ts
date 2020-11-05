import CommunityItem from "../MyCommunity/CommunityItem";

type ApprovedState = 'None' | 'Wait' | 'Approved'

export default interface OpenCommunityItem extends CommunityItem {
  fieldId: string;
  fieldTitle: string;
  approvedState: ApprovedState;
  contents: string;
}