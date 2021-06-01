import { adminRef, admin } from '../exports';

export const authUser = async (req: any, res: any, callback: (uid: string) => any) => {
  try{
    const { uid } = await admin.auth().verifyIdToken(req.header('x-auth-token') || 'string');
    if(!uid) res.status(401).send({message: 'Your are not a register user'});
    else callback(uid);
  } catch(err) {
    res.status(401).send(err);
  }
}

export const authAdmin = async (req: any, res: any, callback: () => any) => {
  try{
    const isAdmin = await checkIsAdmin(req.header('x-auth-token') || 'string')
    if(isAdmin) callback();
    else res.status(401).send({message: 'Admin required', isAdmin: false});
  } catch(err) {
    res.status(401).send(err);
  }
}

export const checkIsAdmin = async (token: string) => {
  try {
    const { email } = await admin.auth().verifyIdToken(token);
    if(!email) return false;

    const admins = await adminRef.get();
    const result = admins.data();

    if(result ? result[email || ''] : false) return true;
    else return false;
  } catch(err) {
    return false;
  }
}
