import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import { useCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { getApproveMember } from 'community/service/useMemberList/useMemberList';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import { patronInfo } from '@nara.platform/dock';
import { getCommunityHome, useCommunityHome } from 'community/store/CommunityHomeStore';
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import { findCommunityView } from 'community/api/communityApi';
import { useCallback } from 'react';

interface Params {
  communityId: string
}

interface Props {
  activemenu: string,
  handleActiveMenu: (active:string) => void;
}

const CommunityMemberTabmenu:React.FC<Props> = ({activemenu, handleActiveMenu}) => {
  const [findData, setFindData] = useState<any>();
  const {communityId} = useParams<Params>();
  const approveMember = useCommunityMemberApprove();
  const approveMemberLength = approveMember && approveMember.totalCount
  const manager = patronInfo.getDenizenId();
  
  const findCommunity = useCallback(async (communityId:string) => {
    const find = await findCommunityView(communityId)
    setFindData(find)
  },[])

  useEffect(() => {
    findCommunity(communityId)
    getApproveMember(communityId)
  }, [])
  
  return (
    <div className="contents-tab-menu">
      <Menu className="sku">
        <Menu.Item
          name="Member"
          active={activemenu === "member"}
          onClick={() => handleActiveMenu("member")}
        >
          Members
        </Menu.Item>
        <Menu.Item
          name="Groups"
          active={activemenu === "group"}
          onClick={() => handleActiveMenu("group")}
        >
          Groups
        </Menu.Item>
        {
          findData && findData.managerId === manager ? (
            <Menu.Item
              name="Approval"
              active={activemenu === "approve"}
              onClick={() => handleActiveMenu("approve")}
            >
              가입대기<span className="count">{`+ ${approveMemberLength}`}</span>
            </Menu.Item>
          ) : (
            null
          )
        }
        
      </Menu>
    </div>
  )
}

export default CommunityMemberTabmenu;