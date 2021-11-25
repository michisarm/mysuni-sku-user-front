import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Icon, Table } from 'semantic-ui-react';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import { toggleDirection, Direction } from '../../../model/Direction';
import { Order } from '../../../model/Order';
import TableHeaderColumn, {
  inProgressPolyglot,
} from '../../model/TableHeaderColumn';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyContentType } from '../../model/MyContentType';
import { MyPageContentType } from '../../model/MyPageContentType';

interface MyLearningListHeaderViewProps {
  contentType: MyContentType;
  onClickSort?: (column: string, direction: Direction) => void;
  myTrainingService?: MyTrainingService;
}

function MyLearningListHeaderView({
  contentType,
  onClickSort,
  myTrainingService,
}: MyLearningListHeaderViewProps) {
  const { myTrainingTableViews, selectedServiceIds, selectAll, clearAll } =
    myTrainingService!;

  const headerColumns = TableHeaderColumn.getColumnsByContentType(contentType);

  const initialOrders = headerColumns
    .filter((headerColumn) => headerColumn.icon === true)
    .map((headerColumn) => ({
      column: headerColumn.text,
      direction: Direction.DESC,
    }));

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    if (contentType === MyLearningContentType.InProgress) {
      clearAll();
    }
  }, [contentType]);

  const onCheckAll = useCallback(
    (e: any, data: any) => {
      if (myTrainingTableViews.length === selectedServiceIds.length) {
        clearAll();
        return;
      }

      selectAll();
    },
    [myTrainingTableViews, selectedServiceIds]
  );

  /* functions */
  const getDireciton = (column: string) => {
    return orders.filter((order) => order.column === column)[0]?.direction;
  };

  const getOrderIcon = (column: string, fromStyle: boolean = false) => {
    if (fromStyle) {
      return getDireciton(column) === Direction.DESC
        ? 'list-down16'
        : 'list-up16';
    }

    return getDireciton(column) === Direction.DESC
      ? '내림차순 정렬'
      : '오름차순 정렬';
  };

  const handleClickSort = useCallback(
    (column: string) => {
      const clickedOrder = orders.filter((order) => order.column === column)[0];
      const nonClickedOrder = orders.filter((order) => order.column !== column);

      setOrders([
        ...nonClickedOrder,
        { column, direction: toggleDirection(clickedOrder.direction) },
      ]);

      onClickSort!(clickedOrder.column, clickedOrder.direction);
    },
    [orders, onClickSort]
  );

  return (
    <>
      <Table.Header>
        <Table.Row>
          {contentType === MyLearningContentType.InProgress && (
            <Table.HeaderCell className="ck">
              <Checkbox
                checked={
                  selectedServiceIds.length === myTrainingTableViews.length
                }
                onChange={onCheckAll}
              />
            </Table.HeaderCell>
          )}
          {headerColumns &&
            headerColumns.length &&
            headerColumns.map((headerColumn) => (
              <Table.HeaderCell
                key={`learning-header-${headerColumn.key}`}
                className={
                  (contentType !== MyPageContentType.EarnedStampList &&
                    headerColumn.text) === '과정명'
                    ? 'title'
                    : ''
                }
              >
                {inProgressPolyglot(headerColumn.text)}
                {headerColumn.icon && (
                  <a
                    href="#"
                    onClick={(e) => {
                      handleClickSort(headerColumn.text);
                      e.preventDefault();
                    }}
                  >
                    <Icon className={getOrderIcon(headerColumn.text, true)}>
                      <span className="blind">
                        {getOrderIcon(headerColumn.text)}
                      </span>
                    </Icon>
                  </a>
                )}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>
    </>
  );
}

export default inject(mobxHelper.injectFrom('myTraining.myTrainingService'))(
  observer(MyLearningListHeaderView)
);
