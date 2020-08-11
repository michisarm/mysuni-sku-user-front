import React, {useState} from 'react';
import {Radio, Segment} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import NewLearningListView from '../view/NewLearningListView';
import {OrderByType} from '../../../lecture/model';
import {ContentType} from '../page/NewLearningPage';


interface Props extends RouteComponentProps {
  contentType: string,
  setPageTitle: (contentType: ContentType) => void;
}

const NewLearningListContainer : React.FC<Props> = (Props) => {
  //
  const { contentType, setPageTitle } = Props;

  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState(OrderByType.New);

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

  return (
    <Segment className="full">
      <div className="sort-reult">
        <div className="section-count">총 <span>{totalCount}개</span>의 리스트가 있습니다.</div>
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
      </div>

      <NewLearningListView
        setNewOrder={setNewOrder}
        showTotalCount={showTotalCount}
        contentType={contentType}
        order={window.sessionStorage.getItem('order_type') === OrderByType.New ? OrderByType.New : OrderByType.Popular}
        totalCount={totalCount}
        setPageTitle={setPageTitle}
      />

    </Segment>
  );
};

export default withRouter(NewLearningListContainer);
