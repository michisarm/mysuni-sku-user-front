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
    type,
    communityId,
    thumbnailId,
    name,
    managerName,
    description,
    memberCount,
    fieldName,
    approved,
    lastPostTime,
  } = community;
  return {
    type,
    communityId,
    image: thumbnailId,
    name,
    hasNewPost: false,
    manager: managerName,
    memberCount,
    approvedState: approved === null ? 'None' : approved ? 'Approved' : 'Wait',
    contents: description,
    fieldTitle: fieldName,
    approved,
    lastPostTime,
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
    if (communities === undefined || communities.results === undefined) {
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    } else {
      const next: OpenCommunityItem[] = [];
      communities.results
        .filter(c => c.approved !== true)
        .forEach(community => {
          if (!next.some(c => c.communityId === community.communityId)) {
            next.push(communityToItem(community));
          }
        });
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
      });
    }
  });
}
