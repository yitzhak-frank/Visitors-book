import { authAdmin } from "../middleware/auth";
import { notesRef, usersRef } from '../exports';
import functions = require("firebase-functions");

export const getNotes = functions.https.onRequest((req, res) => {
  authAdmin(req, res, async () => {
    const {skip, limit} = req.body;
    try{
      if(!skip) {
        const result = await notesRef.orderBy('date_created','desc').limit(limit).get();
        res.send(result.docs.map(doc => ({...doc.data(), id: doc.id})));
        return;
      }

      const first    = notesRef.orderBy('date_created','desc').limit(skip);
      const snapshot = await first.get();
      const last     = snapshot.docs[snapshot.docs.length - 1];
      const query    = notesRef.orderBy('date_created','desc').limit(limit);
      const result   = await query.startAfter(last).get();

      res.send(result.docs.map(doc => ({...doc.data(), id: doc.id})));
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const getNotesCount = functions.https.onRequest((req, res) => {
  authAdmin(req, res, async () => {
    try{
      const result = await notesRef.get();
      res.send(result && {count: result.size});
    } catch(err) {
      res.status(400).send(err);
    }
  });
});

export const getUsersCount = functions.https.onRequest((req, res) => {
  authAdmin(req, res, async () => {
    try{
      const users  = await usersRef.get();
      const result = users.data();
      res.send(result && {count: result.uids.length});
    } catch(err) {
      res.status(400).send(err);
    }
  });
});
