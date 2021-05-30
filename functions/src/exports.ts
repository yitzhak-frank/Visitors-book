import admin     = require("firebase-admin");
import functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
export const notesRef = db.collection('notes');
export const usersRef = db.collection('users_count').doc('users_count');
export const adminRef = db.collection('admins').doc('admins_list');

export const _admin = admin;
