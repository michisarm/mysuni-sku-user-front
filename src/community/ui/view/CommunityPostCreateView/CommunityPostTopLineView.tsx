import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { SortType } from 'community/ui/logic/CommunityPostListContainer';

interface Props {
  totalCount: number;
  sortType: string;
  handelClickCreateTask: () => void;
  onChangeSortType:(name: string, value: SortType) => void;
}

@reactAutobind
@observer
class CommunityPostTopLineView extends React.Component<Props> {
  render() {
    //
    const { totalCount, sortType, handelClickCreateTask } = this.props;
    const questionType = [{'text': '최신순', 'value': 'createdTime'}, {'text': '댓글순', 'value': 'replyCount'}]
    return (
      <ListPanelTopLine className="size-type3" count={totalCount}>
        <div className="right-wrap">
          <Select placeholder="선택해주세요"
            className="s160 small-border"
            options={questionType}
            value={sortType}
            onChange={(e: any, data: any) => this.props.onChangeSortType('sort', data.value)}
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
