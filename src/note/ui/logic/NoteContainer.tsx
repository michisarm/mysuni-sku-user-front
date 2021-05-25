import React, { useEffect, useState } from 'react';
import NoteHeaderView from '../view/NoteHeaderView';
import NoteListView from '../view/NoteListView';
import { requestCubeList, requestColleges, requestNoteCount } from '../../service/useNote/requestNote';
import { getEmptySearchBox } from '../../model/SearchBox';
import { useNoteList } from '../../store/NoteListStore';
import { useSearchBox } from '../../store/SearchBoxStore';
import { useFolder } from '../../store/FolderStore';
import { requestFolder } from '../../service/useFolder/requestFolder';
import CollegeApi from '../../../college/present/apiclient/CollegeApi';
import { useNoteCount } from '../../store/NoteCountStore';

interface NoteContainerProps {
  noteCount: number;
}
const NoteContainer: React.FC<NoteContainerProps> = function NoteContainer({ noteCount }) {
  // const { communityId } = useParams<Params>();
  // const communityHome = useCommunityHomeCreateItem()||getEmptyCommunityHomeCreateItem(communityId);
  const noteList = useNoteList();
  const folder = useFolder();
  const searchBox = useSearchBox() || getEmptySearchBox();
  const colleges = requestColleges();
  // const [noteCount, setNoteCount] = useState<number>(0);
  useEffect(() => {
    requestCubeList();
    requestFolder();
    requestNoteCount();
    // findAllColleges()
  }, []);

  return (
    <>
      {/* {communityHome !== undefined && (
        <NoteView />
      )} */}
      {colleges !== undefined && (
        <NoteHeaderView searchBox={searchBox} colleges={colleges} noteCount={noteCount} folder={folder} />
      )}
      {noteList !== undefined && (
        <NoteListView noteList={noteList} searchBox={searchBox} folder={folder} colleges={colleges} search={requestCubeList} />
      )}
    </>
  );
};

export default NoteContainer;
