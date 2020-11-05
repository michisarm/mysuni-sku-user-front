import { CommunityPostItem, CommunityPostList } from 'community/viewModel/CommunityPostList';
import moment from 'moment';
import React, { useCallback } from 'react';
import { Icon } from 'semantic-ui-react';

interface CommunityPostListViewProps{
  postItems: CommunityPostList
  handleClickRow: (param: object) => void
}

function renderPostRow(post: CommunityPostItem, handleClickRow: any) {
  // if (task.childItems) {
  //   childElement = task.childItems.map((child, index) => {
  //     return (
  //       <div className="depth2">
  //         <a
  //           target="_blank"
  //           key={index}
  //           onClick={() => handleClickTaskRow({ id: child.id, type: 'child' })}
  //         >
  //           <span className="title">
  //             <Icon className="reply16-b"/>
  //             {child.title}[{child.count}]
  //           </span>
  //           <span className="writer">{child.writer}</span>
  //           <span className="view">{child.readCount}</span>
  //           <span className="date">
  //             {task.time && moment(task.time).format('YYYY.MM.DD')}
  //           </span>
  //         </a>
  //       </div>
  //     );
  //   });
  // }

  return (
    <>
      { post.delete === false && (
        // <div className="row header">
        //   <span className="row header">
        //     <span className="cell title">
        //       <span className="inner">
        //         <span className="ellipsis">제목</span>
        //       </span>
        //     </span>
        //     <span className="cell nick">등록자</span>
        //     <span className="cell date">등록일</span>
        //   </span>
        // </div>
          <a
            target="_blank"
            onClick={() => handleClickRow(post.id)}
          >
            <span className="title">
              {post.title}[{post.count}]
            </span>
            <span className="writer">{post.writer}</span>
            <span className="view">{post.readCount}</span>
            <span className="date">
              {post.time && moment(post.time).format('YYYY.MM.DD')}
            </span>
          </a>
      )}
      { post.delete === true && (
        <div className="depth1">
              <span className="del">
                <Icon className="listdel24" />
                <span className="blind">삭제됨</span>
                <span>
                  삭제된 글입니다.
                </span>
              </span>
        </div>
      )}
    </>
  );
}

const CommunityPostListView: React.FC<CommunityPostListViewProps> = function CommunityPost({
  postItems,
  handleClickRow
}) {
  console.log('postItems', postItems)
  const onHandleClickRow = useCallback(
    param => {
      handleClickRow(param);
    },
    []
  );
  
  return (
    <>
      <a className="row header">
        <span className="cell title">
          <span className="inner">
            <span className="ellipsis">제목</span>
          </span>
        </span>
        <span className="cell nick">등록자</span>
        <span className="cell date">등록일</span>
      </a>
      {postItems.items.map((post, index) => {
        console.log('post', post)
        return renderPostRow(post, onHandleClickRow);
      })}
    </>
  );
}

export default CommunityPostListView;
