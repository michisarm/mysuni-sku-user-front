import React, { useCallback, useState } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import LectureStructureContainer from './LectureStructureContainer';

const LectureDetailContainer: React.FC = function LectureDetailContainer() {
  const [structureVisible, setStructureVisible] = useState<boolean>(true);

  const closeStructure = useCallback(() => {
    setStructureVisible(false);
  }, []);

  const openStructure = useCallback(() => {
    setStructureVisible(true);
  }, []);

  return (
    <section className={`content lms ${structureVisible ? 'v-wide' : ''}`}>
      <div className="course-info-list">
        <div className="course-header-list">
          <a className="btn-view-change">
            <Icon className="list24 icon" />
            <span>List</span>
          </a>
          <a className="btn-close" onClick={closeStructure}>
            <span>close</span>
          </a>
        </div>
        <LectureStructureContainer />
      </div>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <a className="btn-wide" onClick={openStructure}>
            <span>펼치기</span>
          </a>
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">
                {/* Header */}
                <div className="course-info-header" />

                {/* 선수과정 */}
                <div className="ov-paragraph course-area" />
                {/*sticky .lms-fixed*/}
                <div className="lms-sticky-menu lms-fixed">
                  <div className="lms-fixed-inner">
                    <a href="#lms-overview" className="lms-act">
                      Overview
                    </a>
                    <a href="#lms-instructor-Info">강사정보</a>
                    <a href="#lms-related-badge">관련 Badge</a>
                    <a href="#lms-related-process" className="lms-act">
                      관련과정
                    </a>
                    <a href="#lms-comment" className="lms-comment">
                      Comment<span className="count">+12</span>
                    </a>
                  </div>
                </div>
                <div
                  className="className-guide-txt fn-parents"
                  id="lms-overview"
                >
                  <div className="text">
                    <p>
                      「한방에 이해하는 꿀잼 반도체」 는 반도체 Tech 이해에
                      필요한 기반지식과 핵심이론을 총 3편에 걸쳐 쉽고 재밌고
                      빠르게 정리해 드립니다.
                    </p>
                    <p className="margin30">
                      1. 인류 최고의 발명품 트랜지스터
                      <br />
                      2. 반도체는 어떻게 만들어 지는가
                      <br />
                      3. 반도체 제품의 종류와 동작원리
                    </p>
                    <p>
                      - 원고 : mySUNI 반도체 College
                      <br />- 내래이터 : 과학 유튜버 공진(정현승)
                    </p>
                  </div>
                </div>

                <div className="badge-detail">{/* 관련카테고리 , 태그 */}</div>

                {/* 강사정보 */}
                <div className="badge-detail" id="lms-instructor-Info">
                  <div className="ov-paragraph" />
                </div>

                {/*관련벳지*/}
                <div className="badge-detail" id="lms-related-process">
                  <div className="ov-paragraph">
                    <div className="section-head">
                      <div className="title">
                        <h3 className="title-style">
                          <Label className="onlytext bold size24">
                            <Icon className="lms-badge" />
                            <span>{/*Tag*/}관련 Badge</span>
                          </Label>
                        </h3>
                      </div>
                    </div>
                    <div className="scrolling lms-badge-list">
                      <ul className="belt" />
                    </div>
                  </div>
                </div>

                {/* 관련과정 */}
                <div
                  className="badge-detail border-none"
                  id="lms-related-process"
                >
                  <div className="ov-paragraph">
                    <div className="section-head">
                      <div className="title">
                        <h3 className="title-style">
                          <Label className="onlytext bold size24">
                            <Icon className="before" />
                            <span>{/*Tag*/}관련과정</span>
                          </Label>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LectureDetailContainer;
