import { axiosApi, OffsetElementList } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import NoteCdo from '../model/NoteCdo';
import Note from '../model/Note';
import { SearchBox } from '../model/SearchBox';
import NoteUdo from '../model/NoteUdo';
import Folder from '../model/Folder';
import { CollegeModel } from '../../college/model/CollegeModel';
import NoteWithLecture from '../model/NoteWithLecture';

//TODO : card, cube read model 추가, folder 버전 갱신 후 테스트 필요함

// const BASE_URL = '/api/mytraining/note';
const BASE_URL = '/api/learning/notes';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === undefined ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}

// 노트 생성
export function registerNote(noteCdo: NoteCdo): Promise<string> {
  return axiosApi
    .post<string>(BASE_URL, noteCdo)
    .then((response) => response && response.data);
}

// 노트 단건조회
export function findNoteById(id: string): Promise<NoteWithLecture | undefined> {
  const url = `${BASE_URL}/${id}`;
  return axiosApi.get<NoteWithLecture>(url).then(AxiosReturn);
}

// 노트 전체 카운트 조회
export function findNoteCount(
  searchBox?: SearchBox
): Promise<number | undefined> {
  let url = `${BASE_URL}/allNoteCnt`;
  if (searchBox) {
    // url = `${BASE_URL}/allNoteCnt?limit=${searchBox.limit}&offset=${searchBox.offset}&content=${searchBox.content}&name=${searchBox.cubeName}&createStartDate=${searchBox.startDate}&createEndDate=${searchBox.endDate}&channelId=${searchBox.channelId}&collegeId=${searchBox.collegeId}`;
    url = `${BASE_URL}/allNoteCnt?limit=${searchBox.limit}&offset=${searchBox.offset}&content=${searchBox.content}&name=${searchBox.cubeName}&createStartDate=${searchBox.startDate}&createEndDate=${searchBox.endDate}&collegeId=${searchBox.collegeId}`;
  }
  return axiosApi.get<number>(url).then(AxiosReturn);
}

// 폴더별 노트 전체 카운트 조회
export function findNoteCountByFolderId(
  folderId?: string
): Promise<number | undefined> {
  const url = `${BASE_URL}/allFolderNoteCnt/folderId`;
  return axiosApi
    .get<number>(url, { params: { folderId: folderId || null } })
    .then(AxiosReturn);
}

// 노트 큐브 리스트 조회
export function findCubeList(
  searchBox: SearchBox
): Promise<OffsetElementList<Note> | undefined> {
  // const url = `${BASE_URL}/list/card/cube?limit=${searchBox.limit}&offset=${searchBox.offset}&content=${searchBox.content}&name=${searchBox.name}&createStartDate=${searchBox.createStartDate}&createEndDate=${searchBox.createEndDate}&channelId=${searchBox.channelId}&collegeId=${searchBox.collegeId}`;

  return axiosApi
    .get<OffsetElementList<Note>>(BASE_URL, {
      params: {
        limit: searchBox.limit,
        offset: searchBox.offset,
        content: searchBox.content,
        cubeName: searchBox.cubeName,
        startDate: searchBox.startDate,
        endDate: searchBox.endDate,
        collegeId: searchBox.collegeId,
      },
    })
    .then(AxiosReturn);
}

// 노트 리스트 조회
// export function findNoteList(
//   searchBox: SearchBox
//   // cardId: string,
//   // cubeId: string,
//   // limit: string,
//   // offset: string,
// ): Promise<OffsetElementList<NoteWithLecture> | undefined> {
//   // let url = `${BASE_URL}/list/${searchBox.cardId}/${searchBox.cubeId}/?limit=${searchBox.limit}&offset=${searchBox.offset}&content=${searchBox.content}&name=${searchBox.cubeName}&createStartDate=${searchBox.startDate}&createEndDate=${searchBox.endDate}&channelId=${searchBox.channelId}&collegeId=${searchBox.collegeId}`;
//   let url = `${BASE_URL}/list/${searchBox.cardId}/${searchBox.cubeId}/?limit=${searchBox.limit}&offset=${searchBox.offset}&content=${searchBox.content}&name=${searchBox.cubeName}&createStartDate=${searchBox.startDate}&createEndDate=${searchBox.endDate}&collegeId=${searchBox.collegeId}`;
//   if (!searchBox.startDate) {
//     url = `${BASE_URL}/list/${searchBox.cardId}/${searchBox.cubeId}/?limit=${searchBox.limit}&offset=${searchBox.offset}`;
//   }
//
//   return axiosApi
//     .get<OffsetElementList<NoteWithLecture>>(url)
//     .then(AxiosReturn);
// }

// 폴더별 노트보기
export function findNoteListByFolderId(
  searchBox: SearchBox
): Promise<OffsetElementList<Note> | undefined> {
  // const url = `${BASE_URL}/list/${searchBox.folderId}?limit=${searchBox.limit}&offset=${searchBox.offset}`;
  const url = `${BASE_URL}/findNotesByFolderQdo`;
  return axiosApi
    .get<OffsetElementList<Note>>(url, {
      params: {
        offset: searchBox.offset,
        limit: searchBox.limit,
        folderId: searchBox.folderId || null,
      },
    })
    .then(AxiosReturn);
}

// GET http://ma.mysuni.sk.com/api/mytraining/note/excelDownload
// 노트 엑셀 리스트 조회
export function findNoteExcelList(): Promise<
  OffsetElementList<NoteWithLecture> | undefined
> {
  const url = `${BASE_URL}/excelDownload`;
  return axiosApi
    .get<OffsetElementList<NoteWithLecture>>(url)
    .then(AxiosReturn);
}

// 노트 내용수정
export function modifyNote(id: string, noteUdo: NoteUdo): Promise<void> {
  const url = `${BASE_URL}/noteContents/${id}`;
  return axiosApi
    .put<void>(url, noteUdo)
    .then((response) => response && response.data);
}

// 노트 - 소속 폴더 등록
export function modifyFolderId(
  noteId: string,
  folderId: string
): Promise<string> {
  const url = `${BASE_URL}/${noteId}/folderId?${
    folderId !== '0000' && 'folderId=' + folderId
  }`;
  return (
    axiosApi
      // .put<string>(url, folderId === '0000' ? null : folderId)
      .put<string>(url)
      .then((response) => response && response.data)
  );
}

// 노트 삭제
export function deleteNote(id: string): Promise<void> {
  const url = `${BASE_URL}/noteContents/${id}`;
  return axiosApi.delete(url).then((response) => response && response.data);
}

// 폴더
// 폴더 생성
export function registerFolder(folder: Folder): Promise<string> {
  const url = `${BASE_URL}/folders`;
  return axiosApi
    .post<string>(url, folder)
    .then((response) => response && response.data);
}

// 폴더 조회
export function findFolders(): Promise<Folder | undefined> {
  const url = `${BASE_URL}/findNoteFolders`;
  return axiosApi.get<Folder>(url).then(AxiosReturn);
}

// 폴더 수정
export function modifyFolder(folder: Folder): Promise<string> {
  const url = `${BASE_URL}/folders`;
  return axiosApi
    .put<string>(url, folder)
    .then((response) => response && response.data);
}

// 폴더 삭제
export function deleteFolder(folderId: string): Promise<void> {
  const url = `${BASE_URL}/folder/${folderId}`;
  return axiosApi.delete(url).then((response) => response && response.data);
}

//TODO : API 위치 조정 확인
export function findAllCollege() {
  return axiosApi
    .get<CollegeModel[]>('/api/college/colleges/available')
    .then((response) => response.data);
}
