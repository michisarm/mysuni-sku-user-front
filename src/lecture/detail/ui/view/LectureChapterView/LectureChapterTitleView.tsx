import React from 'react';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

interface Props {
  name: string | null;
  description: PolyglotString;
}

function LectureChapterTitleView({ name, description }: Props) {
  return (
    <>
      <div className="course-info-header">
        <div className="contents-header">
          <div className="title-area">
            <div className="header v2">{name}</div>
          </div>
        </div>
      </div>
      <div className="course-info-explain">
        <div className="syllabus-contents-wrap">
          <div className="contents-belt">
            <img src="/suni-main/images/all/icon-syllabus-22-px.png" />
            Syllabus
          </div>
          <div
            className="contents-text"
            dangerouslySetInnerHTML={{
              __html: parsePolyglotString(description),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LectureChapterTitleView;
