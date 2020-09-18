import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { Checkbox, Table } from 'semantic-ui-react';
import moment from 'moment';
import routePaths from 'lecture/routePaths';
import { MyTrainingService } from 'myTraining/stores';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';
import { InMyLectureModel } from 'myTraining/model';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { MyLearningContentType } from '../../model';

interface Props extends RouteComponentProps {
  contentType: MyLearningContentType;
  totalCount: number;
  models: MyTrainingModelV2[];
  myTrainingService?: MyTrainingService;
}

/*
  contentType 에 따라, table body의 데이터가 달라짐.
*/
function MyLearningTableBody(props: Props) {

  const { contentType, models, totalCount, myTrainingService, history } = props;
  const { myTrainingV2s } = myTrainingService!;
  const [lastIndex, setLastIndex] = useState<number>(totalCount);
  const { selectedIds } = myTrainingService!;

  /* useEffect(() => {
    setLastIndex(totalCount);
  }, [totalCount]); */

  /* event handlers */
  /*
    학습하기 버튼 클릭 시, 해당 강좌 상세페이지로 전환됨.
  */
  const onClickLearn = (model: MyTrainingModelV2) => {
    const { category: { college }, coursePlanId, serviceId, serviceType, cubeId } = model;
    const { id: collegeId } = college;
    const cineroomId = patronInfo.getCineroomId() || '';

    // cineroomId, collegeId, cubeId, 'lectureCardId as serviceId'   
    if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(cineroomId, collegeId, cubeId, serviceId));
    } else {
      // cineroomId, collegeId, coursePlanId, serviceType, serviceId
      history.push(routePaths.courseOverview(cineroomId, collegeId, coursePlanId, serviceType, serviceId));
    }
  };

  const onCheckOne = (id: string) => {
    selectedIds.push(id);
  };

  /* render functions */

  /*
    ContentType 에 관계없이 공통으로 보여지는 항목들.
      1. No
      2. College
      3. 과정명
      4. 학습유형
      5. Level
  */
  const renderWithBaseContent = (model: MyTrainingModelV2, index: number) => {
    return (
      <>
        <Table.Cell>
          {lastIndex - index} {/* No */}
        </Table.Cell>
        <Table.Cell>
          {model.category.college.name} {/* College */}
        </Table.Cell>
        <Table.Cell>
          {model.name} {/* 과정명 */}
        </Table.Cell>
        <Table.Cell>
          {model.serviceType === 'CARD' ? model.cubeType : 'Course'} {/* 학습유형 */}
        </Table.Cell>
        <Table.Cell>
          {model.difficultyLevel || '-'} {/* Level */}
        </Table.Cell>
      </>
    );
  };

  /*
    ContentType 에 따라 달라지는 항목들.
  */
  const renderByContentType = (model: MyTrainingModelV2, contentType: MyLearningContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return (
          <>
            <Table.Cell>
              {/* 진행률 */}
              {'-'}
            </Table.Cell>
            <Table.Cell>
              {model.learningTimeWithFormat}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {
                formatTime(model.startDate)
              }{/* 학습시작일 */}
            </Table.Cell>
          </>
        );

      case MyLearningContentType.InMyList:
      case MyLearningContentType.Required:
        return (
          <>
            <Table.Cell>
              {model.learningTimeWithFormat}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatTime(model.createDate)}{/* 등록일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Enrolled:
        return (
          <>
            <Table.Cell>
              {model.learningTimeWithFormat}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatTime(model.startDate)}{/* 학습시작일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Completed:
        return (
          <>
            <Table.Cell>
              {model.learningTimeWithFormat}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {formatTime(model.endDate)}{/* 학습완료일 */}
            </Table.Cell>
          </>
        );
      case MyLearningContentType.Retry:
        return (
          <>
            <Table.Cell>
              {model.learningTimeWithFormat}{/* 학습시간 */}
            </Table.Cell>
            <Table.Cell>
              {model.stampCount}{/* 스탬프 */}
            </Table.Cell>
            <Table.Cell>
              {formatTime(model.retryDate)}{/* 취소/미이수일 */}
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
        models.map((model, index) => (
          <Table.Row key={`learning-${index}`}>
            {contentType === MyLearningContentType.InProgress && (
              <Table.Cell>
                <Checkbox>
                  value={model.id}
                  checked={selectedIds.includes(model.id)}
                  onChange={() => onCheckOne(model.id)}
                </Checkbox>
              </Table.Cell>
            )
            }
            {renderWithBaseContent(model, index)}
            {renderByContentType(model, contentType)}
            <Table.Cell>
              <span className="btn-blue" onClick={() => onClickLearn(model)}>학습하기</span>
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

const formatTime = (time: number) => {
  return moment(Number(time)).format('YYYY.MM.DD');
};