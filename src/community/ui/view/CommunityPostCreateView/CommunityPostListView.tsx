import { CommunityPostItem, CommunityPostList } from 'community/viewModel/CommunityPostList';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useCommunityHome } from 'community/store/CommunityHomeStore';
import { patronInfo } from '@nara.platform/dock';
import { reactAlert } from '@nara.platform/accent';
import { stringify } from 'querystring';

interface CommunityPostListViewProps {
  menuType: string
  postItems: CommunityPostList
  handleClickRow: (param: object, menuType: string) => void
}

function renderPostRow(post: CommunityPostItem, handleClickRow: any, menuType: string) {

  return (
    <>
      {post.pinned === false && (
        <a
          target="_blank"
          className={post.newBadge ? 'row new' : 'row'}
          onClick={() => handleClickRow(post)}
        >
          <span className="cell title">
            <span className="inner">
              {typeof post.fileBoxId !== null && post.fileBoxId !== "null" && post.fileBoxId !== null && (<img className="board-file" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAABmUlEQVQ4Ea2TPUgCYRjHO+/Ou1MvyxxCDpE66AMiSsGGCILmIsKtRpcIsggcIhqCtmhra6khaJSohhpqEmoL7GsIAjGzwMFJGvq9kYucJdTBw/Nx/9//eXmPa2n54yM3wyuKMmEYRhKtFQ6H78vl8kcz3JfG5XJtSpKUJx+Sb4gjXniaMgDaAHjWNK1HAIFAoJU+J8vy7K8GwGuI8wJWVXWI3C0g5rs+n2/7RwNEaeAXt9vdDxynfmfrpGmaHdRP1NMNDYCXEL0CDhLD1CVm88Fg0ATMUh8Aq44GCJIAb4Axtg9QFwFSlmUZ1JdEBlB3hHVd7xIAn2wcuJe6AJy2bVvD+Jz+BFBxhMWQrSkh+t6WA16NRqMq8CnzM2GE+Qr9jKOJ1+vdAtrhtm2AIqfoI2eIi0gkogMvizmLRhwNcJ5DcJ1IJGSM9qkLxHEoFPIALVCLi407wmLYxoPoDnhdHJ0TdYpMv8i8xAlGG8K1F2yIIb4lrgD3yFniEXispqnPUv3A7/e3VyqVKXEH1Wr1gZ8oQ1+q1/1b/wnSkkyT1H3SZgAAAABJRU5ErkJggg==" />)}
              <span className="ellipsis">
                {post.title}
              </span>
              <span className="rep-num">
                {
                  post.replyCount !== null && (
                    <span>[{post.replyCount}]</span>
                  )
                }
              </span>
            </span>
          </span>
          {post.menuType === 'ANONYMOUS' && (
            <span className="cell nick">익명</span>
          )}
          {post.menuType !== 'ANONYMOUS' && (
            <span className="cell nick">{post.nickName || post.creatorName}</span>
          )}
          <span className="cell date center">
            {post.createdTime && moment(post.createdTime).format('YYYY.MM.DD')}
          </span>
          <span className="cell date center">
            {post.readCount || 0}
          </span>
          <span className="cell date center">
            {post.likeCount || 0}
          </span>
        </a>
      )}
      {post.pinned === true && (
        <a
          target="_blank"
          className={post.newBadge ? 'row important new' : 'row important'}
          onClick={() => handleClickRow(post)}
        >
          <span className="cell title">
            <span className="inner">
              {typeof post.fileBoxId !== null && post.fileBoxId !== "null" && post.fileBoxId !== null && (<img className="board-file" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAABmUlEQVQ4Ea2TPUgCYRjHO+/Ou1MvyxxCDpE66AMiSsGGCILmIsKtRpcIsggcIhqCtmhra6khaJSohhpqEmoL7GsIAjGzwMFJGvq9kYucJdTBw/Nx/9//eXmPa2n54yM3wyuKMmEYRhKtFQ6H78vl8kcz3JfG5XJtSpKUJx+Sb4gjXniaMgDaAHjWNK1HAIFAoJU+J8vy7K8GwGuI8wJWVXWI3C0g5rs+n2/7RwNEaeAXt9vdDxynfmfrpGmaHdRP1NMNDYCXEL0CDhLD1CVm88Fg0ATMUh8Aq44GCJIAb4Axtg9QFwFSlmUZ1JdEBlB3hHVd7xIAn2wcuJe6AJy2bVvD+Jz+BFBxhMWQrSkh+t6WA16NRqMq8CnzM2GE+Qr9jKOJ1+vdAtrhtm2AIqfoI2eIi0gkogMvizmLRhwNcJ5DcJ1IJGSM9qkLxHEoFPIALVCLi407wmLYxoPoDnhdHJ0TdYpMv8i8xAlGG8K1F2yIIb4lrgD3yFniEXispqnPUv3A7/e3VyqVKXEH1Wr1gZ8oQ1+q1/1b/wnSkkyT1H3SZgAAAABJRU5ErkJggg==" />)}
              <span className="ellipsis">
                {post.title}
              </span>
              <span className="rep-num">
                {
                  post.replyCount !== null && (
                    <span>[{post.replyCount}]</span>
                  )
                }
              </span>
            </span>
          </span>
          {post.menuType === 'ANONYMOUS' && (
            <span className="cell nick">익명</span>
          )}
          {post.menuType !== 'ANONYMOUS' && (
            <span className="cell nick">{post.nickName || post.creatorName}</span>
          )}
          <span className="cell date center">
            {post.createdTime && moment(post.createdTime).format('YYYY.MM.DD')}
          </span>
          <span className="cell date center">
            {post.readCount || 0}
          </span>
          <span className="cell date center">
            {post.likeCount || 0}
          </span>
        </a>
      )}
    </>
  );
}

const CommunityPostListView: React.FC<CommunityPostListViewProps> = function CommunityPost({
  postItems,
  menuType,
  handleClickRow
}) {

  const denizenId = patronInfo.getDenizenId();
  const communityHome = useCommunityHome();

  const onHandleClickRow = useCallback(param => {

    if (param.visible) {
      handleClickRow(param, menuType);
    } else {
      if (
        communityHome?.community?.managerId === denizenId ||
        param.creatorId === denizenId
      ) {
        handleClickRow(param, menuType);
      } else {
        reactAlert({ title: '알림', message: '비밀글 입니다' });
      }
    }
  },
    [menuType]
  );

  return (
    <>
      <a className="row header">
        <span className="cell title">
          <span className="inner">
            <span className="ellipsis">제목</span>
          </span>
        </span>
        <span className="cell nick">작성자</span>
        <span className="cell date">작성일</span>
        <span className="cell date">조회</span>
        <span className="cell date center">좋아요</span>
      </a>
      {postItems.items.map((post, index) => {
        return renderPostRow(post, onHandleClickRow, menuType);
      })}
    </>
  );
}

export default CommunityPostListView;

