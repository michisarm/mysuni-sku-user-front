import React from 'react';
import NoteContainer from '../logic/NoteContainer';


interface NotePageProps {
  noteCount: number;
}

const NotePage: React.FC<NotePageProps> = function NotePage({ noteCount }) {

  return (
    <>
      <div>
        <NoteContainer noteCount={noteCount} />
      </div>
    </>
  );
}
export default NotePage;
