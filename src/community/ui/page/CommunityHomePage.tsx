import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  requestNotice,
  requestRecent,
} from '../../service/useCommunityHome/requestCommunityHome';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import commentIcon from '../../../style/media/icon-community-comment.png';
import Post from '../../model/Post';
import moment from 'moment';

const NoticeItemView: React.FC<Post> = function NoticeItemView({
  title,
  html,
  createdTime,
}) {
  const createdDate = moment(createdTime).format('YYYY.MM.DD');
  const isNew = moment().format('YYYY.MM.DD') === createdDate;
  return (
    <div className="community-home-card">
      <div className="ui comments base">
        <div className="home-card-top">
          <h3>
            {title} {isNew && <span className="new-label">NEW</span>}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className="home-card-bottom">
          <span>{createdDate}</span>
          <span>
            <img src={commentIcon} />0
          </span>
        </div>
      </div>
    </div>
  );
};

// const RecentItemView: React.FC<Post> = function RecentItemView({
//   title,
//   html,
//   createdTime,
// }) {
//   const createdDate = moment(createdTime).format('YYYY.MM.DD');
//   const isNew = moment().format('YYYY.MM.DD') === createdDate;
//   return (
//     <div className="new-board-list">
//         <div className="new-board-list-top">
//           <img src={BadgeImportant} className="board-badge" />
//           <img src={HomeFile} className="board-file" />
//           <strong>애플의 앱클립과 스트리밍 서비스</strong>
//           <span className="new-label">NEW</span>
//         </div>
//         <p>
//           SK그룹이 구성원들의 딥체인지 역량을 키워나갈 교육·연구 통합 플랫폼인
//           'SUNI’를 출범시킨다. 국내기업 최고 수준의 교육·연구 전문조직을
//           운영해야 구성원들이 4차 산업혁명 등 급변하는 경영환경에 선제적으로
//           대응할 수 있는 역량을…
//         </p>
//         <div className="survey-read-side mb0">
//           <div className="title-area read-header-left">
//             <div class="text-list">
//               <img src={CommentImg04} />
//               <span>nickname</span>
//             </div>
//             <div class="text-list">
//               <span>2020.09.09</span>
//             </div>
//           </div>
//           <div className="right-area">
//             <button>
//               <img src={CommentImg05} />
//               99
//             </button>
//           </div>
//         </div>
//       </div>
//   );
// };

interface Params {
  communityId: string;
}

function CommunityHomePage() {
  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHome();
  useEffect(() => {
    requestNotice(communityId);
    requestRecent(communityId);
  }, [communityId]);
  if (communityHome === undefined) {
    return null;
  }
  return (
    <>
      <div className="community-home-contants">
        {/* 배너 */}
        <div className="community-banner-type1">
          {communityHome.home !== undefined && (
            <>
              {communityHome.home.thumbnailId !== undefined && (
                <img
                  src={`/files/community/${communityHome.home.thumbnailId}`}
                />
              )}
              <div className="community-banner-inner">
                <div className="community-banner-title">
                  {communityHome.community?.name}
                </div>
                <div className="community-banner-copy">
                  {communityHome.home.introduce}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 공지사항 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>공지사항</p>
            {/* more */}
            <Link
              className="ui icon button right btn-blue btn-more"
              to={`/community/${communityId}/notice`}
            >
              more
              <i aria-hidden="true" className="icon more3" />
            </Link>
          </div>
          {communityHome.notice.map(post => (
            <NoticeItemView key={post.postId} {...post} />
          ))}
          {/* <CommunityCard01 />
      <CommunityCard02 />
      <CommunityCard03 /> */}
        </div>

        {/* 최근 게시글 */}
        <div className="home-card-container">
          <div className="home-card-title">
            <p>최근 게시글</p>
            {/* more */}
            <Link
              className="ui icon button right btn-blue btn-more"
              to={`/community/${communityId}/all`}
            >
              more
              <i aria-hidden="true" className="icon more3" />
            </Link>
          </div>
          {/* <NewBoard /> */}
        </div>
      </div>
    </>
  );
}

export default CommunityHomePage;
