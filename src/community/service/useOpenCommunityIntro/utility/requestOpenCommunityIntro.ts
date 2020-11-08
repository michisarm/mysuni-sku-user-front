import {
  findAllFields,
  findAllOpenCommunities,
} from '../../../api/communityApi';
import Community from '../../../model/Community';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';

export function requestFieldList() {
  findAllFields().then(fields => {
    const myOpenCommunityIntro = getOpenCommunityIntro() || {
      communities: [],
      fields: [],
      communitiesTotalCount: 0,
    };
    if (fields === undefined) {
      setOpenCommunityIntro({ ...myOpenCommunityIntro, fields: [] });
    } else {
      setOpenCommunityIntro({ ...myOpenCommunityIntro, fields });
    }
  });
}

function communityToItem(community: Community): OpenCommunityItem {
  const {
    communityId,
    thumbnailId,
    name,
    managerName,
    description,
    memberCount,
  } = community;
  return {
    communityId,
    image: thumbnailId,
    name,
    hasNewPost: false,
    manager: managerName,
    memberCount,
    approvedState: 'None',
    contents: description,
    fieldTitle: '',
  };
}

export function requestOpenCommunityList() {
  const fieldId = getOpenCommunityIntro()?.fieldId;
  findAllOpenCommunities(fieldId).then(communities => {
    const myOpenCommunityIntro = getOpenCommunityIntro() || {
      communities: [],
      fields: [],
      communitiesTotalCount: 0,
    };
    if (communities === undefined) {
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    } else {
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: communities.results.map(communityToItem),
        communitiesTotalCount: communities.totalCount,
      });
    }
  });
}
