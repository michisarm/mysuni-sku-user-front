import { CommentList } from '@nara.drama/feedback';
import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useRef } from 'react';
import { Checkbox } from 'semantic-ui-react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';

interface LectureTaskCreateViewProps {
  taskId: string;
  // moreView: (offset: number) => void;
  handleOnClickList: (id: string) => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTestView({
  taskId,
  handleOnClickList,
}) {
  console.log('LectureTaskCreateView', taskId);
  const textContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      {/* <Segment className="full">
        <span>상세보기-{taskId}</span>
      </Segment> */}

      {/* <LectureTaskDetailContentHeaderView
        title={taskDetail.title}
        time={taskDetail.time}
        deletable={true}
        reply={true}
        onClickList={onClickList}
        onClickModify={onClickList}
      /> */}
      {/* <span>{taskDetail.contents.contents}</span> */}

      <>
        <span>작성{taskId}</span>
        <div className="course-info-header">
          <div className="survey-header">
            <div className="survey-header-left">Create Post</div>
          </div>
        </div>
        <div className="form-contants">
          <div className="ui form">
            <div className="field">
              <div className="board-write-checkbox">
                <div className="ui checkbox base">
                  {/* <input type="hidden" name="radioGroup" type="checkbox" /> */}
                  <Checkbox
                    label="공지 등록"
                    className="base"
                    // onChange={onHandleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="main-wrap">
            <span>1234</span>
          </div> */}
        {/* <div className="class-guide-txt fn-parents ql-snow">
            <div className="text ql-editor">
              <div
                className="text description ql-editor"
                // dangerouslySetInnerHTML={{
                //   __html: taskDetail.contents.contents,
                // }}
                ref={textContainerRef}
              />
            </div>
          </div>
          <div className="ov-paragraph download-area task-read-down">
            <div className="detail">
              <div className="file-down-wrap">
                <div className="down">
                  <span>첨부파일 :</span>
                  <a href="#">
                    <span>파일명</span>
                  </a>
                </div>
              </div>
            </div>
          </div> */}
      </>
    </Fragment>
  );
};

export default LectureTaskCreateView;
