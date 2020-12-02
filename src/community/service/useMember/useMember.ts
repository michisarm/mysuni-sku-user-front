import { findMember } from 'community/api/MemberApi';
import { reactConfirm, reactAlert } from '@nara.platform/accent';
import { joinCommunity } from 'community/api/communityApi';
import { requestCommunity } from '../useCommunityHome/requestCommunity';

export function getMember(communityId:string) {
  return findMember(communityId);
}

export async function checkMember(communityId:string): Promise<boolean> {
  const member = await findMember(communityId);
  if(member.memberId == null || member.memberId == ''){
    reactConfirm({
      title: '알림',
      message: '커뮤니티에 가입하시겠습니까??',
      onOk: async () => {
        await joinCommunity(communityId);
        requestCommunity(communityId);
      },
    });
    return false;
  }else if(!member.approved){
    reactAlert({ title: '알림', message: '가입 승인 대기중입니다.' });
    return false;
  }
  return true;
}
