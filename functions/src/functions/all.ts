import functions = require("firebase-functions");
import { adminRef } from '../exports';

export const isEmailRegister = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;
  try{
    const admins = await adminRef.get();
    const result = admins.data();
    if(result ? result[email || ''] : false) res.send(true);
    else res.send(false);
  } catch(err) {
    res.status(400).send(err);
  }
});
