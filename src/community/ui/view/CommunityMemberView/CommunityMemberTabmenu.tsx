import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import { useCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { getApproveMember } from 'community/service/useMemberList/useMemberList';
import { useCommunityMember } from 'community/store/CommunityMemberStore';

interface Params {
  communityId: string
}

interface Props {
  // approve:number,
  activemenu: string,
  handleActiveMenu: (active:string) => void;
}

const CommunityMemberTabmenu:React.FC<Props> = ({activemenu, handleActiveMenu}) => {
  const {communityId} = useParams<Params>();
  const approveMember = useCommunityMemberApprove();
  const approveMemberLength = approveMember && approveMember.totalCount

  useEffect(() => {
    getApproveMember(communityId)
  }, [communityId])

  return (
    <div className="contents-tab-menu">
      <Menu className="sku">
        <Menu.Item
          name="Member"
          active={activemenu === "member"}
          onClick={() => handleActiveMenu("member")}
        >
          Member
        </Menu.Item>
        <Menu.Item
          name="Groups"
          active={activemenu === "group"}
          onClick={() => handleActiveMenu("group")}
        >
          Groups
        </Menu.Item>

        <Menu.Item
          name="Approval"
          active={activemenu === "approve"}
          onClick={() => handleActiveMenu("approve")}
        >
          가입대기<span className="count">{`+ ${approveMemberLength}`}</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default CommunityMemberTabmenu;