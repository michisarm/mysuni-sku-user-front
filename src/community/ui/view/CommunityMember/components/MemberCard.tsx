import React from 'react';
import { Comment } from "semantic-ui-react";
import {MemberList} from './MemberList';
import AvartarImage from '../../../../../style/media/profile-110-06.png';
import AdminIcon from '../../../../../style/media/icon-community-manager.png';
import ElementList from '../../../../model/ElementList';
import Member from 'community/model/Member';
import MemberRdo from '../../../../model/MemberRdo';
import MemberStore from '../../../../store/MemberStore';
import MemberCdo from '../../../../model/MemberCdo';


interface MemberCardProps {
  member: ElementList<Member>
}

const MemberCard:React.FC<MemberCardProps> = ({member}) => {

  return (
    <div className="mycommunity-card-list">
      {
        member && member.results.map((member, index) => (
          <div className="member-card" key={index}>
            <Comment>
              <Comment.Avatar src={AvartarImage} />
              <Comment.Content>
                <Comment.Author as="a">
                  {/* 어드민 아이콘 영역 */}
                  <img src={AdminIcon} style={member.approved ? {display:"inline"} : {display:"none"}} /><span>{member.name}</span>
                  <span className="card-follow">{member.companyName}</span>
                </Comment.Author>
                <Comment.Metadata>
                  {
                    // 게시물 갯수 텍스트 영역
                    member.createdTime? (
                      <>
                        <span>게시물</span>
                        <span>{member.createdTime}</span>
                      </>
                    ) : null
                  }
                  {
                    // 댓글 갯수 텍스트 영역 
                    member.createdTime ? (
                      <>
                        <span>댓글</span>
                        <span>{member.createdTime}</span>
                      </>
                    ) : null
                  }
                </Comment.Metadata>
                <Comment.Metadata>
                  <span className="date">{member.createdTime}</span>
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </div>
        ))
      }
    </div>
  );
}

export default MemberCard;
