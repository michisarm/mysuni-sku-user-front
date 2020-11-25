import React,{useState, useEffect} from 'react';
import { Comment, Checkbox } from "semantic-ui-react";
import AvartarImage from '../../../../style/media/profile-110-06.png';
import { MemberList } from '../CommunityMember/components/MemberList';
import AllSelect from '../../../../style/media/icon-addinfo-24-px.png';
import Approve from '../../../../style/media/icon-approval-24-px.png';
import { useMemberList } from '../../../service/useMemberList/useMemberList';

const CommunityMemberApprove:React.FC = () => {
  const [checkUser, setCheckUer] = useState<any>([])
  const [member, approved, getAllMember, getApproveMember] = useMemberList();

  useEffect(() => {

    getAllMember("COMMUNITY-f")
  },[])


  return (
    <>
      <div className="table-board-title">
        <div className="list-number">
          총 <strong>{member && member.results.length}</strong>명
        </div>
        <div className="right-wrap board-down-title-right">
          <button className="ui icon button left post delete">
            <img src={AllSelect} />
            전체선택
          </button>
          <button className="ui icon button left post list2 complete">
            <img src={Approve} />
            가입승인
          </button>
        </div>
      </div>
      <div className="mycommunity-card-list">
      {
        member && member.results.map((MemberList, index) => (
          <div className="member-card approval" key={index}>
            <Comment>
              <Checkbox 
                style={{marginTop:"2rem",marginRight:"1rem",verticalAlign:"top"}}
                name={MemberList.name}
                checked={checkUser.includes(`${MemberList.name}`) === true}
                // onClick={}
              />
              <Comment.Avatar src={AvartarImage} />
              <Comment.Content>
                <Comment.Author as="a"><h3>{MemberList.name}</h3>
                </Comment.Author>
              </Comment.Content>
            </Comment>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default CommunityMemberApprove