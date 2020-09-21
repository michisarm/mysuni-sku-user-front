import React, { useState, useEffect, Fragment } from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import { MyLearningContentType } from 'myTraining/ui/model';
import CheckboxOptions from 'myTraining/ui/model/CheckboxOptions';

interface Props {
  contentType: MyLearningContentType;
  resultEmpty: boolean;
  filterCount: number;
  activeFilter: boolean;
  onClickFilter: () => void;
  checkedViewType: string;
  onChangeViewType: (e: any, data: any) => void;
}

function ListRightTopPanel(props: Props) {
  const { contentType, resultEmpty, filterCount, activeFilter, onClickFilter, checkedViewType, onChangeViewType } = props;

  /* const [checkedValue, setCheckedValue] = useState<string>('course');

  useEffect(() => {
    console.log('After onChangeCheckbox :: ', checkedValue);
  }, [checkedValue]); */
  /* event handlers */

  /*
    check된 value에 따라서 list 화면에 뿌려질 데이터가 달라지도록 해야함.
    myTrainingService 에 하나의 MyTrainingListViewRdoModel 을 만들어서 추가 하도록 한다.
  */
  /*   const onChangeCheckbox = (e: any, data: any) => {
      console.log('before onChangeCheckbox:: ', checkedValue);
      setCheckedValue(data.value);
    }; */

  /* render functions on condition */

  /* contentType 이 아래와 같은 경우에만 checkbox를 랜더링 함.
      1. 학습중
      2. mySUNI 학습완료

  */
  const renderCheckbox = () => {
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
      default:
        return null;
    }
  };

  /*
    개인학습 완료를 제외한 모든 탭에서 필터를 랜더링 함.
    activeFilter에 따라 css 가 달라짐.
      1. Button className :: left button post => btn-filter-blue 
      2. Button icon 추가됨

      두 가지 케이스를 분리해서 랜더링하는 편이 좋아 보임.
  */
  const renderFilter = () => {
    return (
      <>
        {contentType === MyLearningContentType.PersonalCompleted ||
          (
            <Button
              // icon={!activeFilter ? true : false}
              className={activeFilter && 'btn-filter-blue' || 'left post'}
              onClick={onClickFilter}
            >
              {activeFilter || (
                <Icon className="filter2" aria-hidden="true" />
              )}
              {/* 선택된 filter 조건이 있으면, 선택된 조건 count 만큼 숫자 표시. */}
              <span>Filter{filterCount != null && `(${filterCount})`}</span>
            </Button>
          )}
      </>
    );
  };

  return (
    <div className="right-wrap">
      {/* radio checkbox */}
      {renderCheckbox()}

      {/* filter button */}
      {renderFilter()}
    </div>
  );
}

export default ListRightTopPanel;
