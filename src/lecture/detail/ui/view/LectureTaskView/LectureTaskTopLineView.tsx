import React, {useCallback} from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Radio } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { useLectureState } from '../../../store/LectureStateStore';
import { getLectureTaskOrder, useLectureTaskOrder } from '../../../store/LectureTaskStore';
import { submit } from '../../../service/useLectureState/utility/cubeStateActions';

interface Props {
  totalCount: number;
  handelClickCreateTask: () => void;
  sortChage?: (data: any) => void;
}

const LectureTaskTopLineView: React.FC<Props> = function LectureTaskTopLineView({
  totalCount,
  handelClickCreateTask,
  sortChage,
}) {
  const lectureState = useLectureState();
  const lectureTaskOrder = useLectureTaskOrder();
  const lectureTaskOrder2 = getLectureTaskOrder();
  const onClickCreateTask = useCallback(async () => {
    if(lectureState && lectureState.student === undefined){
      console.log("STTTTTTTTTTTTTART")
      await submit(1)
    }
      console.log("44444444")
      handelClickCreateTask()
    
  }, [lectureState]);

  return (
    // <ListPanelTopLine className="size-type3" count={totalCount}>
    //   {lectureState?.student !== undefined && (
    //     <div className="right-wrap">
    //       <a
    //         className="ui icon button left post"
    //         onClick={handelClickCreateTask}
    //         href="#create"
    //       >
    //         <Icon className="post" />
    //         post
    //       </a>
    //     </div>
    //   )}
    // </ListPanelTopLine>

    <div className="task-title-wrap">
      <div className="task-number">
        <span>총 <strong>{totalCount || 0} 건</strong>의 게시글이 있습니다.</span>
      </div>
      {totalCount > 0 ? (
        <div className="course-radio task">
          <Radio
            className="base"
            label="Newest"
            name="radioGroup"
            value="new"
            checked={lectureTaskOrder === "new"}
            onChange={(e: any, data: any) => {
              if(sortChage){
                sortChage(data.value)
              }
            }}
          />
          <Radio
            className="base"
            label="Oldest"
            name="radioGroup"
            value="old"
            checked={lectureTaskOrder === "old"}
            // onClick={(e: any, data: any) => {
            //   console.log('LectureTaskTopLineView', data.value)
            //   setLectureTaskOrder(data.value)
            // }}
            onChange={(e: any, data: any) => {
              if(sortChage){
                sortChage(data.value)
              }
            }}
          />
          
          <Radio
            className="base radi"
            label="My Posts"
            name="radioGroup"
            value="My"
            checked={lectureTaskOrder === "My"}
            // onClick={(e: any, data: any) => {
            //   console.log('LectureTaskTopLineView', data.value)
            //   setLectureTaskOrder(data.value)
            // }}
            onChange={(e: any, data: any) => {
              if(sortChage){
                sortChage(data.value)
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
                Post
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
              Post
            </a>
          </div>
        )}
    </div>
    
  );
};

export default LectureTaskTopLineView;
