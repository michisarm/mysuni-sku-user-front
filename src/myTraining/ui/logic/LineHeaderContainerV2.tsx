import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import XLSX from 'xlsx';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';
import MyTrainingFilterRdoModel from 'myTraining/model/MyTrainingFilterRdoModel';
import { MyLearningContentType } from '../model';
import { ListLeftTopPanel, ListRightTopPanel } from '../view/panel';
import { MyTrainingService } from '../../stores';





interface Props extends RouteComponentProps {
  contentType: MyLearningContentType;
  viewType: string;
  onChangeViewType: (e: any, data: any) => void;
  resultEmpty: boolean;
  filterCount: number;
  activeFilter: boolean;
  onClickFilter: () => void;
  onClickDelete: () => void;

  myTrainingService?: MyTrainingService;
}

function LineHeaderContainerV2(props: Props) {
  const { contentType, resultEmpty, filterCount, activeFilter, onClickFilter, onClickDelete, myTrainingService } = props;
  const { viewType, onChangeViewType } = props;


  /* lifeCycles */


  // tab 변경 시, render 를 다시 함.
  /* useEffect(() => {
  }, [tabRef.current]); */

  /* functions */
  /* const convertToContentType = (target: string): MyLearningContentType => {
    return MyLearningContentType[target as MyLearningContentType];
  } */

  /* event handlers */

  // 선택된 row 의 id 를 통해 학습중 -> 학습중 x 상태로 전환 및 UI 상 전환
  /*
    myTrainingService => id를 가지고 filter를 통해 ui state 상에서 없도록 한다.
  */

  // MyTrainingService 의 MyTraining 을 엑셀로 변환
  const onDownloadExcel = async () => {
    const myTrainingV2s = await myTrainingService!.findAllMyTrainingsV2ForExcel();
    const lastIndex = myTrainingV2s.length;
    // MyTrainingService 의 MyTrainingViewModel 을 조회해 엑셀로 변환
    if (contentType === MyLearningContentType.InProgress) {

      const inProgressXlsxList = myTrainingV2s.map(
        (myTrainingV2s, index) =>
          myTrainingV2s.toXlsxForInProgress(lastIndex - index)
      );

      writeExcelFile(inProgressXlsxList, 'Learning_InProgress');

      return;
    }

    if (contentType === MyLearningContentType.Completed) {
      const completedXlsxList = myTrainingV2s.map(
        (myTrainingV2s, index) =>
          myTrainingV2s.toXlsxForCompleted(lastIndex - index)
      );

      writeExcelFile(completedXlsxList, 'Learning_Completed');
    }
  };




  /* render functions on condition */

  /*
    Filter 는 개인 학습완료 탭을 제외하고 모든 탭에 있음.
    Filter 를 통해 조회를 하면, 해당 탭의 store 데이터는 초기화 되고 첫 페이지를 다시 조회함.
    
    <Filter 에 의해 선택되는 조건 타입>
      1. college - collegeService
      2. cubeType - cube (enum)
      3. defficultyLevel - myTraining (enum)
      4. 교육기관 - 
      5. 핵인싸 
  */
  return (
    <>
      <div className="top-guide-title">
        {!resultEmpty && (
          <ListLeftTopPanel
            contentType={contentType}
            onClickDelete={onClickDelete}
            onDownloadExcel={onDownloadExcel}
          />
        )}
        <ListRightTopPanel
          contentType={contentType}
          resultEmpty={resultEmpty}
          filterCount={filterCount}
          activeFilter={activeFilter}
          onClickFilter={onClickFilter}
          checkedViewType={viewType}
          onChangeViewType={onChangeViewType}
        />
      </div>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(withRouter(observer(LineHeaderContainerV2)));



/* functions */
const writeExcelFile = (xlsxs: InProgressXlsxModel[] | CompletedXlsxModel[], filename: string) => {
  const excel = XLSX.utils.json_to_sheet(xlsxs);
  const temp = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(temp, excel, filename);
  XLSX.writeFile(temp, `${filename}.xlsx`);
};