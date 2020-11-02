import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Select } from 'semantic-ui-react';
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
    const {
      totalCount,
      handelClickCreateTask,
      // searchSelectOptions,
      // onChange,
    } = this.props;

    return (
      <ListPanelTopLine className="size-type3" count={totalCount}>
        <div className="right-wrap">
          {/* <Select
            placeholder="전체"
            className="small-border m0"
            value={searchState}
            options={searchSelectOptions}
            onChange={onChange}
          /> */}
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
