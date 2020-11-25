import { findAllMemberByQuery, findApprovedMember, modifyMembers, removeMembers } from 'community/api/MemberApi';
import { useState, useEffect, useCallback } from 'react';
import ElementList from '../../model/ElementList';
import Member from '../../model/Member';
import MemberStore from '../../store/MemberStore';
import MemberCdo from 'community/model/MemberCdo';
import MemberRdo from '../../model/MemberRdo';

export function useMemberList(): [
  ElementList<Member>,
  MemberRdo,
  (get:any) => void,
  (get:any) => void,
  (
    communityId: string,
    memberIdList: (string | undefined)[],
    confirmType: string
  ) => void,
] {
  
  const Member = MemberStore.instance;
  const MemberResult = Member.memberList;
  
  const [member, setMember] = useState<ElementList<Member>>(MemberResult)
  const [approved, setApproved] = useState<any>();

  const getAllMember = (communityId: string) => {
    findAllMemberByQuery(communityId)
    .then(response => response && setMember(response.data));
  }

  const getApproveMember = (communityId: string) => {
    findApprovedMember(communityId)
    .then(response => response && setApproved(response.data));
  }

  const updateMembers = useCallback(
    (
      communityId: string,
      memberIdList: (string | undefined)[],
      confirmType: string
    ) => {
    confirmType === 'remove'
    ? removeMembers(communityId, memberIdList).then((response) => {
        // searchQuery();
      })
    : modifyMembers(communityId, memberIdList).then((response) => {
        // searchQuery();
      });

    }, []);

  return [member, approved, getAllMember, getApproveMember, updateMembers];
}