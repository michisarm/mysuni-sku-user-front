import React, {
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
} from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import AvartarImage from '../../../../style/media/img-profile-80-px.png';
import AdminIcon from '../../../../style/media/icon-community-manager.png';
import {
  getAllMember,
  onFollow,
  onUnFollow,
} from 'community/service/useMemberList/useMemberList';
import { useParams } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import CommunityProfileModal from 'community/ui/view/CommunityProfileModal';
import { useFollowModel } from '../../../../layout/UserApp/store/FollowStore';
import { getFollow } from '../../../../layout/UserApp/service/ProfilePopupService/getFollow';
import {
  followMember,
  unfollowMember,
  findAllFollow,
} from '../../../../layout/UserApp/api/ProfileInfoAPI';
import ProfileImagePath from '../../../../../src/shared/components/Image/ProfileImagePath';
import { isExternalInstructor } from '../../../../shared/helper/findUserRole';

function ItemBox({
  memberList,
  activePage,
}: {
  memberList: any;
  activePage: number;
}) {
  const [follow, setFollow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const currentUser = patronInfo.getDenizenId();
  const followData = useFollowModel();
  const [followYN, setfollowYN] = useState<boolean>(false);
  const isExternal = isExternalInstructor();

  useEffect(() => {
    let result = true;

    if (followData !== undefined) {
      followData.forEach((f) => {
        if (f.followingId === memberList.memberId) {
          setfollowYN(true);
          result = false;
        }
      });
    }

    if (result) {
      setfollowYN(false);
    }
  }, [followData, memberList]);

  const handleFollow = useCallback(
    async (communityId: string, memberId: string, followState: boolean) => {
      if (followState === false) {
        followMember(memberId).then(() => {
          getFollow();
        });
        //onFollow(communityId, memberId, (activePage - 1) * 8)
      } else {
        unfollowMember(memberId).then(() => {
          getFollow();
        });
        //onUnFollow(communityId, memberId, (activePage - 1) * 8)
      }
    },
    []
  );
  return (
    <>
      <div className="member-card">
        <Comment>
          <Comment.Avatar
            src={
              memberList.profileImg === null ||
              memberList.profileImg === undefined ||
              memberList.profileImg === ''
                ? `${AvartarImage}`
                : // `/files/community/${memberList.profileImg}`
                  ProfileImagePath(memberList.profileImg)
            }
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(!open)}
          />
          <Comment.Content>
            <Comment.Author as="a">
              {/* 어드민 아이콘 영역 */}
              <img
                src={AdminIcon}
                style={
                  memberList.manager
                    ? { display: 'inline' }
                    : { display: 'none' }
                }
                onClick={() => setOpen(!open)}
              />
              <span className="lms-nick" onClick={() => setOpen(!open)}>
                {memberList.nickname || memberList.name}
              </span>
              {
                // 멤버보기 목록에서 본인의 프로필인 경우 Follow버튼 출력하지 않음
                currentUser !== memberList.memberId && !isExternal ? (
                  <button
                    type="button"
                    title="Follow"
                    onClick={() =>
                      handleFollow(
                        memberList.communityId,
                        memberList.memberId,
                        followYN
                      )
                    }
                  >
                    <span className="card-follow">
                      {followYN ? 'Unfollow' : 'Follow'}
                    </span>
                  </button>
                ) : null
              }
            </Comment.Author>
            <Comment.Metadata>
              <span>게시물</span>
              <span>
                {memberList.postCount === null || undefined
                  ? 0
                  : memberList.postCount}
              </span>
              <span>댓글</span>
              <span>
                {memberList.replyCount === null || undefined
                  ? 0
                  : memberList.replyCount}
              </span>
            </Comment.Metadata>
            <Comment.Metadata>
              <span className="date">
                {memberList.createdTime &&
                  moment(memberList.createdTime).format('YYYY.MM.DD')}
              </span>
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
  communityId: any;
}

export const CommunityMemberView: FunctionComponent = () => {
  const memberData = useCommunityMember();
  const [activePage, setActivePage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { communityId } = useParams<MemberList>();

  const totalPages = () => {
    let totalPage = Math.ceil(memberData!.totalCount / 8);
    if (memberData!.totalCount % 8 < 0) {
      totalPage++;
    }
    setTotalPage(totalPage);
  };

  useEffect(() => {
    //Follow 목록 조회
    getFollow();

    if (memberData === undefined) {
      return;
    }
    totalPages();
  }, [memberData, totalPages]);

  const onPageChange = (data: any) => {
    getAllMember(communityId, (data.activePage - 1) * 8);
    setActivePage(data.activePage);
  };

  return (
    <>
      <div className="mycommunity-card-list">
        {memberData &&
          memberData.results &&
          memberData.results.map((item, index) => (
            <ItemBox memberList={item} key={index} activePage={activePage} />
          ))}
      </div>
    </>
  );
};
