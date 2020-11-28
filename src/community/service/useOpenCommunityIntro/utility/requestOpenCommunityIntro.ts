import {
  findAllFields,
  findAllOpenCommunities,
} from '../../../api/communityApi';
import CommunityView from '../../../model/CommunityView';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import { getEmptyOpenCommunityIntro } from '../../../viewModel/OpenCommunityIntro/OpenCommunityIntro';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';

const ONE_DAY = 24 * 60 * 60 * 1000;

export function requestFieldList() {
  findAllFields().then(fields => {
    const myOpenCommunityIntro =
      getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
    if (fields === undefined) {
      setOpenCommunityIntro({ ...myOpenCommunityIntro, fields: [] });
    } else {
      setOpenCommunityIntro({ ...myOpenCommunityIntro, fields });
    }
  });
}

function communityToItem(community: CommunityView): OpenCommunityItem {
  const {
    communityId,
    thumbnailId,
    name,
    managerName,
    memberCount,
    lastPostTime,
    description,
    fieldName,
    approved,
  } = community;
  return {
    communityId,
    thumbnailId,
    name,
    hasNewPost:
      Date.now() - ONE_DAY < (lastPostTime === null ? 0 : lastPostTime),
    managerName: managerName || '',
    memberCount,
    fieldName: fieldName || '',
    description,
    approvedState: approved === null ? 'None' : approved ? 'Approved' : 'Wait',
  };
}

export function requestOpenCommunityList() {
  const { fieldId, communitiesSort } =
    getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
  findAllOpenCommunities(communitiesSort, 0, fieldId).then(communities => {
    const myOpenCommunityIntro =
      getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
    if (communities === undefined || communities.results === undefined) {
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
        communitiesOffset: 0,
      });
    } else {
      const next: OpenCommunityItem[] = [];
      communities.results.forEach(community => {
        if (!next.some(c => c.communityId === community.communityId)) {
          next.push(communityToItem(community));
        }
      });
      setOpenCommunityIntro({
        ...myOpenCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
        communitiesOffset: next.length,
      });
    }
  });
}

export function requestAppendOpenCommunityList() {
  const { fieldId, communitiesSort, communitiesOffset } =
    getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
  findAllOpenCommunities(communitiesSort, communitiesOffset, fieldId).then(
    communities => {
      const myOpenCommunityIntro =
        getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
      if (communities === undefined || communities.results === undefined) {
        setOpenCommunityIntro({
          ...myOpenCommunityIntro,
          communities: [],
          communitiesTotalCount: 0,
          communitiesOffset: 0,
        });
      } else {
        const next: OpenCommunityItem[] = [...myOpenCommunityIntro.communities];
        communities.results.forEach(community => {
          if (!next.some(c => c.communityId === community.communityId)) {
            next.push(communityToItem(community));
          }
        });
        setOpenCommunityIntro({
          ...myOpenCommunityIntro,
          communities: next,
          communitiesTotalCount: communities.totalCount,
          communitiesOffset: next.length,
        });
      }
    }
  );
}
