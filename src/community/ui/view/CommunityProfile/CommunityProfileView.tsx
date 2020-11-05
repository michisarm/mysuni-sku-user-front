import React from 'react'

// import './style.css';
import TitleArea from './TitleArea'
import ContentsArea from './ContentsArea'
import ContentsProfileView from './ContentsProfileView';
import CommunityProfileItem from 'community/viewModel/CommunityProfile';

interface CommunityProfileViewProps {
    profileItem: CommunityProfileItem;
}

const CommunityProfileView: React.FC<CommunityProfileViewProps> = function CommunityProfileView({
    profileItem
}) {
    return (
            <ContentsProfileView profileItem={profileItem}/>
    );
}

export default CommunityProfileView
