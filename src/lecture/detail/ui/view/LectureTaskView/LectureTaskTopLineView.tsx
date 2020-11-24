import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { useLectureState } from '../../../service/useLectureState/useLectureState';

interface Props {
  totalCount: number;
  handelClickCreateTask: () => void;
}

const LectureTaskTopLineView: React.FC<Props> = function LectureTaskTopLineView({
  totalCount,
  handelClickCreateTask,
}) {
  const [lectureState] = useLectureState();
  return (
    <ListPanelTopLine className="size-type3" count={totalCount}>
      {(lectureState?.state === 'Progress' ||
        lectureState?.state === 'Completed') && (
        <div className="right-wrap">
          <a
            className="ui icon button left post"
            onClick={handelClickCreateTask}
            href="#create"
          >
            <Icon className="post" />
            post
          </a>
        </div>
      )}
    </ListPanelTopLine>
  );
};

export default LectureTaskTopLineView;
