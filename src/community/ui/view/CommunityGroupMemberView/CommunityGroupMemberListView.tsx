import React,{useState,useEffect} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

function ItemBox({groupMemberList} :{groupMemberList:any}) {
  const [follow, setFollow] = useState<boolean>(false)

  return (
    <div className="member-card">
      <Comment>
        <Comment.Avatar src={groupMemberList.profileImg != null ? `/files/community/${groupMemberList.profileImg}` : `${AvartarImage}`} />
        <Comment.Content>
          <Comment.Author as="a">
            {/* 어드민 아이콘 영역 */}
            <img src={AdminIcon} style={groupMemberList.manager ? {display:"inline"} : {display:"none"}} /><span>{groupMemberList.name}</span>
            <button type="button" title="Follow" onClick={() => setFollow(!follow)}><span className="card-follow">{follow ? "Unfollow" : "Follow"}</span></button>
          </Comment.Author>
          <Comment.Metadata>
            <span>게시물</span>
            <span>{groupMemberList.postCount === null ? 0 : groupMemberList.postCount}</span>
            <span>댓글</span>
            <span>{groupMemberList.replyCount === null ? 0 : groupMemberList.replyCount}</span>
          </Comment.Metadata>
          <Comment.Metadata>
            <span className="date">{groupMemberList.createdTime && moment(groupMemberList.createdTime).format('YYYY.MM.DD')}</span>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
    </div>
  )
}


interface Params {
  communityId: string
}

export const CommunityGroupMemberListView:React.FC = function GroupListView() {
  const groupMemberData = useCommunityGroupMember();
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {communityId} = useParams<Params>();

  const totalPages = () => {
    let totalPage = Math.floor(groupMemberData!.totalCount / 8)
    if (groupMemberData!.totalCount) {
      totalPage++
    }
    setTotalPage(totalPage)

    console.log(totalPage)
  }
  
  useEffect(() => {
    if(groupMemberData === undefined) {
      return
    }
    totalPages();
  }, [groupMemberData])

  const onPageChange = (data:any) => {
    setActivePage(data.activePage)
  }


  return (
    <>
      {groupMemberData && groupMemberData.results.map((item, index) => <ItemBox groupMemberList={item} key={index} />)}
      {
        groupMemberData && groupMemberData.totalCount >= 8 ? (
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data)}
            />
          </div>
        ) : (
          null
        )
      } 
    </>
  )
}
