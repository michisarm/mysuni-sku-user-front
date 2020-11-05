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
class CommunityPostTopLineView extends React.Component<Props> {
  render() {
    //
    const { totalCount, handelClickCreateTask } = this.props;
    const questionType = [{'text': 1, 'value': 1}]
    return (
      <ListPanelTopLine className="size-type3" count={totalCount}>
        <div className="right-wrap board-down-title-right">
            <Select placeholder="분류를 선택해주세요"
              className="ui selection dropdown ui small-border dropdown m0"
              options={questionType}
              // onChange={(e: any, data: any) => this.onChangePostProps('category', {
              //   id: data.value,
              //   name: e.target.innerText,
              // })}
            />
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

export default CommunityPostTopLineView;
