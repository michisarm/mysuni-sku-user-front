import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { Comment } from '@sku/skuniv-ui-comment';
import {
  NotieSimpleCdo,
  NotieSpaceType,
} from '@sku/skuniv-ui-comment/lib/api.models';
import CommunityProfileModal from 'community/ui/view/CommunityProfileModal';
import { findCommunityProfile } from 'layout/UserApp/api/ProfileAPI';
import React, { useCallback, useState } from 'react';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import SkProfileService from '../../../../../../profile/present/logic/SkProfileService';
import {
  getPlaylistComment,
  setPlaylistComment,
  useMyPagePlaylistDetail,
} from '../MyPagePlaylistDetail.services';

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

function MyPagePlaylistDetailCommentView() {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<profileParams>();

  const clickProfileEventHandler = useCallback(async (denizenId: string) => {
    findCommunityProfile(denizenId).then((result) => {
      setProfileInfo({
        id: result!.id,
        profileImg: result!.photoImagePath,
        introduce: result!.selfIntroduction,
        nickName: result!.nickname,
        creatorName: parsePolyglotString(result!.name),
      });
      setProfileOpen(true);
    });
  }, []);

  const onRemoveCommentConfirm = () => {
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
  };

  const onNoContentAlert = () => {
    reactAlert({
      title: getPolyglotText('알림', 'feedback-comment-notice-title'),
      message: getPolyglotText(
        '댓글 내용을 입력하세요.',
        'feedback-comment-notice-nonetext-message'
      ),
    });
  };

  const {
    skProfile: { companyName, departmentName, name, email, language },
  } = SkProfileService.instance;

  const playlistDetail = useMyPagePlaylistDetail();

  if (playlistDetail === undefined) {
    return null;
  }

  // 댓글, 좋아요, 핀고정 알림 발송
  const getNotieCdo = (): NotieSimpleCdo | undefined => {
    //

    const result = {
      backLink: window.location.pathname,
      title: NotieSpaceType.LEARNING,
    };

    return result;
  };

  return (
    <>
      <div className="contents comment">
        <Comment
          feedbackId={playlistDetail.commentFeedbackId}
          name={JSON.stringify(name)}
          email={email}
          companyName={parsePolyglotString(companyName)}
          departmentName={parsePolyglotString(departmentName)}
          hasPinRole={playlistDetail.commentHasPinRole}
          hasNoContentPanel={true}
          onOpenProfileModal={clickProfileEventHandler}
          onCommentCountChange={(commentsCount) => {
            const playlistComment = getPlaylistComment();
            if (playlistComment !== undefined) {
              setPlaylistComment({ ...playlistComment, commentsCount });
            }
          }}
          language={language}
          onRemoveCommentConfirm={onRemoveCommentConfirm}
          onNoContentAlert={onNoContentAlert}
          notieSimpleCdo={getNotieCdo()}
        />
      </div>
      <CommunityProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        userProfile={profileInfo && profileInfo.profileImg}
        memberId={profileInfo && profileInfo.id}
        introduce={profileInfo && profileInfo.introduce}
        nickName={profileInfo && profileInfo.nickName}
        name={profileInfo && profileInfo.creatorName}
      />
    </>
  );
}

export default MyPagePlaylistDetailCommentView;
