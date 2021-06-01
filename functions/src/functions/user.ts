import functions = require("firebase-functions");
import { notesRef, usersRef, admin } from '../exports';
import { authUser, checkIsAdmin } from "../middleware/auth";

export const getUserNotes = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { uid } = req.body;
    if(uid !== auth_uid) res.status(401).send({message: 'Only author can read his notes'});
    try{
      const result  = await notesRef.where('uid', '==', uid).orderBy('date_created','desc').get();
      res.send(result.docs.map(doc => ({...doc.data(), id: doc.id})));
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const getNoteById = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { id, uid } = req.body;
    if(uid !== auth_uid) res.status(401).send({message: 'Only author can read his notes'});
    try{
      const isAdmin = await checkIsAdmin(req.header('x-auth-token') || 'string');
      if(!isAdmin) {
        const note = await notesRef.doc(id).get();
        if(note.data()?.uid !== auth_uid) res.status(401).send({message: 'Only author can read his notes'});
      }
      const result = await notesRef.doc(id).get();
      res.send({...result.data(), id});
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const addNote = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { note } = req.body;
    note.date_created = admin.firestore.FieldValue.serverTimestamp();
    note.uid = auth_uid;
    try{
      const result = await notesRef.add(note);
      res.status(201).send(result);
    } catch(err) {
      res.status(400).send({err, test: {note: note}});
    }
  });
});

export const editNote = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { note, noteId, uid } = req.body;
    if(uid !== auth_uid) res.status(401).send({message: 'Only author can edit his notes'});
    try{
      const oldNote = await notesRef.doc(noteId).get();
      if(oldNote.data()?.uid !== auth_uid) res.status(401).send({message: 'Only author can edit his notes'});

      const result = await notesRef.doc(noteId).update(note);
      res.send(result);
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const deleteNote = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { id, uid } = req.body;
    if(uid !== auth_uid) res.status(401).send({message: 'Only author can delete his notes'});
    try{
      const isAdmin = await checkIsAdmin(req.header('x-auth-token') || 'string');
      if(!isAdmin) {
        const oldNote = await notesRef.doc(id).get();
        if(oldNote.data()?.uid !== auth_uid) res.status(401).send({message: 'Only author can delete his notes'});
      }
      const result = await notesRef.doc(id).delete();
      res.send(result);
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const updateUsersCount = functions.https.onRequest((req, res) => {
  return authUser(req, res, async (auth_uid) => {
    const { uid } = req.body;
    if(uid !== auth_uid) res.status(401).send({message: 'You can add only your self'});
    try{
      const users = await usersRef.get();
      const count = users.data();

      if(count && count.uids.includes(uid)) {
        res.status(400).send({error: 'user already exist'});
        return;
      }
      const result = await usersRef.update({
        uids: admin.firestore.FieldValue.arrayUnion(uid)
      });
      res.send(result);
    } catch(err) {
      res.status(400).send(err);
    }
  })
});
