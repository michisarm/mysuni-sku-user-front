import { deleteNote } from '../../api/noteApi';

export async function deleteNoteById(id: string) {
  return deleteNote(id);
  // const deleteItem = await deleteNote(id);
  // return deleteItem;
}
