import React from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { Action, ActionType, Area } from 'tracker/model';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureTestIntroViewProps {
  testItem: LectureTestItem;
  openView: (view: string) => void;
  params: LectureParams;
  trials?: number;
}

const LectureTestIntroView: React.FC<LectureTestIntroViewProps> = function LectureTestIntroView({
  testItem,
  openView,
  params,
  trials,
}) {
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
                    <span className="blind"><PolyglotText defaultString="ai" id="Test-TestIntro-ai" /></span>
                  </i>
                  <PolyglotText defaultString="Test Information" id="Test-TestIntro-Title" />
                </div>
              </div>
            </div>
            <div className="course-info-ing">
              <h1>{lectureStructureItem?.name}</h1>
              <h2>{testItem.description}</h2>
              <h3>
                <PolyglotText defaultString="문항개수" id="Test-TestIntro-문항개수" />
              </h3>
              <p dangerouslySetInnerHTML={{__html: getPolyglotText(`총 <strong>{testItem.questionCount}문항</strong>`, 'Test-TestIntro-총')}} />
              <h3>
                <PolyglotText defaultString="응시횟수" id="Test-TestIntro-응시횟수" />
              </h3>
              <p>{trials || 0}<PolyglotText defaultString="회" id="Test-TestIntro-회" /></p>
              <h3>
                <PolyglotText defaultString="이수조건" id="Test-TestIntro-이수조건" />
              </h3>
              <p>
                <PolyglotText defaultString="합격점" id="Test-TestIntro-합격점" /><strong>{testItem.successPoint}<PolyglotText defaultString="점" id="Test-TestIntro-점" /></strong>
                <span>/</span>
                <PolyglotText defaultString="총점" id="Test-TestIntro-총점" /><strong>{testItem.totalPoint}<PolyglotText defaultString="점" id="Test-TestIntro-점" /></strong>
              </p>
            </div>
          </div>
          <div className="course-info-bottom">
            {(testItem.applyLimit && (
              <h2 style={{ marginBottom: '2.5rem' }} dangerouslySetInnerHTML={{__html: getPolyglotText(`Test PASS 조건에 도달하지 못하여 <br /> {testItem.applyLimit}회 이상 재응시 할 경우 다음날 Test 응시가 가능합니다.`, 'Test-TestIntro-재응시')}} />
            )) ||
              ''}
            <p dangerouslySetInnerHTML={{__html: getPolyglotText(`Test 정보를 확인했으면, <strong>응시하기</strong> 버튼을 통해 Test에 응시해보세요!`, 'Test-TestIntro-응시정보')}} />
            <button
              className="ui button fix bg"
              onClick={() => openView('test')}
              data-area={Area.CUBE_CONTENT}
              data-action={Action.CLICK}
              data-action-type={ActionType.STUDY}
              data-action-name="응시하기 클릭"
            >
              <PolyglotText defaultString="응시하기" id="Test-TestIntro-응시하기" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LectureTestIntroView;
