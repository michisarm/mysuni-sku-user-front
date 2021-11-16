import React from 'react';
import FolderContainer from '../logic/FolderContainer';
import { Area } from 'tracker/model';

interface FolderPageProps {
  noteCount: number;
  dataArea?: Area;
}

const FolderPage: React.FC<FolderPageProps> = function FolderPage({ noteCount, dataArea }) {

  return (
    <>
      <div className="mypage_contents profile-badge-contents" data-area={dataArea}>
        <strong className="mypage_title">Note</strong>
        <div className="ui segment full note-tab-area">
          <FolderContainer noteCount={noteCount} />
        </div>
      </div>
    </>
  );
}

export default FolderPage;
