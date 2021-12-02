import { patronInfo } from '@nara.platform/dock';
import moment from 'moment';
import { findAllOtherCommunities } from '../../api/ProfileInfoAPI';
import {
  setProfileInfoCommunityModel,
  getProfileInfoCommunityModel,
} from '../../store/ProfileInfoCommunityStore';
import {
  getEmtpyProfileInfoCommunityModel,
  ProfileInfoCommunityItem,
  CommunityModel,
} from '../../model/CommunityModel';

export async function getProfileInfoCommunities(memberId: string | undefined) {
  const sort = 'createdTime';
  const offset = 0;
  const memberIdValue = memberId === undefined ? '' : memberId;
  const communityView = await findAllOtherCommunities(
    memberIdValue,
    sort,
    offset
  );
  if (communityView === undefined) {
    setProfileInfoCommunityModel(getEmtpyProfileInfoCommunityModel());
    return;
  }
  const communities = communityView.results.map(parseCommunityView);
  setProfileInfoCommunityModel({
    communities,
    communitiesTotalCount: communityView.totalCount,
    communitiesOffset: communities.length,
  });
}

function parseCommunityView(
  community: CommunityModel
): ProfileInfoCommunityItem {
  const {
    communityId,
    type,
    fieldName,
    name,
    managerId,
    managerName,
    managerNickName,
    memberCount,
    signModifyTime,
    signTime,
  } = community;
  return {
    communityId,
    type,
    fieldName: fieldName || '',
    name,
    managerName: managerName || '',
    managerNickName: managerNickName || '',
    memberCount,
    isManager: isManager(managerId),
    signInTime:
      signModifyTime === 0 || signModifyTime === null
        ? createdTimeString(signTime!)
        : createdTimeString(signModifyTime!),
  };
}

function isManager(managerId: string) {
  const denizenId = patronInfo.getDenizenId();
  return managerId === denizenId;
}

function createdTimeString(createdTime: number) {
  return moment(createdTime).format('YYYY.MM.DD');
}
