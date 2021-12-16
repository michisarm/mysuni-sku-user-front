import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Review, CommentList } from '@nara.drama/feedback';
import { observer } from 'mobx-react';
import { findCommunityProfile } from '../../../../community/api/profileApi';
import CommunityProfileModal from '../../../../community/ui/view/CommunityProfileModal';

interface Props {
  reviewFeedbackId: string;
  commentFeedbackId: string;
  name: string;
  email: string;
  companyName: string;
  departmentName: string;
  creator?: string;
  url?: string;
}

interface State {
  profileOpen: boolean;
  profileInfo: profileParams;
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}
@reactAutobind
@observer
class LectureCommentsContainer extends Component<Props, State> {
  state = {
    profileOpen: false,
    profileInfo: {
      id: '',
      profileImg: '',
      introduce: '',
      nickName: '',
      creatorName: '',
    },
  };

  componentDidMount() {
    this.setState({ profileOpen: false });
    window.addEventListener('clickProfile', this.clickProfileEventHandler);
    return () => {
      window.removeEventListener('clickProfile', this.clickProfileEventHandler);
    };
  }

  clickProfileEventHandler() {
    const id = document.body.getAttribute('selectedProfileId');
    findCommunityProfile(id!).then((result) => {
      this.setState({
        profileInfo: {
          id: result!.id,
          profileImg: result!.profileImg,
          introduce: result!.introduce,
          nickName: result!.nickname,
          creatorName: result!.name,
        },
      });
      this.setState({ profileOpen: true });
    });
  }

  selectProfileOpen(open: boolean) {
    this.setState({ profileOpen: open });
  }

  render() {
    //
    const {
      reviewFeedbackId,
      commentFeedbackId,
      name,
      email,
      companyName,
      departmentName,
      creator,
      url,
    } = this.props;

    return (
      <>
        <div className="contents comment">
          {/* <Review feedbackId={reviewFeedbackId} /> */}
          <CommentList
            feedbackId={commentFeedbackId}
            hideCamera
            name={name}
            email={email}
            companyName={companyName}
            departmentName={departmentName}
            creator={creator}
            url={url}
          />
        </div>
        <CommunityProfileModal
          open={this.state.profileOpen}
          setOpen={this.selectProfileOpen}
          userProfile={
            this.state.profileInfo && this.state.profileInfo.profileImg
          }
          memberId={this.state.profileInfo && this.state.profileInfo.id}
          introduce={this.state.profileInfo && this.state.profileInfo.introduce}
          nickName={this.state.profileInfo && this.state.profileInfo.nickName}
          name={this.state.profileInfo && this.state.profileInfo.creatorName}
        />
      </>
    );
  }
}

export default LectureCommentsContainer;
