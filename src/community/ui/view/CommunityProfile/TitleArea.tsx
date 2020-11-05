import React, {Component, createRef} from 'react'
import ProfileSample from '../../../../../images/all/profile-110-px-sample-4.jpg'
import BgProfileTitle from '../../../../../images/all/bg-profile-title@3x.jpg'
import CommunityProfileItem from 'community/viewModel/CommunityProfile'

interface TitleAreaProps {
    profileItem: CommunityProfileItem;
}

const TitleArea: React.FC<TitleAreaProps> = function TitleArea({
  profileItem
}) {

    return (
        //contextRef = createRef()
        // state = {activeItem: 'Comment'}

        //handleItemClick = (e, {name}) => this.setState({activeItem: name})

        <div className="profile_box">
            <div className="profile_pic">
                <div className="pic_area user">
                    <p><img src="data:image/jpeg;base64,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" alt="프로필 사진"/></p>
                </div>
                <div className="pic_area background">
                    <p><img src="http://www.mysuni.fun/PC/REACT/static/media/bg-profile-title@3x.288647db.jpg" alt="배경이미지"/></p>
                </div>
            </div>

            <div className="profile_info">
                <p className="name">{profileItem.nickname}</p>
                <p>{profileItem.introduce}</p>
                <ul>
                    <li>
                        <span>Followers</span>
                        <em>86</em>
                    </li>
                    <li>
                        <span>Following</span>
                        <em>296</em>
                    </li>
                    <li>
                        <button type="button" className="btn_profile_edit">프로필수정</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default TitleArea
