import functions = require("firebase-functions");
import { adminRef } from '../exports';

export const isEmailRegister = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;
  try{
    const admins = await adminRef.get();
    const result = admins.data();
    res.send(result && result[email]);
  } catch(err) {
    res.status(400).send(err);
  }
});
