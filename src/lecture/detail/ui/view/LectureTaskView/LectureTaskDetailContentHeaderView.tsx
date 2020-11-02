import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';

interface Props {
  title: string;
  time: number;
  onClickList: (e: any) => void;
  subField?: React.ReactNode;
  deletable?: boolean;
  reply?: boolean;
  onClickDelete?: (e: any) => void;
  onClickModify?: (e: any) => void;
}

@reactAutobind
@observer
class LectureTaskDetailContentHeaderView extends Component<Props> {
  //
  render() {
    //
    const {
      title,
      time,
      subField,
      deletable,
      reply,
      onClickList,
      onClickDelete,
      onClickModify,
    } = this.props;

    return (
      // <div className="title-area">
      // <div className="title-inner">
      <>
        <div className="course-info-header">
          <div className="survey-header">
            <div className="survey-header-left debate-header-sub">
              <div className="title">{title}</div>
              <div className="survey-read-side mb0">
                <div className="title-area">
                  <div className="ui label onlytext">프로필 정보{subField}</div>
                  <div className="ui label onlytext">
                    <span>
                      {time && moment(time).format('YYYY.MM.DD HH:MM')}
                    </span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">조회수</span>
                    <span>
                      {time && moment(time).format('YYYY.MM.DD HH:MM')}
                    </span>
                  </div>
                </div>
                <div className="right-area">
                  <div className="ui onlytext">
                    {onClickModify && (
                      <Button
                        icon
                        className="left postset edit"
                        onClick={onClickModify}
                      >
                        <Icon name="edit" />
                        Edit
                      </Button>
                    )}
                    {deletable && (
                      <Button
                        icon
                        className="left postset delete"
                        onClick={onClickDelete}
                      >
                        <Icon name="delete" />
                        Delete
                      </Button>
                    )}
                    {reply && (
                      <Button
                        icon
                        className="left postset delete"
                        onClick={onClickDelete}
                      >
                        <Icon name="reply" />
                        Reply
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

export default LectureTaskDetailContentHeaderView;
