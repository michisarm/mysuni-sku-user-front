import React, {useState, Fragment} from 'react';
import {Radio, Segment, Checkbox, Form} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import NewLearningListView from '../view/NewLearningListView';
import {OrderByType} from '../../../lecture/model';
import {ContentType} from '../page/NewLearningPage';
import CheckboxOptions from 'myTraining/ui/model/CheckboxOptions';

interface Props extends RouteComponentProps {
  contentType: string,
  setPageTitle: (contentType: ContentType) => void;
}

const NewLearningListContainer : React.FC<Props> = (Props) => {
  //
  const { contentType, setPageTitle } = Props;

  const [order, setOrder] = useState(OrderByType.New);

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

        {/* <div className="comments-sort">
          {CheckboxOptions.enrollingViewTypes.map((viewType, index) => (
            <Fragment key={`view-type-${index}`}>
              <Checkbox
                className="base radio"
                name={viewType.name}
                label={viewType.label}
                value={viewType.value}
                // checked={viewType.value === checkedViewType}
                // onChange={onChangeViewType}
              />
            </Fragment>
          ))}
        </div> */}

      <NewLearningListView
        setNewOrder={setNewOrder}
        // showTotalCount={showTotalCount}
        contentType={contentType}
        order={window.sessionStorage.getItem('order_type') === OrderByType.New ? OrderByType.New : OrderByType.Popular}
        // totalCount={totalCount}
        setPageTitle={setPageTitle}
      />

    </Segment>
  );
};

export default withRouter(NewLearningListContainer);
