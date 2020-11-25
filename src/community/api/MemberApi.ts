import { axiosApi as axios } from '@nara.platform/accent';
import MemberRdo from '../model/MemberRdo';
import Member from '../model/Member';
import MemberCdo from '../model/MemberCdo';


const BASE_URL = "api/community/communities";

export function findCommunities(limit: number, offset: number): Promise<any> {
  return axios.get<Member[]>(`${BASE_URL}`, {
    params: { limit, offset },
  });
}

export function findAllMemberByQuery(
  communityId:string
  ): Promise<any> { 
    
  return (
    axios
    .get<Member[]>(`${BASE_URL}/${communityId}/members`)
  );
}

export function findApprovedMember(
  communityId:string
  ): Promise<any> {
    
  return(
    axios.get<Member[]>(`${BASE_URL}/${communityId}/members?startDate=1574694000000&endDate=1606316399999&companyName=&name=&teamName=&nickName=&email=&offset=0&limit=20&searchFilter=&communityId=${communityId}&approved=false&groupId=`)
  )
}

export function modifyMember(
  memberId: string,
  memberCdoModel: MemberCdo
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/${memberCdoModel.communityId}/members/${memberId}`,
      memberCdoModel
    )
    .then((response) => response && response.data);
}

export function modifyMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
): Promise<string> {
  
  return axios
    .put<string>(`${BASE_URL}/${communityId}/members/${memberIdList.join(',')}`)
    .then((response) => response && response.data);
}

export function removeMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
): Promise<any> {
  return axios.delete(
    `${BASE_URL}/${communityId}/members/${memberIdList.join(',')}`
  );
}
