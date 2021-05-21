import React, { useEffect } from 'react';
import NoteView from '../view/NoteView';
import { requestCubeList, requestColleges } from '../../service/useNote/requestNote';
import { getEmptySearchBox } from '../../model/SearchBox';
import { useNoteList } from '../../store/NoteListStore';
import { useSearchBox } from '../../store/SearchBoxStore';
import { useFolder } from '../../store/FolderStore';
import { requestFolder } from '../../service/useFolder/requestFolder';
import CollegeApi from '../../../college/present/apiclient/CollegeApi';

// interface Params {
//   communityId: string;
// }

const NoteContainer = () => {
  // const { communityId } = useParams<Params>();
  // const communityHome = useCommunityHomeCreateItem()||getEmptyCommunityHomeCreateItem(communityId);
  const noteList = useNoteList();
  const folder = useFolder();
  const searchBox = useSearchBox() || getEmptySearchBox();
  const colleges = requestColleges();
  useEffect(() => {
    requestCubeList(getEmptySearchBox());
    requestFolder();
    // findAllColleges()
  }, []);


  return (
    <>
      {/* {communityHome !== undefined && (
        <NoteView />
      )} */}
      {noteList !== undefined && colleges !== undefined && (
        <NoteView noteList={noteList} searchBox={searchBox} folder={folder} colleges={colleges} />
      )}
    </>
  );
};

export default NoteContainer;
