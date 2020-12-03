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
  onClickDelete: (id: string) => void;
  onClickModify: (id: string) => void;
}

@reactAutobind
@observer
class PostDetailViewContentHeaderView extends Component<Props> {
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
      onClickDelete,
      onClickModify,
    } = this.props;

    const PUBLIC_URL = process.env.PUBLIC_URL;

    const handelClickModify = () => {
      onClickModify(postDetail.id);
    };

    const handelClickDelete = () => {
      onClickDelete(postDetail.id);
    };

    return (
      <>
        <div className="course-info-header">
          <div className="survey-header">
            <div className="survey-header-left debate-header-sub">
              <div className="title">{title}</div>
              <div className="survey-read-side mb0">
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
                <div className="right-area">
                { postDetail.menuId !== 'NOTICE' && (
                  <div className="ui onlytext">
                    <img src={`${PUBLIC_URL}/images/all/btn-community-like-on-16-px.png`} />&nbsp;
                    <span className="heartText">{likeCount}</span>
                  </div>
                )}
                  <div className="ui onlytext">
                    {onClickModify && (
                      <Button
                        icon
                        className="postset edit2"
                        onClick={handelClickModify}
                      >
                        <Icon name="edit" className="edit2" />
                        Edit
                      </Button>
                    )}
                    {deletable && (
                      <Button
                        icon
                        className="postset delete"
                        onClick={handelClickDelete}
                      >
                        <Icon name="delete" />
                        Delete
                      </Button>
                    )}
                    <Button
                      icon
                      className="left postset commu-list16"
                      onClick={onClickList}
                    >
                      <Icon className="commu-list16" />
                      List
                    </Button>
                  </div>
                </div>
              </div>
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

export default PostDetailViewContentHeaderView;
