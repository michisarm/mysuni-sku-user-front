import { CommentList } from '@nara.drama/feedback';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';
import depot, {
  FileBox,
  ValidationType,
  DepotFileViewModel,
} from '@nara.drama/depot';

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

  const [filesMap, setFilesMap] = useState<Map<string, any>>(
    new Map<string, any>()
  );

  useEffect(() => {
    getFileIds();
  }, [taskDetail]);

  const getFileIds = useCallback(() => {
    const referenceFileBoxId = taskDetail && taskDetail.fileBoxId;

    Promise.resolve().then(() => {
      if (referenceFileBoxId) findFiles('reference', referenceFileBoxId);
    });
  }, [taskDetail]);

  const findFiles = useCallback((type: string, fileBoxId: string) => {
    depot.getDepotFiles(fileBoxId).then(files => {
      console.log('files', files);
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

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
                  <span>첨부파일 :</span>
                  <br />
                  <span>파일명</span>
                  {filesMap.get('reference') &&
                    filesMap
                      .get('reference')
                      .map((foundedFile: DepotFileViewModel, index: number) => (
                        <div className="down">
                          <a
                            key={index}
                            onClick={() =>
                              depot.downloadDepotFile(taskDetail.fileBoxId)
                            }
                          >
                            <span>{foundedFile.name}</span>
                          </a>
                        </div>
                      ))}
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
