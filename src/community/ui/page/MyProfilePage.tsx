import React from 'react'
import CommunityMyProfileMenuContainer from '../logic/CommunityMyProfileMenuContainer'
import CommunityMyProfileContentsContainer from '../logic/CommunityMyProfileContentsContainer'

function MyProfilePage() {
  return (
    <>
      <div>
        <CommunityMyProfileMenuContainer/>
        <CommunityMyProfileContentsContainer/>
      </div>
    </>
  )
  
}

export default MyProfilePage