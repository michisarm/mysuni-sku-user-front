import React, { useEffect } from 'react';
import NoteHeaderView from '../view/NoteHeaderView';
import NoteListView from '../view/NoteListView';
import {
  requestCubeList,
  requestColleges,
  requestNoteCount,
} from '../../service/useNote/requestNote';
import { getEmptySearchBox } from '../../model/SearchBox';
import { useSearchBox, setSearchBox } from '../../store/SearchBoxStore';
import { useFolder } from '../../store/FolderStore';
import { requestFolder } from '../../service/useFolder/requestFolder';
import { useColleges } from '../../store/CollegesStore';
import { useNoteList } from '../../store/NoteListStore';

interface NoteContainerProps {
  noteCount: number;
}
const NoteContainer: React.FC<NoteContainerProps> = function NoteContainer({
  noteCount,
}) {
  const noteList = useNoteList() || {
    empty: true,
    results: [],
    totalCount: 0,
  };
  const folder = useFolder();
  const searchBox = useSearchBox() || getEmptySearchBox();
  const colleges = useColleges() || [];
  useEffect(() => {
    setSearchBox({ ...searchBox, offset: 0 });
    requestCubeList();
    requestFolder();
    requestNoteCount();
    requestColleges();
  }, []);

  return (
    <>
      {/*{noteList !== undefined &&*/}
      {/*  colleges !== undefined &&*/}
      {/*  colleges !== undefined && (*/}
      <NoteHeaderView
        noteList={noteList}
        searchBox={searchBox}
        colleges={colleges}
        noteCount={noteCount}
        folder={folder}
      />
      {/*)}*/}
      {noteList !== undefined && colleges !== undefined && (
        <NoteListView
          noteList={noteList}
          searchBox={searchBox}
          folder={folder}
          colleges={colleges}
          search={requestCubeList}
        />
      )}
    </>
  );
};

export default NoteContainer;
