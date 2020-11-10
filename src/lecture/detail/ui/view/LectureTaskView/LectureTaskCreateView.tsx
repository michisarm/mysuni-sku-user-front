import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import { PostForm } from '@sku/personalcube';
import { getCubeLectureTaskDetail } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { getLectureTaskCreateItem, setLectureTaskCreateItem } from 'lecture/detail/store/LectureTaskCreateStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import LectureTaskCreateEditor from './LectureTaskCreateEditor';
import Editor from './LectureTaskCreateEditor';
import LectureTaskEditEditor from './LectureTaskEditEditor';

interface LectureTaskCreateViewProps {
  boardId: string;
  taskDetail: LectureTaskDetail;
  viewType?: string;
  detailTaskId?: string;
  // moreView: (offset: number) => void;
  handleSubmitClick: (viewType: string, detailTaskId?: string) => void;
  changeProps: (e: any, name: string, viewType: string) => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTeskView({
  boardId,
  taskDetail,
  viewType,
  detailTaskId,
  changeProps,
  handleSubmitClick,
}) {
  
  useEffect(() => {
    if (viewType === 'edit') {
      getCubeLectureTaskDetail(detailTaskId)
    }
  }, [viewType]);

  const getFileBoxIdForReference = useCallback((depotId: string) => {
    const postCreateItem = getLectureTaskCreateItem();
    if (postCreateItem === undefined) {
      return;
    }
    const nextPostCreateItem = { ...postCreateItem, fileBoxId: depotId };
    setLectureTaskCreateItem(nextPostCreateItem);
  }, []);
  
  const titleLength =
  (taskDetail && taskDetail.title && taskDetail.title.length) || 0;

  const handleTitleChange = useCallback((e: any) => {
    //
    const value = e.target.value;

    if (value.length > 100) {
      return;
    }
  
    changeProps(e.target.value, 'title', viewType!)
  }, []);

  return (
    <Fragment>
        {boardId && (
          <>
            <div className="course-info-header">
              <div className="survey-header">
                {viewType === 'create' && (
                  <div className="survey-header-left">
                    Create Post
                  </div>
                )}
                {viewType === 'edit' && (
                  <div className="survey-header-left">
                    Edit Post
                  </div>
                )}
              </div>
            </div>
            <div className="form-contants">
              <Form>
                <Form.Field>
                  <div
                    className={
                      titleLength >= 100
                        ? 'ui right-top-count input error'
                        : 'ui right-top-count input'
                    }
                  >
                    <span className="count">
                      <span className="now">{titleLength}</span>/
                      <span className="max">100</span>
                    </span>
                    <input
                      type="text"
                      placeholder="제목을 입력해 주세요."
                      value={taskDetail.title}
                      onChange={handleTitleChange}
                    />
                    <Icon className="clear link" />
                  </div>
                </Form.Field>

                <Form.Field>
                  <label>본문</label>
                  <div className="ui editor-wrap">
                  {viewType === 'create' && (
                    <LectureTaskCreateEditor contents={taskDetail.contents} />
                  )}
                  {viewType === 'edit' && (
                    <LectureTaskEditEditor contents={taskDetail.contents} />
                  )}
                  </div>
                </Form.Field>

                <Form.Field>
                  <label>파일첨부</label>
                  <div className="report-attach">
                    <div className="lg-attach">
                      <div className="attach-inner">
                        <FileBox
                          id={taskDetail.fileBoxId || ''}
                          vaultKey={{
                            keyString: 'sku-depot',
                            patronType: PatronType.Pavilion,
                          }}
                          patronKey={{
                            keyString: 'sku-denizen',
                            patronType: PatronType.Denizen,
                          }}
                          validations={[
                            {
                              type: ValidationType.Duplication,
                              validator: depotHelper.duplicationValidator,
                            },
                          ]}
                          onChange={getFileBoxIdForReference}
                        />
                        <div className="bottom">
                          <span className="text1">
                            <Icon className="info16" />
                            <span className="blind">information</span>
                            1개 이상의 첨부파일을 등록하실 수 있습니다.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form.Field>
              </Form>
              <div className="survey-preview">
              {viewType === 'create' && (
                <button className="ui button fix bg" onClick={() => handleSubmitClick('create')}>
                  등록
                </button>
              )}
              {viewType === 'edit' && (
                <button className="ui button fix bg" onClick={() => handleSubmitClick('edit', detailTaskId)}>
                  저장
                </button>
              )}
              </div>
            </div>
          </>
        )}
    </Fragment>
  );
};

export default LectureTaskCreateView;
