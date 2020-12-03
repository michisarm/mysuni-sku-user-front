import { patronInfo } from "@nara.platform/dock";
import moment from "moment";
import { findAllMyCommunities } from "../../../api/communityApi";
import { getCommunityProfileMyCommunity, setCommunityProfileMyCommunity } from "../../../store/CommunityProfileMyCommunityStore";
import { getEmtpyCommunityProfileMyCommunity } from "../../../viewModel/CommunityProfile";
import CommunityView from '../../../model/CommunityView'
import ProfileCommunityItem from "../../../viewModel/CommunityProfile/ProfileCommunityItem";

function isManager(managerId: string) {
  const denizenId = patronInfo.getDenizenId();
  return managerId === denizenId;
}

function createdTimeString(createdTime: number) {
  return moment(createdTime).format('YYYY.MM.DD')
}

function parseCommunityView(community: CommunityView): ProfileCommunityItem {
  const { communityId, type, fieldName, name, managerId, managerName, memberCount, createdTime } = community;
  return {
    communityId,
    type,
    fieldName: fieldName || '',
    name,
    managerName: managerName || '',
    memberCount,
    isManager: isManager(managerId),
    createdTime: createdTimeString(createdTime),
  }
}

export async function requestProfileCommunities() {
  const sort = 'createdTime'
  const offset = 0;
  const communityViews = await findAllMyCommunities(sort, offset)
  if (communityViews === undefined) {
    setCommunityProfileMyCommunity(getEmtpyCommunityProfileMyCommunity())
    return;
  }
  const communities = communityViews.results.map(parseCommunityView);
  setCommunityProfileMyCommunity({
    communities,
    communitiesTotalCount: communityViews.totalCount,
    communitiesOffset: communities.length,
  })
}

export async function requestAppendProfileCommunities() {
  const sort = 'createdTime'
  const { communitiesOffset } = getCommunityProfileMyCommunity() || getEmtpyCommunityProfileMyCommunity();
  const communityViews = await findAllMyCommunities(sort, communitiesOffset)
  if (communityViews === undefined) {
    setCommunityProfileMyCommunity(getEmtpyCommunityProfileMyCommunity())
    return;
  }
  const { communities } = getCommunityProfileMyCommunity() || getEmtpyCommunityProfileMyCommunity();
  const next = [...communities, ...communityViews.results.map(parseCommunityView)];
  setCommunityProfileMyCommunity({
    communities: next,
    communitiesTotalCount: communityViews.totalCount,
    communitiesOffset: next.length,
  })
}