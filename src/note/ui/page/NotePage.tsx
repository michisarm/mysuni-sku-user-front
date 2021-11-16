import React from 'react';
import NoteContainer from '../logic/NoteContainer';
import { Area } from 'tracker/model';

interface NotePageProps {
  noteCount: number;
  dataArea?: Area;
}

const NotePage: React.FC<NotePageProps> = function NotePage({ noteCount, dataArea }) {
  // console.log(noteCount);

  return (
    <>
      <div className="mypage_contents profile-badge-contents" data-area={dataArea}>
        <strong className="mypage_title">Note</strong>
        <div className="ui segment full note-tab-area">
          <NoteContainer noteCount={noteCount} />
        </div>
      </div>
    </>
  );
};
export default NotePage;
