import React from 'react';
import FolderContainer from '../logic/FolderContainer';
import { Area } from 'tracker/model';

interface FolderPageProps {
  noteCount: number;
}

const FolderPage: React.FC<FolderPageProps> = function FolderPage({ noteCount }) {

  return (
    <>
      <div className="mypage_contents profile-badge-contents" data-area={Area.MYPAGE_NOTE}>
        <strong className="mypage_title">Note</strong>
        <div className="ui segment full note-tab-area">
          <FolderContainer noteCount={noteCount} />
        </div>
      </div>
    </>
  );
}

export default FolderPage;
