import { find } from 'lodash';
import {
  getCheckedMemberList,
  MemberList,
  setCheckedMemberList,
} from '../playlistRecommendPopUp.store';

export function onCheckMember(memberId: string, memberList: MemberList[]) {
  const checkedMemberList = getCheckedMemberList();
  const findMember = find(memberList, memberId) || ({} as MemberList);
  const isChecked = checkedMemberList.some((member) => member.id === memberId);

  if (isChecked) {
    const filteredMemberList = memberList.filter(
      (member) => member.id !== memberId
    );
    setCheckedMemberList(filteredMemberList);
  } else {
    setCheckedMemberList([...checkedMemberList, findMember]);
  }
}
