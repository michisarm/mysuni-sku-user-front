import React from 'react';
import FolderContainer from '../logic/FolderContainer';


interface FolderPageProps {
  noteCount: number;
}

const FolderPage: React.FC<FolderPageProps> = function FolderPage({ noteCount }) {

  return (
    <>
      <div>
        <FolderContainer noteCount={noteCount} />
      </div>
    </>
  );
}

export default FolderPage;
