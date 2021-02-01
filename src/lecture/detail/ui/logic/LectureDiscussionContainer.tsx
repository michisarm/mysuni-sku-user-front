import { CommentList } from '@nara.drama/feedback';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { findSkProfileByAudienceId } from '../../api/profileApi';
import { useLectureDiscussion } from '../../service/useLectureDiscussion';
import { getLectureDiscussion,setLectureDiscussion } from '../../store/LectureDiscussionStore';
import defaultImage from '../../../../style/media/img-profile-80-px.png';

function LectureDiscussionContainer() {
  const [lectureDiscussion] = useLectureDiscussion();
  useEffect(() => {
    if (lectureDiscussion === undefined) {
      return;
    }
    findSkProfileByAudienceId(lectureDiscussion.creatorAudienceId).then(
      profile => {
        const mLectureDiscussion = getLectureDiscussion();
        if (profile !== undefined && mLectureDiscussion !== undefined) {
          if (mLectureDiscussion.creatorImage != profile.photoImage) {
            setLectureDiscussion({
              ...lectureDiscussion,
              creatorImage: profile.photoImage,
            });
          }
        }
      }
    );
  }, [lectureDiscussion?.creatorAudienceId]);

  const {
    skProfile: {
      member: { company, department, email, name },
    },
  } = SkProfileService.instance;
  return (
    <>
      {lectureDiscussion && (
        <>
          <div className="course-info-header">
            <div className="survey-header survey-debate-header">
              <div className="survey-header-left debate-header-sub">
                {lectureDiscussion.name}
              </div>
              <div className="comment-area course-comment">
                <div className="ui comments sub-debate">
                  <Comment>
                    <Comment.Avatar
                      src={lectureDiscussion.creatorImage || defaultImage}
                    />
                    <Comment.Content>
                      <Comment.Author as="a">
                        {lectureDiscussion.creator}
                      </Comment.Author>
                      <Comment.Metadata>
                        <span className="heartText">
                          {moment(lectureDiscussion.time).format('YYYY.MM.DD')}
                        </span>
                      </Comment.Metadata>
                    </Comment.Content>
                  </Comment>
                </div>
              </div>
            </div>
          </div>
          <CommentList
            feedbackId={lectureDiscussion.id}
            hideCamera
            name={name}
            email={email}
            companyName={company}
            departmentName={department}
          />
        </>
      )}
    </>
  );
}

export default LectureDiscussionContainer;
