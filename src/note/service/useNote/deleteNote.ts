import { deleteNote } from "../../api/noteApi";

export function deleteNoteById(id: string) {
  deleteNote(id);
  // const deleteItem = await deleteNote(id);
  // return deleteItem;
}