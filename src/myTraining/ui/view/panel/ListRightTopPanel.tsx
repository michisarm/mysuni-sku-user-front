import React, { Fragment, memo } from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import CheckboxOptions from 'myTraining/ui/model/CheckboxOptions';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { ApprovalViewType } from '../../../personalLearning/PersonalLearningListContainer';
import { ContentType } from '../../logic/NewLearningListContainer';
import { EnrollingViewType } from '../../logic/NewLearningListContainer';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyContentType } from '../../model/MyContentType';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  contentType: MyContentType | ContentType;
  resultEmpty?: boolean;
  filterCount?: number;
  openFilter?: boolean;
  activeFilter?: boolean;
  onClickFilter?: () => void;
  checkedViewType?: ApprovalViewType | EnrollingViewType;
  onChangeViewType?: (e: any, data: any) => void;
}

function ListRightTopPanel(props: Props) {
  const {
    contentType,
    resultEmpty,
    filterCount,
    openFilter,
    activeFilter,
    onClickFilter,
    checkedViewType,
    onChangeViewType,
  } = props;

  /* render functions */
  const renderRadiobox = (contentType: MyContentType | ContentType) => {
    switch (contentType) {
      case MyApprovalContentType.PersonalLearning:
        return (
          <div className="radio-wrap">
            {CheckboxOptions.approvalViewTypes.map(
              (approvalViewType, index) => (
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
              )
            )}
          </div>
        );
      case ContentType.Enrolling:
        return (
          !resultEmpty && (
            <div className="view-all">
              {CheckboxOptions.enrollingViewTypes.map(
                (enrollingViewType, index) => (
                  <Fragment key={`enrolling-view-type-${index}`}>
                    <Checkbox
                      className="base radio"
                      name={enrollingViewType.name}
                      label={enrollingViewType.label}
                      value={enrollingViewType.value}
                      checked={enrollingViewType.value === checkedViewType}
                      onChange={onChangeViewType}
                    />
                  </Fragment>
                )
              )}
            </div>
          )
        );
      default:
        return null;
    }
  };

  const renderFilter = (contentType: MyContentType | ContentType) => {
    const active = activeFilter ? 'btn-filter-blue' : 'left post';
    const open = openFilter ? 'on' : '';

    switch (contentType) {
      case MyLearningContentType.PersonalCompleted:
      case MyApprovalContentType.PersonalLearning:
      case ContentType.Enrolling:
        return null;
      default:
        return (
          <Button
            icon={!activeFilter}
            className={classNames(active, open)}
            onClick={onClickFilter}
          >
            {!activeFilter && <Icon className="filter2" aria-hidden="true" />}
            <span>
              <PolyglotText id="mapg-msmp-필터열기" defaultString="Filter" />
              {(filterCount && filterCount > 0 && `(${filterCount})`) || ''}
            </span>
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
