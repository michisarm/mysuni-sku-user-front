import React from 'react';
import { Comment } from "semantic-ui-react";
import { GroupQueryModel } from '../model/GroupQueryModel';
import ElementList from '../../model/ElementList';
import Group from '../model/Group';


interface GroupListViewProps {
  searchQuery: () => void;
  groupQueryModel: GroupQueryModel;
  changeGroupQueryProps: (name: string, value: any) => void;
  clearGroupQuery: () => void;
  groupList: ElementList<Group>;
}

const GroupListView:React.FC<GroupListViewProps> = function GroupListView({
  searchQuery,
  groupQueryModel,
  changeGroupQueryProps,
  clearGroupQuery,
  groupList
}) {

  return (
    <div className="mycommunity-card-list">
      {
        member && member.results.map((item:any, index:number) => (
          <div className="member-card" key={index}>
            <Comment>
              <Comment.Avatar src="" />
              <Comment.Content>
                <Comment.Author as="a">
                  {/* 어드민 아이콘 영역 */}
                  <img src="" style={item.approved ? {display:"inline"} : {display:"none"}} /><span>{item.name}</span>
                  <span className="card-follow">{item.companyName}</span>
                </Comment.Author>
                <Comment.Metadata>
                  {
                    // 게시물 갯수 텍스트 영역
                    item.createdTime? (
                      <>
                        <span>게시물</span>
                        <span>{item.createdTime}</span>
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
  )
}

export default GroupListView;