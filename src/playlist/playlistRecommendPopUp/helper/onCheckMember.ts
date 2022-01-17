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
  const findMember = find(memberList, { id: memberId }) || ({} as MemberList);

  if (isChecked) {
    setCheckedMemberList([...checkedMemberList, findMember]);
  } else {
    const filteredMemberList = checkedMemberList.filter(
      (member) => member.id !== memberId
    );
    setCheckedMemberList(filteredMemberList);
  }
}

export function onAllCheckMember(memberList: MemberList[], isChecked: boolean) {
  const checkedMemberList = getCheckedMemberList();

  if (isChecked) {
    const chekcedMemberIds = checkedMemberList.map((member) => member.id);
    const filteredMemberList = memberList.filter(
      (member) => !chekcedMemberIds.includes(member.id)
    );

    setCheckedMemberList([...checkedMemberList, ...filteredMemberList]);
  } else {
    const memberIds = memberList.map((member) => member.id);

    const filteredMemberList = checkedMemberList.filter(
      (member) => !memberIds.includes(member.id)
    );
    setCheckedMemberList(filteredMemberList);
  }
}
