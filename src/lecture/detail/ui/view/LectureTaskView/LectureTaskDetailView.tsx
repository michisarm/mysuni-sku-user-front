import {
  LectureTask,
  LectureTaskItem,
} from 'lecture/detail/viewModel/LectureTask';
import React, { Fragment, useCallback } from 'react';

import moment from 'moment';
import { Button, Icon, Segment } from 'semantic-ui-react';
import LectureTaskTopLineView from './LectureTaskTopLineView';
import BoardDetailContentHeaderView from 'board/ui/view/BoardDetailContentHeaderView';
import { getLectureTaskDetail } from 'lecture/detail/store/LectureTaskStore';
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

  function onClickList() {
    // this.props.history.push(routePaths.supportNotice());
  }

  return (
    <Fragment>
      {/* <Segment className="full">
        <span>상세보기-{taskId}</span>
      </Segment> */}

      <div className="post-view">
        <LectureTaskDetailContentHeaderView
          title={taskDetail.title}
          time={taskDetail.time}
          deletable={true}
          onClickList={onClickList}
        />

        {taskDetail && (
          <div className="content-area">
            <div className="content-inner ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: taskDetail.contents,
                }}
              />
            </div>
            <div className="file">
              <span>첨부파일 : </span>
              <br />
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
            </div>
            <br />
          </div>
        )}
      </div>
    </Fragment>

    // <ContentLayout
    // className="support"
    // breadcrumb={[
    //   { text: 'Support' },
    //   { text: 'Notice' },
    // ]}
    // >
    // <div className="post-view-wrap">
    //   <NoticeDetailContainer />
    // </div>
    // </ContentLayout>
  );
};

export default LectureTaskDetailView;
