import { patronInfo } from "@nara.platform/dock";
import moment from "moment";
import { findAllOtherCommunities } from "../../../api/communityApi";
import { getCommunityProfileCommunity, setCommunityProfileCommunity } from "../../../store/CommunityProfileCommunityStore";
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

export async function requestOtherProfileCommunities(memberId:string) {
  const sort = 'createdTime'
  const offset = 0;
  const communityViews = await findAllOtherCommunities(memberId, sort, offset)
  if (communityViews === undefined) {
    setCommunityProfileCommunity(getEmtpyCommunityProfileMyCommunity())
    return;
  }
  const communities = communityViews.results.map(parseCommunityView);
  setCommunityProfileCommunity({
    communities,
    communitiesTotalCount: communityViews.totalCount,
    communitiesOffset: communities.length,
  })
}

export async function requestAppendOtherProfileCommunities(memberId:string) {
  const sort = 'createdTime'
  const { communitiesOffset } = getCommunityProfileCommunity() || getEmtpyCommunityProfileMyCommunity();
  const communityViews = await findAllOtherCommunities(memberId, sort, communitiesOffset)
  if (communityViews === undefined) {
    setCommunityProfileCommunity(getEmtpyCommunityProfileMyCommunity())
    return;
  }
  const { communities } = getCommunityProfileCommunity() || getEmtpyCommunityProfileMyCommunity();
  const next = [...communities, ...communityViews.results.map(parseCommunityView)];
  setCommunityProfileCommunity({
    communities: next,
    communitiesTotalCount: communityViews.totalCount,
    communitiesOffset: next.length,
  })
}