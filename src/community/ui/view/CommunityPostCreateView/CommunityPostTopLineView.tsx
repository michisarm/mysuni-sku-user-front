import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Button, Icon, Select } from 'semantic-ui-react';
import { SortType } from 'community/ui/logic/CommunityPostListContainer';
import { Link, useParams } from 'react-router-dom';
import CommunityPanelTopLineContainer from '../CommunityPostList/mPostPanelTopLineContainer';

interface Props {
  totalCount: number;
  sortType: string;
  handelClickCreateTask: () => void;
  onChangeSortType: (name: string, value: SortType) => void;
}

interface Params {
  communityId: string;
  menuId: string;
}

const CommunityPostTopLineView: React.FC<Props> = function CommunityPostTopLineView({
  totalCount,
  sortType,
  handelClickCreateTask,
  onChangeSortType,
}) {
  const { communityId, menuId } = useParams<Params>();
  const questionType = [
    { text: '최신순', value: 'createdTime' },
    { text: '댓글순', value: 'replyCount' },
  ];
  return (
    <div className="table-board-title">
      <CommunityPanelTopLineContainer count={totalCount}>
        <div className="right-wrap board-down-title-right">
          <Select
            placeholder="선택해주세요"
            className="ui selection dropdown ui small-border dropdown m0"
            options={questionType}
            value={sortType}
            onChange={(e: any, data: any) =>
              onChangeSortType('sort', data.value)
            }
          />
          <Link
            className="ui icon button post"
            to={`/community/${communityId}/board/${menuId}/create`}
          >
            <Icon className="post" />
            post
          </Link>
        </div>
      </CommunityPanelTopLineContainer>
    </div>
  );
};

export default CommunityPostTopLineView;
