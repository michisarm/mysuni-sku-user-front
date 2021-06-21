import React, { useState, useEffect, useCallback } from 'react';
import { Comment } from "semantic-ui-react";
import moment from 'moment';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import { useHistory, useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { getGroupMemberData } from 'community/service/useGroupList/useGroupList';
import { onFollowGroupMember, onUnFollowGroupMember } from 'community/service/useGroupList/useGroupList';
import { CommunityGroupMemberList } from 'community/model/CommunityMemberGroup';
import CommunityProfileModal from '../CommunityProfileModal';
import { patronInfo } from '@nara.platform/dock';
import { useFollowModel } from '../../../../layout/UserApp/store/FollowStore';
import { followMember, findAllFollow, unfollowMember } from '../../../../layout/UserApp/api/ProfileInfoAPI';
import { getFollow } from '../../../../layout/UserApp/service/ProfilePopupService/getFollow';
import ProfileImagePath from '../../../../../src/shared/components/Image/ProfileImagePath';
  
function ItemBox({
  groupMemberList, memberData, setMemberData, activePage, groupId, managerName, managerNickName }
  : { groupMemberList: any, memberData: any, setMemberData: any, activePage: number, groupId: string, managerName: string, managerNickName: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const currentUser = patronInfo.getDenizenId();
  const followData = useFollowModel();
  const [followYN, setfollowYN] = useState<boolean>(false);

  useEffect(() => {
    followData?.ids.filter(f => {
      if (f === groupMemberList.memberId) {
        setfollowYN(true);
      }
    })
  }, [followData])

  const handleFollow = useCallback(async (communityId: string, memberId: string, followState: boolean) => {
    if (activePage === undefined || memberData === undefined) {
      return false
    }

    if (followState === false) {
      followMember(memberId).then(() => { getFollow() });
      // onFollowGroupMember(communityId, groupId, memberId, (activePage - 1) * 8).then((result) => {
      //   setMemberData(result);
      // })

    } else {
      unfollowMember(memberId).then(() => { getFollow() });
      // onUnFollowGroupMember(communityId, groupId, memberId, (activePage - 1) * 8).then((result) => {
      //   setMemberData(result);
      // })
    }

  }, [activePage, memberData])

  return (
    <>
      <div className="member-card">
        <Comment>
          <Comment.Avatar src={
            groupMemberList.profileImg === null ||
              groupMemberList.profileImg === undefined ||
              groupMemberList.profileImg === '' ?
            `${AvartarImage}` : 
            // `/files/community/${groupMemberList.profileImg}`
            ProfileImagePath(groupMemberList.profileImg)
            }
          />
          <Comment.Content>
            <Comment.Author as="a">
              {/* 어드민 아이콘 영역 */}
              <img src={AdminIcon} style={groupMemberList.nickname === managerNickName || groupMemberList.name === managerName ? { display: "inline" } : { display: "none" }} />
              <span className="lms-nick" onClick={() => setOpen(!open)}>{groupMemberList.nickname || groupMemberList.name}</span>
              {
                // 멤버보기 목록에서 본인의 프로필인 경우 Follow버튼 출력하지 않음
                currentUser !== groupMemberList.memberId ? (
                  <button type="button" title="Follow" onClick={() => handleFollow(groupMemberList.communityId, groupMemberList.memberId, followYN)}>
                    <span className="card-follow">{followYN ? "Unfollow" : "Follow"}</span>
                  </button>
                ) : (null)
              }
            </Comment.Author>
            <Comment.Metadata>
              <span>게시물</span>
              <span>{groupMemberList.postCount === null || undefined ? 0 : groupMemberList.postCount}</span>
              <span>댓글</span>
              <span>{groupMemberList.replyCount === null || undefined ? 0 : groupMemberList.replyCount}</span>
            </Comment.Metadata>
            <Comment.Metadata>
              <span className="date">{groupMemberList.createdTime && moment(groupMemberList.createdTime).format('YYYY.MM.DD')}</span>
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </div>
      <CommunityProfileModal
        open={open}
        setOpen={setOpen}
        userProfile={groupMemberList.profileImg}
        memberId={groupMemberList.memberId}
        introduce={groupMemberList.introduce}
        nickName={groupMemberList.nickname}
        name={groupMemberList.name}
      />
    </>
  )
}

interface Params {
  communityId: string,
  groupId: string
}

interface Props {
  groupId: string
  managerName: string,
  managerNickName: string
}

export const CommunityGroupMemberListView: React.FC<Props> = function GroupListView({ groupId, managerName, managerNickName }) {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [memberData, setMemberData] = useState<CommunityGroupMemberList>();
  const { communityId } = useParams<Params>();

  async function MemberData() {
    const data = await getGroupMemberData(communityId, groupId, 0);
    setMemberData(data);
  }

  useEffect(() => {
    MemberData();
  }, [])

  const totalPages = () => {
    let totalPage = Math.ceil(memberData!.totalCount / 8)
    if (memberData!.totalCount % 8 < 0) {
      totalPage++
    }
    setTotalPage(totalPage)
  }

  useEffect(() => {
    if (memberData === undefined) {
      return
    }
    totalPages();
  }, [memberData])

  const onPageChange = async (data: any) => {
    const newData = await getGroupMemberData(communityId, groupId, (data.activePage - 1) * 8);
    setMemberData(newData);
    setActivePage(data.activePage)
  }

  return (
    <>
      {memberData && memberData.results.map((item, index) =>
        <ItemBox
          key={index}
          groupMemberList={item}
          memberData={memberData}
          setMemberData={setMemberData}
          activePage={activePage}
          groupId={groupId}
          managerName={managerName}
          managerNickName={managerNickName}
        />
      )}
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
