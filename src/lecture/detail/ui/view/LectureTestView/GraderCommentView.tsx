import React from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface GraderCommentViewProps {
  graderComment: string;
}

export function GraderCommentView({
  graderComment,
}: GraderCommentViewProps) {

  return (
    <div className="course-radio-survey">
      <h5>
        <PolyglotText defaultString="결과 코멘트" id="Test-TestPaper-결과" />
      </h5>
      <div className="ui editor-wrap">
        <div className="content-area">
          <div className="content-inner ql-snow">
            <div
              className="ql-editor text"
              dangerouslySetInnerHTML={{
                __html: graderComment || '',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}