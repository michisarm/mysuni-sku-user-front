import React from 'react';
import NoteContainer from '../logic/NoteContainer';

interface NotePageProps {
  noteCount: number;
}

const NotePage: React.FC<NotePageProps> = function NotePage({ noteCount }) {
  return (
    <>
      <div className="mypage_contents profile-badge-contents">
        <strong className="mypage_title">Note</strong>
        <div className="ui segment full note-tab-area">
          <NoteContainer noteCount={noteCount} />
        </div>
      </div>
    </>
  );
};
export default NotePage;
