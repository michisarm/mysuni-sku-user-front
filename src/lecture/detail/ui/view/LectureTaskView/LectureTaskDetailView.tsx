import { CommentList } from '@nara.drama/feedback';
import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useRef } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';

interface LectureTaskDetailViewProps {
  taskId: string;
  taskDetail: LectureTaskDetail;
  // moreView: (offset: number) => void;
  handleOnClickList: (id: string) => void;
  handleOnClickModify: (id: string) => void;
  handleOnClickReplies: (id: string) => void;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTestView({
  taskDetail,
  handleOnClickList,
  handleOnClickModify,
  handleOnClickReplies,
}) {
  const textContainerRef = useRef<HTMLDivElement>(null);

  console.log('taskDetail', taskDetail);
  return (
    <Fragment>
      {taskDetail && (
        <>
          <LectureTaskDetailContentHeaderView
            taskDetail={taskDetail}
            title={taskDetail.title}
            name={taskDetail.name}
            time={taskDetail.time}
            readCount={taskDetail.readCount}
            deletable={true}
            reply={true}
            onClickList={handleOnClickList}
            onClickModify={handleOnClickModify}
            onClickReplies={handleOnClickReplies}
          />

          <div className="class-guide-txt fn-parents ql-snow">
            <div className="text ql-editor">
              <div
                className="text description ql-editor"
                dangerouslySetInnerHTML={{
                  __html: taskDetail.contents,
                }}
                ref={textContainerRef}
              />
            </div>
          </div>
          <div className="ov-paragraph download-area task-read-down">
            <div className="detail">
              <div className="file-down-wrap">
                <div className="down">
                  <div className="title">첨부파일</div>
                  <div className="detail">
                    {/* <div className="file-down-wrap">
                      {lectureFile.files.map(file => (
                        <div className="down">
                          <a onClick={() => fileDownload(file.id)}>
                            <span>{file.name}</span>
                          </a>
                        </div>
                      ))}
                      <div className="all-down">
                        <a onClick={allFilesDownload}>
                          <Icon className="icon-down-type4" />
                          <span>전체 다운로드</span>
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentList
            feedbackId={taskDetail.commentFeedbackId}
            hideCamera
            name={taskDetail.writer.name}
            email={taskDetail.writer.email}
            companyName={taskDetail.writer.companyName}
            departmentName={taskDetail.writer.companyCode}
          />
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskDetailView;
