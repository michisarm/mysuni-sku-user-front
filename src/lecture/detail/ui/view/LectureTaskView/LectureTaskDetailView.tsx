import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback, useRef } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';

interface LectureTaskDetailViewProps {
  taskId: string;
  taskDetail: any;
  // moreView: (offset: number) => void;
  // handleClickTaskRow: (id: string) => void;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTestView({
  taskId,
  taskDetail,
}) {
  console.log('taskId', taskId);
  console.log('taskDetail', taskDetail);
  const textContainerRef = useRef<HTMLDivElement>(null);

  function onClickList() {
    // this.props.history.push(routePaths.supportNotice());
  }

  return (
    <Fragment>
      {/* <Segment className="full">
        <span>상세보기-{taskId}</span>
      </Segment> */}

      <LectureTaskDetailContentHeaderView
        title={taskDetail.title}
        time={taskDetail.time}
        deletable={true}
        reply={true}
        onClickList={onClickList}
        onClickModify={onClickList}
      />

      {taskDetail && (
        <>
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
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskDetailView;
