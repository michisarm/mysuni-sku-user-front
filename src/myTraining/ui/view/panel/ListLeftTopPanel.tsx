import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import MyLearningButtons from '../MyLearningButtons';
import { MyLearningContentType } from '../../../../myTraining/ui/model';
import { MyTrainingService } from '../../../../myTraining/stores';


interface Props {
  contentType: MyLearningContentType;
  countMessage?: string;
  onClickDelete: () => void;
  onDownloadExcel: () => void;
  myTrainingService?: MyTrainingService;
}

/*
  조건이 적어서,
  switch/case 문을 if 문으로 변경해도 괜찮을 듯 함.
*/
function ListLeftTopPanel(props: Props) {
  const {
    contentType,
    countMessage,
    onClickDelete,
    onDownloadExcel,
    myTrainingService,
  } = props;
  const { myTrainingV2Count } = myTrainingService!;

  /*
    contentType에 따라, 버튼 (Delete, 엑셀 다운로드) 을 랜더링 함.
      1. 학습중
      2. mySUNI 학습완료
  */
  const renderButtons = () => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed:
        return (
          <MyLearningButtons
            contentType={contentType}
            onDelete={onClickDelete}
            onDownloadExcel={onDownloadExcel}
          />
        );
      default:
        return null;
    }
  };

  /*
    contentType이 개인학습 완료일 경우, 아래와 같이 메세지 변경.
      1. countMessage => 승인완료
      2. 총 => 전체 
  */
  const renderMessage = () => {
    switch (contentType) {
      case MyLearningContentType.PersonalCompleted:
        return (
          <div className="list-number">
            전체 <strong>{myTrainingV2Count || 0}개</strong> 승인 완료
          </div>
        );
      default:
        return (
          <div className="list-number">
            총 <strong>{myTrainingV2Count || 0}개</strong>{' '}
            {countMessage ? countMessage : '의 리스트가 있습니다.'}
          </div>
        );
    }
  };

  return (
    <div className="left-wrap">
      {renderButtons()}
      {renderMessage()}
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(observer(ListLeftTopPanel));
