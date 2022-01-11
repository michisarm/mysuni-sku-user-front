import React, { Component } from 'react';
import { reactAutobind, reactConfirm } from '@nara.platform/accent';
import { Comment } from '@sku/skuniv-ui-comment';
import { observer } from 'mobx-react';
import { findCommunityProfile } from '../../../../community/api/profileApi';
import CommunityProfileModal from '../../../../community/ui/view/CommunityProfileModal';
import {
  getLectureComment,
  setLectureComment,
} from '../../../detail/store/LectureOverviewStore';
import { reactAlert } from '@nara.platform/accent';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  commentFeedbackId: string;
  name: string;
  email: string;
  companyName: string;
  departmentName: string;
  hasPinRole: boolean;
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
  }

  clickProfileEventHandler(denizenId: string) {
    findCommunityProfile(denizenId).then((result) => {
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

  onNoContentAlert() {
    reactAlert({
      title: getPolyglotText('알림', 'feedback-comment-notice-title'),
      message: getPolyglotText(
        '댓글 내용을 입력하세요.',
        'feedback-comment-notice-nonetext-message'
      ),
    });
  }

  onRemoveCommentConfirm() {
    return new Promise<boolean>((resolve) => {
      reactConfirm({
        title: getPolyglotText('삭제', 'feedback-comment-delete-title'),
        message: getPolyglotText(
          '댓글을 삭제 하시겠습니까?',
          'feedback-comment-delete-message'
        ),
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  render() {
    //
    const {
      commentFeedbackId,
      name,
      email,
      companyName,
      departmentName,
      hasPinRole,
    } = this.props;

    return (
      <>
        <div className="contents comment">
          <Comment
            feedbackId={commentFeedbackId}
            name={name}
            email={email}
            companyName={companyName}
            departmentName={departmentName}
            hasPinRole={hasPinRole}
            onOpenProfileModal={this.clickProfileEventHandler}
            onCommentCountChange={(commentsCount) => {
              const lectureComment = getLectureComment();
              if (lectureComment !== undefined) {
                setLectureComment({ ...lectureComment, commentsCount });
              }
            }}
            onNoContentAlert={this.onNoContentAlert}
            onRemoveCommentConfirm={this.onRemoveCommentConfirm}
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
