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
    const questionType = [{'text': '최신순', 'value': 1}, {'text': '댓글순', 'value': 2}]
    return (
      <ListPanelTopLine className="size-type3" count={totalCount}>
        <div className="right-wrap">
            <Select placeholder="분류를 선택해주세요"
              className="s160 small-border"
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
