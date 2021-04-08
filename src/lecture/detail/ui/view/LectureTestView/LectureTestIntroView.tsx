import React from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';

interface LectureTestIntroViewProps {
  testItem: LectureTestItem;
  openView: (view: string) => void;
}

const LectureTestIntroView: React.FC<LectureTestIntroViewProps> = function LectureTestIntroView({
  testItem,
  openView,
}) {
  return (
    <>
      {testItem && (
        <>
          <div className="ui segment full test-complete">
            <div className="course-info-header">
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
              <h1>{testItem.name}</h1>
              <h2>{testItem.description}</h2>
              <h3>문항개수</h3>
              <p>
                총 <strong>{testItem.questionCount}문항</strong>
              </p>
              <h3>이수조건</h3>
              <p>
                합격점 <strong>{testItem.successPoint}점</strong>
                <span>/</span>
                총점 <strong>{testItem.totalPoint}점</strong>
              </p>
            </div>
          </div>
          <div className="course-info-bottom">
            <p>
              Test 정보를 확인했으면, <strong>응시하기</strong> 버튼을 통해
              Test에 응시해보세요!
            </p>
            <button
              className="ui button fix bg"
              onClick={() => openView('test')}
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
