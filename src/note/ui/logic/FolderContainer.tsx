import React, { useEffect, useState } from 'react';
import NoteHeaderView from '../view/NoteHeaderView';
import NoteListView from '../view/NoteListView';
import { requestCubeList, requestColleges, requestNoteCount } from '../../service/useNote/requestNote';
import { getEmptySearchBox } from '../../model/SearchBox';
import { useNoteList } from '../../store/NoteListStore';
import { useSearchBox } from '../../store/SearchBoxStore';
import { useFolder } from '../../store/FolderStore';
import { requestFolder, requestCubeListByFolderId } from '../../service/useFolder/requestFolder';
import CollegeApi from '../../../college/present/apiclient/CollegeApi';
import FolderHeaderView from '../view/FolderHeaderView';
import { useNoteCount } from '../../store/NoteCountStore';

interface FolderContainerProps {
  noteCount: number;
}
const FolderContainer: React.FC<FolderContainerProps> = function FolderContainer({ noteCount }) {
  // const { communityId } = useParams<Params>();
  // const communityHome = useCommunityHomeCreateItem()||getEmptyCommunityHomeCreateItem(communityId);
  const noteList = useNoteList();
  const folder = useFolder();
  const searchBox = useSearchBox() || getEmptySearchBox();
  const colleges = requestColleges();

  useEffect(() => {
    requestCubeListByFolderId();
    requestFolder();
    requestNoteCount();
    // findAllColleges()
  }, []);

  return (
    <>
      {/* {communityHome !== undefined && (
        <NoteView />
      )} */}

      <FolderHeaderView folder={folder} noteCount={noteCount} />

      {noteList !== undefined && (
        <NoteListView noteList={noteList} searchBox={searchBox} folder={folder} colleges={colleges} search={requestCubeListByFolderId} />
      )}
    </>
  );
};

export default FolderContainer;
