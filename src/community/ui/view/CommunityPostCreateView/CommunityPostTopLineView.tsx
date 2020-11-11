import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { SortType } from 'community/ui/logic/CommunityPostListContainer';
import CommunityPanelTopLineContainer from '../communityPostList/PostPanelTopLineContainer';

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
      <div className="table-board-title">
        <CommunityPanelTopLineContainer count={totalCount}>
          <div className="right-wrap board-down-title-right">
              <Select placeholder="선택해주세요"
                className="ui selection dropdown ui small-border dropdown m0"
                options={questionType}
                value={sortType}
                onChange={(e: any, data: any) => this.props.onChangeSortType('sort', data.value)}
              />
            <Button
              className="ui icon button post"
              onClick={handelClickCreateTask}
            >
              <Icon className="post" />
              post
            </Button>
          </div>
        </CommunityPanelTopLineContainer>
      </div>
    );
  }
}

export default CommunityPostTopLineView;
