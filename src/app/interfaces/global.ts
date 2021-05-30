import * as firebase from 'firebase/app';

export interface Note {
  id?:   string;
  uid:   string
  name:  string;
  title: string
  note:  string;
  date_created: firebase.default.firestore.FieldValue;
}

export interface NoteForm {
  name: string,
  title: string
  note: string
}
