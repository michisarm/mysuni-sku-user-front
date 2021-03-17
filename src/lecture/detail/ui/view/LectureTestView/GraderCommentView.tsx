import React from 'react';

interface GraderCommentViewProps {
  graderComment: string;
}

export function GraderCommentView({
  graderComment,
}: GraderCommentViewProps) {

  return (
    <div className="course-radio-survey">
      <h5>테스트 결과 코멘트</h5>
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