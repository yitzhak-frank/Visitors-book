import { isEmailRegister } from './functions/all';
import {getNotes, getNotesCount, getUsersCount} from './functions/admin';
import {addNote, deleteNote, editNote, getNoteById, getUserNotes, updateUsersCount} from './functions/user';

export {
  addNote,
  getNotes,
  editNote,
  deleteNote,
  getNoteById,
  getUserNotes,
  getNotesCount,
  getUsersCount,
  isEmailRegister,
  updateUsersCount
};
