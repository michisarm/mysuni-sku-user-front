import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';

interface Props {
  totalCount: number;
  handelClickCreateTask: () => void;
}

@reactAutobind
@observer
class LectureTaskTopLineView extends React.Component<Props> {
  render() {
    //
    const { totalCount, handelClickCreateTask } = this.props;

    return (
      <ListPanelTopLine className="size-type3" count={totalCount}>
        <div className="right-wrap">
          <Button
            className="ui icon button left post"
            onClick={handelClickCreateTask}
          >
            <Icon className="post" />
            post
          </Button>
        </div>
      </ListPanelTopLine>
    );
  }
}

export default LectureTaskTopLineView;
