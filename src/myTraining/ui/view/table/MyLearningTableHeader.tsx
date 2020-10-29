
import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Icon, Table } from 'semantic-ui-react';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import { MyLearningContentType, TableHeaderColumn } from '../../model';


interface Props {
  contentType: MyContentType;
  onClickSort: (column: string, direction: Direction) => void;
  myTrainingService?: MyTrainingService;
}

function MyLearningTableHeader(props: Props) {
  console.log('myLearningTableHeader :: render :: ');
  const { contentType, onClickSort, myTrainingService } = props;
  const { myTrainingTableViews, selectedIds, selectAll, clearAll } = myTrainingService!;

  /* by 김동구
    contentType 에 따라 테이블 컬럼이 동적으로 변경됨.
    현재 contentType 에 맞는 테이블 컬럼을 가져옴.
  */
  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  // 아이콘이 있는 테이블 컬럼을 Order 타입으로 변환.
  const initialOrders = headerColumns
    .filter(headerColumn => headerColumn.icon === true)
    .map(headerColumn => ({ column: headerColumn.text, direction: Direction.DESC }));

  /* states */
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  /* effects */
  useEffect(() => {
    if (contentType === MyLearningContentType.InProgress) {
      clearAll();
    }
  }, [contentType]);

  const onCheckAll = useCallback((e: any, data: any) => {
    // 이미 전체 선택이 되어 있는 경우, 전체 해제
    if (myTrainingTableViews.length === selectedIds.length) {
      clearAll();
      return;
    }
    // 전체 선택
    selectAll();
  }, [myTrainingTableViews, selectedIds]);

  /* functions */
  const getDireciton = (column: string) => {
    // 클릭한 컬럼의 정렬 순서를 구하는 함수.
    return orders.filter(order => order.column === column)[0].direction;
  };

  const getOrderIcon = (column: string, fromStyle: boolean = false) => {
    // 클릭한 컬럼의 style className 을 리턴함.
    if (fromStyle) {
      return getDireciton(column) === Direction.DESC ? 'list-down16' : 'list-up16';
    }
    // 클릭한 컬럼의 innerText 를 리턴함.
    return getDireciton(column) === Direction.DESC ? '내림차순 정렬' : '오름차순 정렬';
  };


  /* handlers */
  const handleClickSort = useCallback((column: string) => {
    // 클릭한 컬럼의 order 객체 를 구함.
    const clickedOrder = orders.filter(order => order.column === column)[0];
    // 클릭하지 않은 order 객체들 을 구함.
    const nonClickedOrder = orders.filter(order => order.column !== column);

    // 클릭한 컬럼의 정렬 순서를 toggle 한 뒤 orders state 수정. (정렬 아이콘 UI 변경을 위함.)
    setOrders([...nonClickedOrder, { column, direction: toggleDirection(clickedOrder.direction) }]);

    // 실제 테이블 리스트 데잍터 정렬을 위한 함수.
    onClickSort(clickedOrder.column, clickedOrder.direction);
  }, [orders, onClickSort]);


  return (
    <>
      <Table.Header>
        <Table.Row>
          {/* 학습중 탭에 한해 checkbox 가 보여짐. */}
          {contentType === MyLearningContentType.InProgress &&
            (
              <Table.HeaderCell className="ck">
                <Checkbox
                  checked={selectedIds.length === myTrainingTableViews.length}
                  onChange={onCheckAll}
                />
              </Table.HeaderCell>
            )
          }
          {headerColumns &&
            headerColumns.length &&
            headerColumns.map(headerColumn =>
              (
                <Table.HeaderCell
                  key={`learning-header-${headerColumn.key}`}
                  className={headerColumn.text === '과정명' ? 'title' : ''}
                >
                  {headerColumn.text}
                  {headerColumn.icon && (
                    <a href="#" onClick={() => handleClickSort(headerColumn.text)}>
                      <Icon className={getOrderIcon(headerColumn.text, true)}>
                        <span className="blind">{getOrderIcon(headerColumn.text)}</span>
                      </Icon>
                    </a>
                  )}
                </Table.HeaderCell>
              )
            )}
        </Table.Row>
      </Table.Header>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(observer(MyLearningTableHeader));


/* globals */
export enum Direction {
  ASC = 'asc',
  DESC = 'desc'
}

// 정렬 대상이 되는 컬럼 타입
export type Order = {
  column: string; // 컬럼명
  direction: Direction; // 정렬 순서(오름차순, 내림차순)
}

// 정렬 순서를 toggle 하는 함수.
const toggleDirection = (prev: Direction) => {
  return prev === Direction.DESC ? Direction.ASC : Direction.DESC;
};

