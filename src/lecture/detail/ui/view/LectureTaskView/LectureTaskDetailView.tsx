import { CommentList } from '@nara.drama/feedback';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import LectureTaskDetailContentHeaderView from './LectureTaskDetailContentHeaderView';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import { Button, Icon } from 'semantic-ui-react';
import { useLectureTaskViewType } from '../../../service/useLectureTask/useLectureTaskViewType';
import { useHistory } from 'react-router-dom';

interface LectureTaskDetailViewProps {
  taskId: string;
  taskDetail: LectureTaskDetail;
  detailType: string;
  handleOnClickList: (id: string) => void;
  handleOnClickModify: (id: string, type: string) => void;
  handleOnClickReplies: (id: string) => void;
  handleOnClickDelete: (id: string, type: string) => void;
}

const LectureTaskDetailView: React.FC<LectureTaskDetailViewProps> = function LectureTaskDetailView({
  taskDetail,
  detailType,
  taskId,
  handleOnClickList,
  handleOnClickModify,
  handleOnClickReplies,
  handleOnClickDelete,
}) {
  const [viewType] = useLectureTaskViewType();
  const history = useHistory();
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

  const OnClickModify = useCallback(() => {
    handleOnClickModify(taskId, detailType);
  }, []);

  const OnClickDelete = useCallback(() => {
    handleOnClickDelete(taskId, detailType);
  }, []);

  const OnClicList = useCallback(() => {
    handleOnClickList(taskId);
  }, []);

  const onClickReplies = useCallback(() => {
    history.push('#reply');
    handleOnClickReplies(taskId);
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
            onClickList={OnClicList}
            onClickModify={OnClickModify}
            onClickReplies={onClickReplies}
            onClickDelete={OnClickDelete}
          />
          <div className="class-guide-txt fn-parents ql-snow">
            <div
              className="text ql-editor"
              dangerouslySetInnerHTML={{
                __html: taskDetail.contents,
              }}
              ref={textContainerRef}
            />
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
            name={taskDetail.writer.name}
            email={taskDetail.writer.email}
            companyName={taskDetail.writer.companyName}
            departmentName={taskDetail.writer.companyCode}
          />
          <div className="task-read-bottom">
            <Button
              className="ui icon button left post edit"
              onClick={OnClickModify}
            >
              <Icon className="edit" />
              Edit
            </Button>
            <Button
              className="ui icon button left post delete"
              onClick={OnClickDelete}
            >
              <Icon className="delete" />
              delete
            </Button>
            {viewType !== 'reply' && (
              <Button
                className="ui icon button left post reply"
                onClick={onClickReplies}
              >
                <Icon className="reply" />
                reply
              </Button>
            )}
            <Button
              className="ui icon button left post list2"
              onClick={OnClicList}
            >
              <Icon className="list" />
              list
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default LectureTaskDetailView;
