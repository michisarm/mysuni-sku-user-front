import React, { Fragment, memo } from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import { MyLearningContentType } from 'myTraining/ui/model';
import CheckboxOptions from 'myTraining/ui/model/CheckboxOptions';
import { MyContentType, ViewType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';
import { ApprovalViewType } from 'myTraining/ui/logic/MyApprovalListContainerV2';

interface Props {
  contentType: MyContentType;
  resultEmpty?: boolean;
  filterCount?: number;
  openFilter?: boolean;
  activeFilter?: boolean;
  onClickFilter?: () => void;
  checkedViewType: ViewType | ApprovalViewType;
  onChangeViewType: (e: any, data: any) => void;
}

function ListRightTopPanel(props: Props) {
  const { contentType, resultEmpty, filterCount, openFilter, activeFilter, onClickFilter, checkedViewType, onChangeViewType } = props;

  console.log('ListRightTopPanel :: render :: ');

  /* render functions */
  const renderRadiobox = (contentType: MyContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed:
        return !resultEmpty && (
          <div className="view-all">
            {CheckboxOptions.viewTypes.map((viewType, index) => (
              <Fragment key={`view-type-${index}`}>
                <Checkbox
                  className="base radio"
                  name={viewType.name}
                  label={viewType.label}
                  value={viewType.value}
                  checked={viewType.value === checkedViewType}
                  onChange={onChangeViewType}
                />
              </Fragment>
            ))}
          </div>
        );
      case MyApprovalContentType.PersonalLearning:
        return (
          <div className="radio-wrap">
            {CheckboxOptions.approvalViewTypes.map((approvalViewType, index) => (
              <Fragment key={`approval-view-type-${index}`}>
                <Checkbox
                  className="base radio"
                  name={approvalViewType.name}
                  label={approvalViewType.label}
                  value={approvalViewType.value}
                  checked={approvalViewType.value === checkedViewType}
                  onChange={onChangeViewType}
                />
              </Fragment>
            ))}
          </div>
        )
      default:
        return null;
    }
  };

  const renderFilter = (contentType: MyContentType) => {
    const active = activeFilter ? 'btn-filter-blue' : 'left post';
    const open = openFilter ? 'on' : '';

    switch (contentType) {
      case MyLearningContentType.PersonalCompleted:
      case MyApprovalContentType.PersonalLearning:
        return null;
      default:
        return (
          <Button
            icon={activeFilter ? false : true}
            className={classNames(active, open)}
            onClick={onClickFilter}
          >
            {!activeFilter && (
              <Icon className="filter2" aria-hidden="true" />
            )}
            <span>Filter{filterCount && filterCount > 0 && `(${filterCount})`}</span>
          </Button>
        );
    }
  };

  return (
    <>
      {renderRadiobox(contentType)}
      {renderFilter(contentType)}
    </>
  );
}

export default memo(ListRightTopPanel);