import React, {useState, Fragment, useEffect} from 'react';
import {Segment} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import NewLearningListView from '../view/NewLearningListView';
import {OrderByType} from '../../../lecture/model';
import {ContentType} from '../page/NewLearningPage';
import { ListLeftTopPanel, ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import myTrainingRoutes from 'myTraining/routePaths';

interface Props extends RouteComponentProps {
  contentType: string,
  setPageTitle: (contentType: ContentType) => void;
}

const NewLearningListContainer : React.FC<Props> = (Props) => {
  //
  const { contentType, setPageTitle, history } = Props;

  const [order, setOrder] = useState(OrderByType.New);
  const [totalCount, setTotalCount] = useState(0);
  const [viewType, setViewType] = useState<string>('All');

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

  const onChangeViewType = ((e: any, data: any, func?: any) => {
    console.log("버튼 선택 : " + data.value);
    setViewType(data.value);
  });

  // const onChangeViewType = (e: any, data: any) => {
  //   window.sessionStorage.setItem('order_type', data.value);

  //   // ORDER 타입 선택 시 첫 페이지로 조회 하게 초기화
  //   pageService!.initPageMap(PAGE_KEY, 0, PAGE_SIZE);

  //   findLectures(true);
  // }


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
        <div className="section-count">총 <span>{totalCount}개</span>의 리스트가 있습니다.</div>

        {contentType == ContentType.Enrolling && (
          <div className="comments-sort">
            <ListTopPanelTemplate
              className="right-wrap"
              contentType={contentType}
            >
              <ListRightTopPanel
                contentType={contentType}
                checkedViewType="All"
                resultEmpty={false}
                onChangeViewType={onChangeViewType}
              />
            </ListTopPanelTemplate>
          </div>
          // <div className="comments-sort">
          //   <Form className="comments-sort">
          //     <Form.Group inline>
          //       <Form.Field>
          //         <Radio
          //           className="base"
          //           label="전체 보기"
          //           name="sortRadioGroup"
          //           value={OrderByType.Imminent}      
          //           onChange={onChangeFilter}           
          //         />
          //       </Form.Field>
          //       <Form.Field>
          //         <Radio
          //           className="base"
          //           label="신청 가능 과정 모아보기"
          //           name="sortRadioGroup"
          //           value={OrderByType.Available}       
          //           onChange={onChangeFilter}                      
          //         />
          //       </Form.Field>
          //     </Form.Group>
          //   </Form>
          // </div>
        )}
        </div>

      <NewLearningListView
        setNewOrder={setNewOrder}
        showTotalCount={showTotalCount}
        contentType={contentType}
        order={window.sessionStorage.getItem('order_type') === OrderByType.New ? OrderByType.New : OrderByType.Popular}
        totalCount={totalCount}
        setPageTitle={setPageTitle}
        viewType={viewType}
      />

    </Segment>
  );
};

export default withRouter(NewLearningListContainer);

/* globals */
export type NewLearningViewType = 'All' | 'Aailable'; 
export type NewLearningContentType = ContentType;