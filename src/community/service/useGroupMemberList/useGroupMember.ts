import { findAllGroupMemberByQuery, removeGroupMembers, modifyGroupMemberAdmin, registerGroupMembers } from "community/api/GroupMemberApi";
import { getSearchBox } from "community/store/SearchBoxStore";
import { getEmptySearchBox } from "community/model/SearchBox";
import { setCommunityGroupMember } from "community/store/CommunityGroupMemberStore";

export function getAllGroupMemberByQuery() {
  findAllGroupMemberByQuery(getSearchBox()||getEmptySearchBox()).then(res => setCommunityGroupMember(res.data))
}
 
export function deleteGroupMembers  (
  communityId: string,
  groupId: string,
  memberIdList: (string | undefined)[]
  ) {
    removeGroupMembers(communityId, groupId, memberIdList).then((response) => {
      //  searchQuery();
  });
}

export function updateGroupMemberAdmin (
    communityId: string, 
    groupId: string, 
    groupMemberId: string
    ) {
    modifyGroupMemberAdmin(communityId, groupId, groupMemberId).then((response) => {
        // searchQuery();
    });
}

export function createGroupMembers () {
    registerGroupMembers(getSearchBox()||getEmptySearchBox()).then((response) => {
      // searchQuery();
  });
}
 
// export function deleteGroupMembers  (
//   communityId: string,
//   groupId: string,
//   memberIdList: (string | undefined)[]
//   ) {
//     removeGroupMembers(communityId, groupId, memberIdList).then((response) => {
//       //  searchQuery();
//   });
// }

// modifyGroupMemberAdmin