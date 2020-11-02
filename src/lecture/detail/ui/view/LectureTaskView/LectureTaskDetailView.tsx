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
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTestView({
  taskId,
  taskDetail,
  handleOnClickList,
}) {
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

      {taskDetail && (
        <>
          <LectureTaskDetailContentHeaderView
            title={taskDetail.title}
            time={taskDetail.time}
            readCount={taskDetail.readCount}
            deletable={true}
            reply={true}
            onClickList={handleOnClickList}
            onClickModify={handleOnClickList}
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
                  <span>첨부파일 :</span>
                  <a href="#">
                    <span>파일명</span>
                    {/* {(filesMap &&
                filesMap.get('reference') &&
                filesMap
                  .get('reference')
                  .map((foundedFile: DepotFileViewModel, index: number) => (
                    <div>
                      <a href="#" className="link" key={index}>
                        <span
                          className="ellipsis"
                          onClick={() =>
                            depot.downloadDepotFile(foundedFile.id)
                          }
                        >
                          {'    ' + foundedFile.name + '     '}
                        </span>
                        <br />
                      </a>
                      <br />
                    </div>
                  ))) ||
                '-'} */}
                  </a>
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
