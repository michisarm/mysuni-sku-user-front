import { CommentList } from '@nara.drama/feedback';
import React from 'react';
import { Comment } from 'semantic-ui-react';
import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import { useLectureDiscussion } from '../../service/useLectureDiscussion';

function LectureDiscussionContainer() {
  const [lectureDiscussion] = useLectureDiscussion();
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
                    <Comment.Avatar />
                    <Comment.Content>
                      <Comment.Author as="a">{null}</Comment.Author>
                      <Comment.Metadata>
                        <span className="heartText">{null}</span>
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
