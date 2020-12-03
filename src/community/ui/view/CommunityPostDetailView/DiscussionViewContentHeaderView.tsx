import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';

interface Props {
  postDetail: any;
  title: string;
  time: number;
  subField?: React.ReactNode;
  deletable?: boolean;
  readCount?: number;
  replyCount?: number;
  likeCount?: number;
  onClickList?: (e: any) => void;
}

@reactAutobind
@observer
class DiscussionViewContentHeaderView extends Component<Props> {
  //
  render() {
    //
    const {
      title,
      time,
      subField,
      deletable,
      readCount,
      replyCount,
      likeCount,
      postDetail,
      onClickList,
    } = this.props;

    const PUBLIC_URL = process.env.PUBLIC_URL;

    return (
      <>
        <div className="course-info-header">
          <div className="survey-header">
            <div className="survey-header-left debate-header-sub">
              <div className="title">{title}</div>
              {/* <div className="survey-read-side mb0">
                <div className="title-area">
                  <div className="ui label onlytext">
                    <span>
                      {time && moment(time).format('YYYY.MM.DD HH:MM')}
                    </span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">조회수</span>
                    <span>{readCount}</span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">댓글수</span>
                    <span>{replyCount}</span>
                  </div>
                </div>
              </div> */}
              {/* <div className="comment-area course-comment">
                <div className="ui comments sub-debate">
                  <div className="comment">
                    <div className="avatar">
                      <img src={`/files/community/${postDetail.profileImg}`}/>
                    </div>
                    <div className="content">
                      <a className="author">{postDetail.nickName}</a>
                      <div className="metadata">
                        <span className="heartText">2020.09.26</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="class-guide-txt fn-parents ql-snow">
          <div className="text ql-editor">
            <p>1234</p>
          </div>
        </div> */}
      </>
    );
  }
}

export default DiscussionViewContentHeaderView;