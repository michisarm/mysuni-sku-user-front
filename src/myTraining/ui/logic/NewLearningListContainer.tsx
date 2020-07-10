import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Radio, Segment} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {mobxHelper} from '@nara.platform/accent';
import {NewLectureService, PopularLectureService, RecommendLectureService} from '../../../lecture/stores';
import {ContentType, OrderType} from '../page/NewLearningPage';
import NewLearningListView from '../view/NewLearningListView';


interface Props extends RouteComponentProps {
  newLectureService?: NewLectureService,
  popularLectureService?: PopularLectureService,
  recommendLectureService?: RecommendLectureService,
  contentType: string,
}

const NewLearningListContainer : React.FC<Props> = (Props) => {
  //
  const { newLectureService, popularLectureService, recommendLectureService, contentType } = Props;

  const [totalCount, setTotalCount] = useState(0);
  // const [sharedCount, setSharedCount] = useState(0);
  const [order, setOrder] = useState(OrderType.New);

  // // lectureService 변경  실행
  // useEffect(() => {
  //   //
  //   switch (contentType) {
  //     case ContentType.New:
  //       setTotalCount(newLectureService!.totalCount);
  //       break;
  //     case ContentType.Popular:
  //       setTotalCount(popularLectureService!.totalCount);
  //       break;
  //     case ContentType.Recommend:
  //       setTotalCount(recommendLectureService!.totalCount);
  //       break;
  //   }
  // }, [order]);

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

  /*
  const onChangeSharedCount = (sharedCount: number) => {
    //
    setSharedCount(sharedCount);
  };
  */

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
        // onChangeSharedCount={onChangeSharedCount}
        setNewOrder={setNewOrder}
        showTotalCount={showTotalCount}
        contentType={contentType}
        order={window.sessionStorage.getItem('order_type') === OrderType.New ? OrderType.New : OrderType.Popular}
        totalCount={totalCount}
      />

    </Segment>
  );
};

export default inject(mobxHelper.injectFrom(
  'newLecture.newLectureService',
  'popularLecture.popularLectureService',
  'recommendLecture.recommendLectureService',
))(withRouter(observer(NewLearningListContainer)));
