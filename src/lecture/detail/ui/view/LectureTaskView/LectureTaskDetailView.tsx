import { CommentList } from '@nara.drama/feedback';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { Button, Icon } from 'semantic-ui-react';

interface LectureTaskDetailViewProps {
  taskId: string;
  taskDetail: LectureTaskDetail;
  detailType: string;
  // moreView: (offset: number) => void;
  handleOnClickList: (id: string) => void;
  handleOnClickModify: (id: string, type: string) => void;
  handleOnClickReplies: (id: string) => void;
  handleOnClickDelete: (id: string, type: string) => void;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTeskView({
  taskDetail,
  detailType,
  taskId,
  handleOnClickList,
  handleOnClickModify,
  handleOnClickReplies,
  handleOnClickDelete,
}) {
  console.log('taskId', taskId);
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
      filesMap.set(type, files);
      const newMap = new Map(filesMap.set(type, files));
      setFilesMap(newMap);
    });
  }, []);

  const OnClickModify = useCallback((id: string, type: string) => {
    handleOnClickModify(id, type);
  }, []);

  const OnClickDelete = useCallback((id: string, type: string) => {
    handleOnClickDelete(id, type);
  }, []);
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
            reply={detailType === 'parent' ? true : false}
            onClickList={handleOnClickList}
            onClickModify={id => OnClickModify(id, detailType)}
            onClickReplies={handleOnClickReplies}
            onClickDelete={id => OnClickDelete(id, detailType)}
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
              {taskDetail.fileBoxId &&
                filesMap.get('reference') &&
                filesMap
                  .get('reference')
                  .map((foundedFile: DepotFileViewModel, index: number) => (
                    <div className="down">
                      <span>첨부파일 :</span>

                      <a
                        key={index}
                        onClick={() => depot.downloadDepotFile(foundedFile.id)}
                      >
                        <span>{foundedFile.name}</span>
                      </a>
                    </div>
                  ))}
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
          {/* 여기에 버튼 추가 */}
          <div className="task-read-bottom">
            <Button
              className="ui icon button left post edit"
              onClickList={handleOnClickList}
            >
              <Icon className="edit" />
              Edit
            </Button>
            <Button
              className="ui icon button left post delete"
              // onClick={handelClickCreateTask}
            >
              <Icon className="delete" />
              delete
            </Button>
            <Button
              className="ui icon button left post reply"
              // onClick={handelClickCreateTask}
            >
              <Icon className="reply" />
              reply
            </Button>
            <Button
              className="ui icon button left post list2"
              // onClick={handelClickCreateTask}
            >
              <Icon className="list2" />
              list
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskDetailView;
