import React, {useState} from 'react';
import {Radio, Segment} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {OrderType} from '../page/NewLearningPage';
import NewLearningListView from '../view/NewLearningListView';


interface Props extends RouteComponentProps {
  contentType: string,
}

const NewLearningListContainer : React.FC<Props> = (Props) => {
  //
  const { contentType } = Props;

  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState(OrderType.New);

  const showTotalCount = (count: number) => {
    setTotalCount(count);
  };

  const onChangeSorting = (e: any, data: any) => {
    if (order === data.value) return;
    // 순서변경
    window.sessionStorage.setItem('order_type', data.value);
    setOrder(data.value);
  };

  const setNewOrder = (order: OrderType) => {
    window.sessionStorage.setItem('order_type', order);
    setOrder(order);
  };

  return (
    <Segment className="full">
      <div className="sort-reult">
        <div className="section-count">총 <span>{totalCount}개</span>의 리스트가 있습니다.</div>
        <div className="comments-sort">
          <Radio
            label="최신순"
            className="base"
            name="list-sort"
            value={OrderType.New}
            checked={window.sessionStorage.getItem('order_type')===OrderType.New}
            onChange={onChangeSorting}
          />
          <Radio
            label="인기순"
            className="base"
            name="list-sort"
            value={OrderType.Popular}
            checked={window.sessionStorage.getItem('order_type')===OrderType.Popular}
            onChange={onChangeSorting}
          />
        </div>
      </div>

      <NewLearningListView
        setNewOrder={setNewOrder}
        showTotalCount={showTotalCount}
        contentType={contentType}
        order={window.sessionStorage.getItem('order_type') === OrderType.New ? OrderType.New : OrderType.Popular}
        totalCount={totalCount}
      />

    </Segment>
  );
};

export default withRouter(NewLearningListContainer);
