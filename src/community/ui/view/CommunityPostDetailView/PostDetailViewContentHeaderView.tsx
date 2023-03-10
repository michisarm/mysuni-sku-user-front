import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Icon, Button, Comment, Popup } from 'semantic-ui-react';
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
  editAuth?: boolean;
  menuType?: string;
  like?: boolean;
  bookmarkState: boolean;
  shareUrl: () => void;
  onClickBookmark: () => void;
  onClickUnbookmark: () => void;
  onClickList?: (e: any) => void;
  onClickDelete: (id: string) => void;
  onClickModify: (id: string) => void;
  onClickLike: () => void;
  onClickWriter: (id: string) => void;
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
      editAuth,
      menuType,
      like,
      bookmarkState,
      shareUrl,
      onClickBookmark,
      onClickUnbookmark,
      onClickList,
      onClickDelete,
      onClickModify,
      onClickLike,
      onClickWriter,
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
          <div className="survey-header pt0">
            <div className="survey-header-left">
              <div className="title" style={{ wordBreak: 'break-word' }}>
                {title}
              </div>
              <div className="survey-read-side mb0">
                <div className="title-area">
                  <div className="ui label onlytext">
                    <span>
                      {time && moment(time).format('YYYY.MM.DD HH:mm')}
                    </span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">?????????</span>
                    <span>{readCount}</span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">?????????</span>
                    <span>{replyCount}</span>
                  </div>
                  {menuType !== 'ANONYMOUS' && (
                    <div className="ui label onlytext">
                      <span className="header-span-first">?????????: </span>
                      {postDetail.nickName && (
                        <span
                          onClick={() => onClickWriter(postDetail.creatorId)}
                          style={{ cursor: 'pointer' }}
                        >
                          {postDetail.nickName}
                        </span>
                      )}
                      {postDetail.nickName === null ||
                        (postDetail.nickName === '' && (
                        <span>
                          {postDetail.creatorName}/
                          {postDetail.creatorCompanyName}
                        </span>
                      ))}
                      {/* {
                        postDetail.nameFlag === 'N' && (

                        )
                      } */}
                    </div>
                  )}
                </div>
                <div className="right-area">
                  {(like && (
                    <div className="ui onlytext" onClick={onClickLike}>
                      <img
                        src={`${PUBLIC_URL}/images/all/btn-community-like-on-16-px.png`}
                      />
                      &nbsp;
                      <span className="heartText">{likeCount}</span>
                    </div>
                  )) || (
                    <div className="ui onlytext" onClick={onClickLike}>
                      <img
                        src={`${PUBLIC_URL}/images/all/btn-community-like-off-16-px.png`}
                      />
                      &nbsp;
                      <span className="heartText">{likeCount}</span>
                    </div>
                  )}
                  <div className="ui onlytext">
                    {onClickModify && editAuth && (
                      <Button
                        icon
                        className="postset edit2"
                        onClick={handelClickModify}
                      >
                        <Icon name="edit" className="edit2" />
                        Edit
                      </Button>
                    )}
                    {deletable && editAuth && (
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
          <Comment.Actions>
            <Popup
              className="balloon-pop myCumu_btn commu_bubble_popup"
              trigger={
                <div className="right top sub-menu">
                  <Button icon className="img-icon ui user">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAAAlUlEQVRYCWNgGAWjITAaAiMsBBgp9W9capXnP4a/s0DmMDEwpy2a3badEjOZKNEM0gtyzP//DDIgDHMYJWZS7CBKLMeml2IHgaKJkZHhCQiD2NgsGRUbDYERHQKjBSOh6Ke4HCJkAanyFDtotGAkNchH1Y+4EBgtGAlFOcXlECELSJWn2EGjBSOpQT6qfjQERkMALQQAIac5FltQmtUAAAAASUVORK5CYII=" />
                    <span className="blind">?????????</span>
                  </Button>
                </div>
              }
              position="bottom right"
              on="click"
            >
              <Popup.Content className="community-ballon-content">
                <ul>
                  <li className="community-profile">
                    <button onClick={shareUrl}>
                      <i className="balloon icon popupUrl" />
                      <span>URL ??????</span>
                    </button>
                  </li>
                  <li>
                    {bookmarkState ? (
                      <button onClick={onClickUnbookmark}>
                        <i className="balloon icon popupBookRemove" />
                        <span>????????? ??????</span>
                      </button>
                    ) : (
                      <button onClick={onClickBookmark}>
                        <i className="balloon icon popupBook" />
                        <span>????????? ??????</span>
                      </button>
                    )}
                  </li>
                </ul>
              </Popup.Content>
            </Popup>
          </Comment.Actions>
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
