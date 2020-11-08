import React from 'react'
import CommunityPostListContainer from '../logic/CommunityPostListContainer'

function PostsPage() {
  return (
    <div className="course-detail-center community-containter">
      <div className="community-home-contants">
        <CommunityPostListContainer />
      </div>
    </div>
    )
}

export default PostsPage