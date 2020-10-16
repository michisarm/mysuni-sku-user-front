import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Checkbox, Table } from 'semantic-ui-react';
import moment from 'moment';
import routePaths from 'lecture/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';
import InMyLectureModelV2 from 'myTraining/model/InMyLectureModelV2';
import { MyLearningContentType, MyPageContentType } from '../../model';


interface Props extends RouteComponentProps {
  contentType: MyLearningContentType | MyPageContentType;
  totalCount: number;
  models: (MyTrainingModelV2 | InMyLectureModelV2)[];
  myTrainingService?: MyTrainingService;
}

/* by 김동구

  contentType 에 따라, 테이블 리스트 데이터가 변경됨.
*/
function MyLearningTableBody(props: Props) {

  const { contentType, models, totalCount, myTrainingService, history } = props;
  const { selectedIds, selectOne, clearOne } = myTrainingService!;

  /* handlers */
  const onClickLearn = (model: MyTrainingModelV2 | InMyLectureModelV2) => {
    // 학습하기 버튼 클릭 시, 해당 강좌 상세 페이지로 이동함.
    const { category: { college }, serviceId, serviceType, coursePlanId, cubeId } = model;
    const { id: collegeId } = college;
    const cineroomId = patronInfo.getCineroomId() || '';

    // Card
    if (model.isCardType()) {
      history.push(routePaths.lectureCardOverview(cineroomId, collegeId, cubeId, serviceId));
    }
    // Program 또는 Course
    else {
      history.push(routePaths.courseOverview(cineroomId, collegeId, coursePlanId, serviceType, serviceId));
    }
  };

  const onCheckOne = (e: any, data: any) => {
    // 이미 선택되어 있는 경우, 해제함.
    if (selectedIds.includes(data.value)) {
      clearOne(data.value);
      return;
    }

    selectOne(data.value);
  };


  /* render functions */
  const renderWithBaseContent = (model: MyTrainingModelV2 | InMyLectureModelV2, index: number) => {
    /*
      ContentType 에 상관없이 공통으로 보여지는 컬럼들.
        1. No
        2. College
        3. 과정명
        4. 학습유형
        5. Level
    */
    return (
      <>
        <Table.Cell>
          {totalCount - index} {/* No */}
        </Table.Cell>
        <Table.Cell>
          {model.category.college.name} {/* College */}
        </Table.Cell>
        <Table.Cell className="title">
          <a href="#" onClick={() => onClickLearn(model)}><span className="ellipsis">{model.name} {/* 과정명 */}</span></a>
        </Table.Cell>
      </>
    );
  };


  const renderByContentType = (model: MyTrainingModelV2 | InMyLectureModelV2, contentType: MyLearningContentType | MyPageContentType) => {
    /*
      ContentType 에 따라 달라지는 컬럼들.
    */
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {'-'}  {/* 진행률 */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.startDate)}{/* 학습시작일 */}
            </Table.Cell>
          </>
        );

      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCountForDisplay}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.createDate)}{/* 등록일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Enrolled:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCountForDisplay}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.startDate)}{/* 학습시작일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Completed:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)}{/* 학습완료일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Retry:
        return (
          <>
            <Table.Cell>
              {model.isCardType() ? model.displayCubeType : 'Course'} {/* 학습유형 */}
            </Table.Cell>
            <Table.Cell>
              {model.difficultyLevel || '-'} {/* Level */}
            </Table.Cell>
            <Table.Cell>
              {model.formattedLearningTime}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCountForDisplay}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)}{/* 취소/미이수일 */}
            </Table.Cell>
          </>
        );
      case MyPageContentType.EarnedStampList:
        return (
          <>
            <Table.Cell>
              {model.stampCountForDisplay} {/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatDate(model.endDate)} {/* 획득일자 */}
            </Table.Cell>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Table.Body>
      {contentType === MyLearningContentType.PersonalCompleted ||
        models &&
        models.length &&
        models.map((model: MyTrainingModelV2 | InMyLectureModelV2, index: number) => (
          <Table.Row key={`learning-body-${index}`}>
            {contentType === MyLearningContentType.InProgress && (
              <Table.Cell>
                <Checkbox
                  value={model.id}
                  checked={selectedIds.includes(model.id)}
                  onChange={onCheckOne}
                />
              </Table.Cell>
            )
            }
            {renderWithBaseContent(model, index)}
            {renderByContentType(model, contentType)}
            <Table.Cell>
              <a className="btn-blue" href="#" onClick={() => onClickLearn(model)}>학습하기</a>
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  );

}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(withRouter(observer(MyLearningTableBody)));

/* globals */
const formatDate = (time: number) => {
  return moment(Number(time)).format('YYYY.MM.DD');
};
