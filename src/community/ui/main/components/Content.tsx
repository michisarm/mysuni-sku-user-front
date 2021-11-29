import React, { useState, useEffect } from 'react';
import { findPostViewWithRead } from '../../data/community/apis/postviewsApi';

interface Props {
  postId: string;
}

export function Content(props: Props) {
  const { postId } = props;
  const [detail, setDetail] = useState<string>();

  useEffect(() => {
    findPostViewWithRead(postId).then(post => {
      if (post !== undefined) {
        setDetail(post.html);
      }
    });
  }, [postId]);

  if (detail === undefined) {
    return null;
  }

  return (
    <div className="ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: detail }}
        style={{ marginTop: '0.5rem', minHeight: '1.5rem' }}
      />
    </div>
  );
}
