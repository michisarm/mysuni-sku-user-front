import React, { useState, Fragment, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import NewLearningListView from '../view/NewLearningListView';
import { OrderByType } from '../../../lecture/model';
import {
  ListLeftTopPanel,
  ListRightTopPanel,
  ListTopPanelTemplate,
} from '../view/panel';
import myTrainingRoutes from 'myTraining/routePaths';
import { PolyglotText, getPolyglotText } from 'shared/ui/logic/PolyglotText';

export enum ContentType {
  New = 'New',
  Popular = 'Popular',
  Recommend = 'Recommend',
  Required = 'Required',
  Enrolling = 'Enrolling',
}
interface Props extends RouteComponentProps {
  contentType: string;
  setPageTitle: (contentType: ContentType) => void;
}

const NewLearningListContainer: React.FC<Props> = (Props) => {
  //
  const { contentType, setPageTitle, history } = Props;

  const [order, setOrder] = useState(OrderByType.New);
  const [totalCount, setTotalCount] = useState(0);
  const [viewType, setViewType] = useState<EnrollingViewType>('All');

  const showTotalCount = (count: number) => {
    setTotalCount(count);
  };

  const onChangeSorting = (e: any, data: any) => {
    if (order === data.value) return;
    // 순서변경
    window.sessionStorage.setItem('order_type', data.value);
    setOrder(data.value);
  };

  const setNewOrder = (order: OrderByType) => {
    window.sessionStorage.setItem('order_type', order);
    setOrder(order);
  };

  const onChangeViewType = (e: any, data: any, func?: any) => {
    setViewType(data.value);
  };

  return (
    <Segment className="full">
      {/*20.07.28 기능삭제*/}
      {/*<div className="comments-sort">*/}
      {/*<Radio*/}
      {/*label="최신순"*/}
      {/*className="base"*/}
      {/*name="list-sort"*/}
      {/*value={OrderByType.New}*/}
      {/*checked={window.sessionStorage.getItem('order_type')===OrderByType.New}*/}
      {/*onChange={onChangeSorting}*/}
      {/*/>*/}
      {/*<Radio*/}
      {/*label="인기순"*/}
      {/*className="base"*/}
      {/*name="list-sort"*/}
      {/*value={OrderByType.Popular}*/}
      {/*checked={window.sessionStorage.getItem('order_type')===OrderByType.Popular}*/}
      {/*onChange={onChangeSorting}*/}
      {/*/>*/}
      {/*</div>*/}

      <div className="sort-reult">
        <div
          className="section-count"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              `총 <span>{totalCount}개</span>의 리스트가 있습니다.`,
              '신규학습-신규목록-목록개수',
              { totalCount: totalCount.toString() }
            ),
          }}
        />
        {contentType == ContentType.Enrolling && (
          <div className="comments-sort">
            <ListTopPanelTemplate
              className="right-wrap"
              contentType={contentType}
            >
              <ListRightTopPanel
                contentType={contentType}
                checkedViewType={viewType}
                resultEmpty={false}
                onChangeViewType={onChangeViewType}
              />
            </ListTopPanelTemplate>
          </div>
        )}
      </div>

      <NewLearningListView
        setNewOrder={setNewOrder}
        showTotalCount={showTotalCount}
        contentType={contentType}
        order={
          window.sessionStorage.getItem('order_type') === OrderByType.New
            ? OrderByType.New
            : OrderByType.Popular
        }
        totalCount={totalCount}
        setPageTitle={setPageTitle}
        viewType={viewType}
      />
    </Segment>
  );
};

export default withRouter(NewLearningListContainer);

/* globals */
export type EnrollingViewType = 'All' | 'Available'; // 전체보기 | 수강 신청 가능 과정 모아보기
export type NewLearningContentType = ContentType;
