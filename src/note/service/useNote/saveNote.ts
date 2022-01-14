import { registerNote, modifyNote, modifyFolderId } from '../../api/noteApi';
import NoteCdo from '../../model/NoteCdo';
import NoteUdo from '../../model/NoteUdo';

export async function saveNote(
  noteCdo?: NoteCdo,
  id?: string,
  noteUdo?: NoteUdo
): Promise<any> {
  if (noteCdo !== undefined) {
    return registerNote(noteCdo);
  } else if (id !== undefined && noteUdo !== undefined) {
    return modifyNote(id, noteUdo);
  }
}

export async function changeFolderInNote(
  noteId: string,
  folderId: string
): Promise<any> {
  return modifyFolderId(noteId, folderId);
}

// export async function saveCommunityHome(
//   communityId: string,
//   homeId?: string
// ): Promise<any> {
//   const homeCreateItem = getCommunityHomeCreateItem();
//   if (homeCreateItem !== undefined) {
//     if (homeId === undefined) {
//       return registerHome(communityId, homeCreateItem);
//     } else if (homeId !== undefined) {
//       return modifyHome(
//         communityId,
//         homeId,
//         modifyNameValueList(homeCreateItem)
//       );
//     }
//   }
// }

// export function previewSave(communityId: string, homeId?: string) {
//   const homeCreateItem = getCommunityHomeCreateItem();
//   if (homeCreateItem !== undefined) {
//     if (homeId === undefined) {
//       return registerPreviewHome(communityId, homeCreateItem);
//     } else if (homeId !== undefined) {
//       return modifyHome(
//         communityId,
//         homeId,
//         modifyNameValueList(homeCreateItem)
//       );
//     }
//   }
// }

// function modifyNameValueList(home: CommunityHomeCreateItem): NameValueList {
//   const modifyNameValues = {
//     // title, html, pinned, visible
//     nameValues: [
//       {
//         name: 'type',
//         value: String(home.type),
//       },
//       {
//         name: 'introduce',
//         value: home.introduce || '',
//       },
//       {
//         name: 'thumbnailId',
//         value: home.thumbnailId || '',
//       },
//       {
//         name: 'color',
//         value: home.color || '',
//       },
//       {
//         name: 'html',
//         value: home.html || '',
//       },
//       {
//         name: 'draft',
//         value: String(home.draft) || '',
//       },
//     ],
//   };
//   return modifyNameValues;
// }
