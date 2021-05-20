import { FileBox, PatronType, ValidationType } from '@nara.drama/depot';
import { useLectureTaskCreate } from 'lecture/detail/service/useLectureTask/useLectureTaskCreate';
import { getCubeLectureTaskDetail } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import {
  getLectureTaskCreateItem,
  setLectureTaskCreateItem,
} from 'lecture/detail/store/LectureTaskCreateStore';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Checkbox, Form, Icon } from 'semantic-ui-react';
import { depotHelper } from 'shared';
import { SkProfileService } from '../../../../../profile/stores';
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import { getActiveCubeStructureItem } from '../../../utility/lectureStructureHelper';
import LectureTaskCreateEditor from './LectureTaskCreateEditor';
import LectureTaskEditEditor from './LectureTaskEditEditor';
import { Area } from 'tracker/model';
import LectureState from '../../../viewModel/LectureState';

interface LectureTaskCreateViewProps {
  isReply: boolean;
  boardId: string;
  lectureState?: LectureState;
  taskEdit?: LectureTaskDetail;
  viewType?: string;
  detailTaskId?: string;

  handleSubmitClick: (
    viewType: string,
    detailTaskId?: string,
    isReply?: boolean
  ) => void;
  changeProps: (e: any, name: string, viewType: string) => void;
}

const LectureTaskCreateView: React.FC<LectureTaskCreateViewProps> = function LectureTaskCreateView({
  lectureState,
  isReply,
  boardId,
  // taskDetail,
  viewType,
  detailTaskId,
  taskEdit,
  changeProps,
  handleSubmitClick,
}) {
  const params = useLectureParams();
  let [taskDetail] = useLectureTaskCreate();
  const [canNotice, setCanNotice] = useState<boolean>(false);

  useEffect(() => {
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    const lectureStructureCubeItem = getActiveCubeStructureItem(
      params.pathname
    );
    if (lectureStructureCubeItem === undefined) {
      return;
    }
    const audienceKey = lectureStructureCubeItem.cube.patronKey.keyString;
    /* eslint-disable prefer-const */
    let [pre, last] = audienceKey.split('@');

    if (pre === undefined || last === undefined) {
      return;
    }

    [pre] = pre.split('-');
    if (pre === undefined) {
      return;
    }

    const [last1, last2] = last.split('-');
    if (last1 === undefined || last2 === undefined) {
      return;
    }

    const denizenKey = `${pre}@${last1}-${last2}`;

    if (SkProfileService.instance.skProfile.id === denizenKey || 
        (lectureState &&
          lectureState.cubeDetail &&
          lectureState.cubeDetail.cubeContents?.operator.keyString === SkProfileService.instance.skProfile.id)) {
      setCanNotice(true);
    }else{
      setCanNotice(false);
    }

  }, [lectureState, params?.cubeId]);

  //edit인경우
  if (taskEdit !== undefined) {
    taskDetail = taskEdit;
  }

  useEffect(() => {
    if (viewType === 'edit') {
      getCubeLectureTaskDetail(detailTaskId);
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
    changeProps(e.target.value, 'title', viewType!);
  }, []);

  const handlePinnedChange = useCallback((e: any, data: any) => {
    const value = data.checked ? 2 : 0;
    changeProps(value, 'pinned', viewType!);
  }, []);

  const title = isReply ? 'Reply' : 'Post';

  return (
    <Fragment>
      {boardId && taskDetail && (
        <>
          <div className="course-info-header" data-area={Area.CUBE_HEADER}>
            <div className="survey-header">
              {viewType === 'create' && (
                <div className="survey-header-left">Create {title}</div>
              )}
              {viewType === 'edit' && (
                <div className="survey-header-left">Edit {title}</div>
              )}
            </div>
          </div>
          <div className="form-contants">
            <Form>
              <Form.Field>
                <div className="board-write-checkbox">
                  <div className="ui checkbox base">
                    {canNotice && !isReply && (
                      <Checkbox
                        className="base"
                        label="공지 등록"
                        name="communityPostCreatePinned"
                        checked={taskDetail.pinned === 2}
                        onChange={handlePinnedChange}
                      />
                    )}
                  </div>
                </div>
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
                <button
                  className="ui button fix bg"
                  onClick={() =>
                    handleSubmitClick('create', detailTaskId, isReply)
                  }
                >
                  등록
                </button>
              )}
              {viewType === 'edit' && (
                <button
                  className="ui button fix bg"
                  onClick={() =>
                    handleSubmitClick('edit', detailTaskId, isReply)
                  }
                >
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
