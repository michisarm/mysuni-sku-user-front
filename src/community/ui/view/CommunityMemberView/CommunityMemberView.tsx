import React,{useState,useCallback,useEffect} from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import { getAllMember, onFollow, onUnFollow } from 'community/service/useMemberList/useMemberList';
import { Pagination } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import CommunityProfileModal from 'community/ui/view/CommunityProfileModal';

function ItemBox({memberList, activePage}: {memberList:any,activePage:number}) {
  const [follow, setFollow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleFollow = useCallback(async (communityId:string,memberId:string, followState:boolean) => {

    if(followState === false) {
      onFollow(communityId,memberId, (activePage - 1) * 8)
    } else {
      onUnFollow(communityId,memberId, (activePage - 1) * 8)
    }
  }, [activePage])

  return (
    <>
      <div className="member-card">
        <Comment>
          <Comment.Avatar src={
            memberList.profileImg === null ||
            memberList.profileImg === undefined ||
            memberList.profileImg === ''  ? 
            `${AvartarImage}` : `/files/community/${memberList.profileImg}`
          }
          />
          <Comment.Content>
            <Comment.Author as="a">
              {/* 어드민 아이콘 영역 */}
              <img src={AdminIcon} style={memberList.manager ? {display:"inline"} : {display:"none"}} onClick={() => setOpen(!open)} />
              <span className="lms-nick" onClick={() => setOpen(!open)}>{memberList.nickname || memberList.name}</span>
              <button type="button" title="Follow" onClick={() => handleFollow(memberList.communityId, memberList.memberId, memberList.follow)}>
                <span className="card-follow">{memberList.follow || follow ? "Unfollow" : "Follow"}</span>
              </button>
            </Comment.Author>
            <Comment.Metadata>
              <span>게시물</span>
              <span>{memberList.postCount === null || undefined ? 0 : memberList.postCount}</span>
              <span>댓글</span>
              <span>{memberList.replyCount === null || undefined ? 0 : memberList.replyCount}</span>
            </Comment.Metadata>
            <Comment.Metadata>
              <span className="date">{memberList.createdTime && moment(memberList.createdTime).format('YYYY.MM.DD')}</span>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </div>
      <CommunityProfileModal
        open={open}
        setOpen={setOpen}
        userProfile={memberList.profileImg}
        memberId={memberList.memberId}
        introduce={memberList.introduce}
        nickName={memberList.nickname}
        name={memberList.name}
      />
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
  }, [memberData])
  
  const onPageChange = (data:any) => {
    getAllMember(communityId,(data.activePage-1)*8);
    setActivePage(data.activePage)
  }

  return (
    <>
      <div className="mycommunity-card-list">
        {memberData&& memberData.results && memberData.results.map((item, index) => <ItemBox memberList={item} key={index} activePage={activePage} /> )}
      </div>
      <div className="lms-paging-holder">
        <Pagination
          activePage={activePage}
          totalPages={totalPage}
          firstItem={null}
          lastItem={null}
          onPageChange={(e, data) => onPageChange(data)}
        />
      </div>
    </>
  )
}
