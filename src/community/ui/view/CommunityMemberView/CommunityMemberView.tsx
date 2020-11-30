import React,{useState,useCallback,useEffect} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityMember, setCommunityMember, getCommunityMember } from 'community/store/CommunityMemberStore';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { getAllMember, onFollow } from 'community/service/useMemberList/useMemberList';
import { memberFollowDel } from 'community/api/MemberApi';
import { Pagination } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

function ItemBox({memberList}: {memberList:any}, index:number) {
  const [follow, setFollow] = useState<boolean>(false);
  const [followList, setFollowList] = useState<boolean[]>([]);


  // setFollowList(followList.concat(memberList.follow));

  const handleFollow = useCallback((memberId:string, followState:boolean) => {
    

    // setFollow(!follow)
    // setFollowList(followList.concat(memberList.follow));

    if(followState === false) {
      onFollow(memberId)
    } else {
      memberFollowDel(memberId)
    }
  }, [follow])

  return (
    <>
      <div className="member-card">
        <Comment>
          <Comment.Avatar src={memberList.profileImg != null ? `/files/community/${memberList.profileImg}` : `${AvartarImage}`} />
          <Comment.Content>
            <Comment.Author as="a">
              {/* 어드민 아이콘 영역 */}
              <img src={AdminIcon} style={memberList.manager ? {display:"inline"} : {display:"none"}} /><span>{memberList.name}</span>
              <button type="button" title="Follow" onClick={() => handleFollow(memberList.memberId, memberList.follow)}><span className="card-follow">{memberList.follow || follow ? "Unfollow" : "Follow"}</span></button>
            </Comment.Author>
            <Comment.Metadata>
              <span>게시물</span>
              <span>{memberList.postCount === null ? 0 : memberList.postCount}</span>
              <span>댓글</span>
              <span>{memberList.replyCount === null ? 0 : memberList.replyCount}</span>
            </Comment.Metadata>
            <Comment.Metadata>
              <span className="date">{memberList.createdTime && moment(memberList.createdTime).format('YYYY.MM.DD')}</span>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </div>
    </>
  );
}

interface MemberList {
  communityId: any
}

export const CommunityMemberView = () => {
  const memberData = useCommunityMember();
  const [activePage, setActivePage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const {communityId} = useParams<MemberList>();

  const totalPages = () => {
    let totalPage = Math.ceil(memberData!.totalCount / 8)
    if (memberData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }
  
  useEffect(() => {
    if(memberData === undefined) {
      return
    }
    totalPages();
  }, [memberData, activePage])
  
  const onPageChange = (data:any) => {

    getAllMember(communityId,(data.activePage-1)*8);

    setActivePage(data.activePage)
    // setCommunityMember(communityId, activePage)
  }

  return (
    <>
      <div className="mycommunity-card-list">
        {memberData&& memberData.results && memberData.results.map((item, index) => <ItemBox memberList={item} key={index} /> )}
      </div>
      
      {
        memberData && memberData.totalCount >= 8 ? (
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
