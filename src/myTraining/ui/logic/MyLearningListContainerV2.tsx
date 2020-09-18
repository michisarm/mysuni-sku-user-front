import React, { useState, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import { Button, Icon } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';
import MyTrainingFilterRdoModel from 'myTraining/model/MyTrainingFilterRdoModel';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';
import LineHeaderContainerV2 from './LineHeaderContainerV2';
import { MyLearningContentType, NoSuchContentPanelMessages } from '../model';
import MultiFilterBox from '../view/filterbox/MultiFilterBox';
import MyLearningTableView from '../view/table/MyLearningTableView';
import { LectureService, SeeMoreButton } from '../../../lecture';
import { MyTrainingService } from '../../stores';
import MyLearningDeleteModal from '../view/MyLearningDeleteModal';
import { CollegeService } from '../../../college/stores';



interface Props extends RouteComponentProps {
  contentType: MyLearningContentType;
  skProfileService?: SkProfileService;
  myTrainingService?: MyTrainingService;
  lectureService?: LectureService;
}


function MyLearningListContainerV2(props: Props) {
  const { contentType, skProfileService, myTrainingService, history } = props;
  const { profileMemberName } = skProfileService!;
  const { myTrainingV2s } = myTrainingService!;

  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(true);

  const [filterCount, setFilterCount] = useState<number>(0);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  /*
    get observables!
  */

  // contentType의 변경이 없으면, 호출되지 않음.
  useEffect(() => {

    findModelByContentType(contentType);
  }, [contentType]);


  useEffect(() => {
    if (!activeFilter && filterCount > 0) {
      myTrainingService!.findllMyTrainingsV2WithConditions();
    }

  }, [activeFilter, filterCount]);

  /*  useEffect(() => {
     if (filterCount > 0) {
 
       myTrainingService!.clearAllMyTrainingV2();
       myTrainingService!.findAllMyTrainingV2sByContentType(myTrainingFilterRdo);
 
     }
   }, [filterCount]); */

  // 탭이 전환될 때 마다, 초기화된 데이터를 새롭게 불러와야 함.


  /* functions */

  const findModelByContentType = async (contentType: MyLearningContentType) => {

    if (contentType === MyLearningContentType.InMyList) {

      myTrainingService!.clearAllMyTrainingV2();
      return;
    }
    if (contentType === MyLearningContentType.Required) {

      myTrainingService!.clearAllMyTrainingV2();
      return;
    }

    myTrainingService!.clearAllMyTrainingV2();
    myTrainingService!.findAllMyTrainingV2sByContentType(contentType);

    // checkShowSeeMore();
    // model.current = myTrainingService!.myTrainingV2s;
  };

  const clearPageInfo = () => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  // MultiFilterBox 에서 filter 가 닫힐 때, 호출되는 함수.
  const onFilterCount = (count: number) => {
    setFilterCount(count);



    /* if (contentType === MyLearningContentType.InMyList) {
      return;
    }
    if (contentType === MyLearningContentType.Required) {
  
    } */

    /* myTrainingService!.clearAllMyTrainingV2();
    myTrainingService?.findAllMyTrainingsV2(myTrainingFilterRdo); */

  };

  /* event handler */



  const onClickFilter = () => {
    setActiveFilter(!activeFilter);

  };

  const onClickDelete = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onConfirmModal = () => {

    setOpenModal(false);

    //myTrainingView ids를 통해 delete 로직을 수행함.
    myTrainingService!.deleteBySelectedIds();
  };

  const checkShowSeeMore = () => {
    const { myTrainingV2s, myTrainingV2Count } = myTrainingService!;
    if (myTrainingV2s.length === myTrainingV2Count) {
      setShowSeeMore(false);
    }

    if (myTrainingV2Count <= PAGE_SIZE) {
      setShowSeeMore(false);
    }
  };

  // 버튼 클릭 시, 추가적으로 데이터를 불러옴.
  const onSeeMore = async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;


    await myTrainingService!.findAllMyTrainingsV2WithPage(pageInfo.current);
    checkShowSeeMore();
  };


  /* Render Functions */
  const renderNoSuchContentPanel = (contentType: MyLearningContentType) => {
    const message = (
      <>
        <div className="text">{NoSuchContentPanelMessages.getByContentType(contentType)}</div>
        {contentType === MyLearningContentType.InProgress &&
          (
            <Button
              icon
              as="a"
              className="right btn-blue2"
              onClick={() => history.push('/lecture/recommend')}
            >
              <span className="border">{`${profileMemberName} 님에게 추천하는 학습 과정 보기`}</span>
              <Icon className="morelink" />
            </Button>
          )
        }
      </>
    );

    return <NoSuchContentPanel message={message} />;
  };

  const renderNoSuchFilterResult = () => {
    return (
      <div className="text">필터 조건에 해당하는 결과가 없습니다.</div>
    );
  };

  return (
    <>
      {
        myTrainingV2s &&
        myTrainingV2s.length && !filterCount &&
        (
          <>
            <LineHeaderContainerV2
              contentType={contentType}
              filterCount={filterCount}
              activeFilter={activeFilter}
              onClickFilter={onClickFilter}
              onClickDelete={onClickDelete}
              onClearPage={clearPageInfo}
            />
            <MultiFilterBox
              activeFilter={activeFilter}
              onFilterCount={onFilterCount}
            />
            <MyLearningTableView
              contentType={contentType}
              models={myTrainingV2s}
              totalCount={myTrainingService!.myTrainingV2Count}
            />
            {showSeeMore &&
              (
                <SeeMoreButton
                  onClick={onSeeMore}
                />
              )
            }
            <MyLearningDeleteModal
              open={openModal}
              onClose={onCloseModal}
              onConfirm={onConfirmModal}
            />
          </>
        ) || renderNoSuchContentPanel(contentType)
      }
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myTrainingService',
  'lecture.lectureService'
))(withRouter(observer(MyLearningListContainerV2)));

// 
const PAGE_SIZE = 20;