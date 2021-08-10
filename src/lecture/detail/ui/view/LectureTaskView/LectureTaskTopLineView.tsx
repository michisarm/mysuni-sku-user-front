import React, {useCallback} from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Radio } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { useLectureState } from '../../../store/LectureStateStore';
import { getLectureTaskOrder, useLectureTaskOrder } from '../../../store/LectureTaskStore';
import { submit } from '../../../service/useLectureState/utility/cubeStateActions';
import { getPolyglotText, PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props {
  totalCount: number;
  handelClickCreateTask: () => void;
  sortChange?: (data: any) => void;
}

const LectureTaskTopLineView: React.FC<Props> = function LectureTaskTopLineView({
  totalCount,
  handelClickCreateTask,
  sortChange,
}) {
  const lectureState = useLectureState();
  const lectureTaskOrder = useLectureTaskOrder();
  const onClickCreateTask = useCallback(async () => {
    if(lectureState && lectureState.student === undefined){
      await submit(1)
    }
      handelClickCreateTask()
  }, [lectureState]);

  return (
    <div className="task-title-wrap">
      <div
        className="task-number"
        dangerouslySetInnerHTML={{__html: getPolyglotText(`<span>총 <strong>${totalCount || 0} 건</strong>의 게시글이 있습니다.</span>`, 'Collage-TaskPostView-게시글갯수')}}
      />
      {totalCount > 0 || lectureTaskOrder === "My" ? (
        <div className="course-radio task">
          <Radio
            className="base"
            label="Newest"
            name="radioGroup"
            value="new"
            checked={lectureTaskOrder === "new"}
            onChange={(e: any, data: any) => {
              if(sortChange){
                sortChange(data.value)
              }
            }}
          />
          <Radio
            className="base"
            label="Oldest"
            name="radioGroup"
            value="old"
            checked={lectureTaskOrder === "old"}
            onChange={(e: any, data: any) => {
              if(sortChange){
                sortChange(data.value)
              }
            }}
          />

          <Radio
            className="base radi"
            label="My Posts"
            name="radioGroup"
            value="My"
            checked={lectureTaskOrder === "My"}
            onChange={(e: any, data: any) => {
              if(sortChange){
                sortChange(data.value)
              }
            }}
          />

          {/* {lectureState?.student !== undefined && ( */}
            {/* <div className="right-wrap"> */}
              <a
                className="ui icon task-post-btn"
                onClick={onClickCreateTask}
                href="#create"
              >
                <PolyglotText defaultString="Post" id="Collage-TaskPostView-post1" />
              </a>
            {/* </div> */}
          {/* )} */}
        </div>) : (
          <div className="course-radio task">
            <a
              className="ui icon task-post-btn"
              onClick={onClickCreateTask}
              href="#create"
            >
              <PolyglotText defaultString="Post" id="Collage-TaskPostView-post2" />
            </a>
          </div>
        )}
    </div>

  );
};

export default LectureTaskTopLineView;
