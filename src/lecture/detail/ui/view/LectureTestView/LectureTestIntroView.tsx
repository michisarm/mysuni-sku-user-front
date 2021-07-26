import React from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { Action, ActionType, Area } from 'tracker/model';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

interface LectureTestIntroViewProps {
  testItem: LectureTestItem;
  openView: (view: string) => void;
  params: LectureParams;
  trials?: number;
}

const LectureTestIntroView: React.FC<LectureTestIntroViewProps> =
  function LectureTestIntroView({ testItem, openView, params, trials }) {
    const lectureStructureItem = getActiveStructureItem(params.pathname);
    return (
      <>
        {testItem && (
          <>
            <div className="ui segment full test-complete">
              <div className="course-info-header" data-area={Area.CUBE_HEADER}>
                <div className="survey-header">
                  <div className="survey-header-left test_ing">
                    <i className="icon testHeader">
                      <span className="blind">ai</span>
                    </i>
                    Test Information
                  </div>
                </div>
              </div>
              <div className="course-info-ing">
                <h1>{lectureStructureItem?.name}</h1>
                <h2>{testItem.description}</h2>
                <h3>문항개수</h3>
                <p>
                  총 <strong>{testItem.questionCount}문항</strong>
                </p>
                <h3>응시횟수</h3>
                <p>{trials || 0}회</p>
                <h3>이수조건</h3>
                <p>
                  합격점 <strong>{testItem.successPoint}점</strong>
                  <span>/</span>
                  총점 <strong>{testItem.totalPoint}점</strong>
                </p>
              </div>
            </div>
            <div className="course-info-bottom">
              {(testItem.applyLimit && (
                <h2 style={{ marginBottom: '2.5rem' }}>
                  Test PASS 조건에 도달하지 못하여 <br /> {testItem.applyLimit}
                  회 이상 재응시 할 경우 다음날 Test 응시가 가능합니다.
                </h2>
              )) ||
                ''}
              <p>
                Test 정보를 확인했으면, <strong>응시하기</strong> 버튼을 통해
                Test에 응시해보세요!
                <br />
                Test를 재응시 할 경우 문항이 랜덤 출제됩니다.
              </p>
              <button
                className="ui button fix bg"
                onClick={() => openView('test')}
                data-area={Area.CUBE_CONTENT}
                data-action={Action.CLICK}
                data-action-type={ActionType.STUDY}
                data-action-name="응시하기 클릭"
              >
                응시하기
              </button>
            </div>
          </>
        )}
      </>
    );
  };

export default LectureTestIntroView;
