import { find } from 'lodash';
import {
  getCheckedMemberList,
  MemberList,
  setCheckedMemberList,
} from '../playlistRecommendPopUp.store';

export function onCheckMember(
  memberId: string,
  memberList: MemberList[],
  isChecked: boolean
) {
  const checkedMemberList = getCheckedMemberList();
  const findMember = find(memberList, memberId) || ({} as MemberList);

  if (isChecked) {
    setCheckedMemberList([...checkedMemberList, findMember]);
  } else {
    const filteredMemberList = memberList.filter(
      (member) => member.id !== memberId
    );
    setCheckedMemberList(filteredMemberList);
  }
}

export function onAllCheckMember(memberList: MemberList[], isChecked: boolean) {
  const checkedMemberList = getCheckedMemberList();

  if (isChecked) {
    setCheckedMemberList([...checkedMemberList, ...memberList]);
  } else {
    const memberIds = memberList.map((member) => member.id);

    const filteredMemberList = checkedMemberList.filter(
      (member) => !memberIds.includes(member.id)
    );
    setCheckedMemberList(filteredMemberList);
  }
}
