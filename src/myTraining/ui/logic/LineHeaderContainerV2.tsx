import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import XLSX from 'xlsx';
import { InProgressXlsxModel } from 'myTraining/model/InProgressXlsxModel';
import { CompletedXlsxModel } from 'myTraining/model/CompletedXlsxModel';
import { MyStampXlsxModel } from 'myTraining/model/MyStampXlsxModel';
import {
  ListLeftTopPanel,
  ListRightTopPanel,
  ListTopPanelTemplate,
} from '../view/panel';
import { MyTrainingService } from '../../stores';
import { MyTrainingTableViewModel } from 'myTraining/model';
import { MyPageContentType } from '../model/MyPageContentType';
import { MyLearningContentType } from '../model/MyLearningContentType';
import { MyContentType } from '../model/MyContentType';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';
import MyStampService from '../../present/logic/MyStampService';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';

interface Props extends RouteComponentProps {
  contentType: MyContentType;
  resultEmpty: boolean;
  totalCount: number;
  onClickDelete?: () => void;
  myTrainingService?: MyTrainingService;
  myStampService?: MyStampService;
  filterBoxService?: FilterBoxService;
}

function LineHeaderContainerV2({
  contentType,
  resultEmpty,
  totalCount,
  onClickDelete,
  myTrainingService,
  myStampService,
  filterBoxService,
}: Props) {
  
  const { openFilter, setOpenFilter, filterCount } = filterBoxService!;

  
  const isFilterActive = (): boolean => {
    return openFilter || filterCount > 0;
  };

  const onClickFilter = () => {
    setOpenFilter(!openFilter);
  };

  const getModelsForExcel = async (contentType: MyContentType) => {
    if (contentType === MyPageContentType.EarnedStampList) {
      return myStampService!.findAllMyStampsForExcel();
    } else {
      return myTrainingService!.findAllTableViewsForExcel();
    }
  };


  /*  const getAllCount = (contentType: MyContentType) => {
     const { inprogressCount, completedCount } = myTrainingService!;
     switch (contentType) {
       case MyLearningContentType.InProgress:
         return inprogressCount;
       case MyLearningContentType.Completed:
         return completedCount;
       default:
         return 0;
     }
   }; */

  /* handlers */
  const downloadExcel = useCallback(async (contentType: MyContentType) => {
    const myTrainingTableViews: MyTrainingTableViewModel[] = await getModelsForExcel(
      contentType
    );
    const lastIndex = myTrainingTableViews.length;
    let xlsxList: MyXlsxList = [];
    let filename: MyXlsxFilename = MyXlsxFilename.None;

    switch (contentType) {
      case MyLearningContentType.InProgress:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => {
          const collegeName = getCollgeName(myTrainingTableView.category.college.id);
          return myTrainingTableView.toXlsxForInProgress(lastIndex - index, collegeName);
        });

        filename = MyXlsxFilename.InProgress;
        break;
      case MyLearningContentType.Completed:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => {
          const collegeName = getCollgeName(myTrainingTableView.category.college.id);
          return myTrainingTableView.toXlsxForCompleted(lastIndex - index, collegeName);
        });

        filename = MyXlsxFilename.Completed;
        break;
      case MyPageContentType.EarnedStampList:
        xlsxList = myTrainingTableViews.map((myTrainingTableView, index) => {
          const collegeName = getCollgeName(myTrainingTableView.category.college.id);
          return myTrainingTableView.toXlsxForMyStamp(lastIndex - index, collegeName);
        });

        filename = MyXlsxFilename.EarnedStampList;
        break;
    }

    writeExcelFile(xlsxList, filename);
  }, []);

  /* render */
  return (
    <>
      <div className="top-guide-title">
        {!resultEmpty && totalCount > 0 && (
          <ListTopPanelTemplate
            className="left-wrap"
            contentType={contentType}
            activeFilter={isFilterActive()}
          >
            <ListLeftTopPanel
              contentType={contentType}
              totalCount={totalCount}
              onClickDelete={onClickDelete}
              downloadExcel={downloadExcel}
            />
          </ListTopPanelTemplate>
        )}
        <ListTopPanelTemplate
          className="right-wrap"
          contentType={contentType}
          activeFilter={isFilterActive()}
        >
          <ListRightTopPanel
            contentType={contentType}
            resultEmpty={resultEmpty}
            filterCount={filterCount}
            openFilter={openFilter}
            activeFilter={isFilterActive()}
            onClickFilter={onClickFilter}
          />
        </ListTopPanelTemplate>
      </div>
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'myTraining.myTrainingService', 'myTraining.myStampService', 'shared.filterBoxService')
)(withRouter(observer(LineHeaderContainerV2)));

/* globals */
const writeExcelFile = (xlsxList: MyXlsxList, filename: MyXlsxFilename) => {
  const excel = XLSX.utils.json_to_sheet(xlsxList);
  const temp = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(temp, excel, filename);
  XLSX.writeFile(temp, `${filename}.xlsx`);
};

/* types */
export type MyXlsxList =
  | InProgressXlsxModel[]
  | CompletedXlsxModel[]
  | MyStampXlsxModel[];

enum MyXlsxFilename {
  InProgress = 'Learning_InProgress',
  Completed = 'Learning_Completed',
  EarnedStampList = 'MyPage_MyStamp',
  None = '',
}
