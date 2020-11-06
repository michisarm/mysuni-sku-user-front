import React from 'react'
import CommunityMyProfileMyCommunityContainer from '../logic/CommunityMyProfileMyCommunityContainer'
import CommunityMyProfileMenuContainer from '../logic/CommunityMyProfileMenuContainer'

function MyProfileCommunitiesPage() {
  return (
    <>
      <div>
        <CommunityMyProfileMenuContainer/>
        <CommunityMyProfileMyCommunityContainer/>
      </div>
    </>
  )
}

export default MyProfileCommunitiesPage