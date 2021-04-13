import React from 'react';

interface Props {
  name?: string;
  description?: string;
}

function LectureChapterTitleView({ name, description }: Props) {
  return (
    <>
      <div className="course-info-header">
        <div className="contents-header">
          <div className="title-area">
            <div className="header v2">Chapter1. AI UX 기초 Essentials</div>
          </div>
        </div>
      </div>
      <div className="course-info-explain">
        <div className="syllabus-contents-wrap">
          <div className="contents-belt">
            <img src="/images/all/icon-syllabus-22-px.png" />
            Syllabus
          </div>
          <div className="contents-text">
            <p>
              Deep Change의 시작점으로서 이해관계자를 더 잘 이해하기 위한 측정
              역량을 개발하기 위해 제공되는 강의입니다.
              <br />
              고객측정의 방향, 주요 지표에 대한 개념 이해와 활용 목적에 대해
              이해할 수 있습니다. 추상적 수준의 고객 가치를 계량화하여, 기업의
              다양한 활동을 통해 창출되는 비계량적 성과들을 효율적으로
              평가/보완하는 방법을 이해합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LectureChapterTitleView;
