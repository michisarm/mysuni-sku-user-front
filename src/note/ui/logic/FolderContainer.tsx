import React, { useEffect } from 'react';
import NoteListView from '../view/NoteListView';
import { requestColleges } from '../../service/useNote/requestNote';
import { getEmptySearchBox } from '../../model/SearchBox';
import { useSearchBox, setSearchBox } from '../../store/SearchBoxStore';
import { useFolder } from '../../store/FolderStore';
import {
  requestFolder,
  requestCubeListByFolderId,
  requestNoteCountByFolderId,
} from '../../service/useFolder/requestFolder';
import FolderHeaderView from '../view/FolderHeaderView';
import { useColleges } from '../../store/CollegesStore';
import { useFolderNoteCount } from '../../store/FolderNoteCountStore';
import { useNoteList } from '../../store/NoteListStore';

interface FolderContainerProps {
  noteCount: number;
}
const FolderContainer: React.FC<FolderContainerProps> = function FolderContainer({
  noteCount,
}) {
  const noteList = useNoteList();
  const folder = useFolder();
  const searchBox = useSearchBox() || getEmptySearchBox();
  const colleges = useColleges();
  const folderNoteCount = useFolderNoteCount();

  useEffect(() => {
    setSearchBox({ ...searchBox, offset: 0 });
    requestCubeListByFolderId();
    requestFolder();
    requestNoteCountByFolderId();
    requestColleges();
  }, []);

  return (
    <>
      {noteList !== undefined && colleges !== undefined && (
        <FolderHeaderView
          noteList={noteList}
          folder={folder}
          noteCount={noteCount}
          folderNoteCount={folderNoteCount}
        />
      )}

      {noteList !== undefined && colleges !== undefined && (
        <NoteListView
          noteList={noteList}
          searchBox={searchBox}
          folder={folder}
          colleges={colleges}
          search={requestCubeListByFolderId}
        />
      )}
    </>
  );
};

export default FolderContainer;
