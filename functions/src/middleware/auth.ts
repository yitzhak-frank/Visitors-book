import { adminRef, _admin } from '../exports';

export const authUser = async (req: any, res: any, callback: (uid: string) => any) => {
  try{
    const { uid } = await _admin.auth().verifyIdToken(req.header('x-auth-token') || 'string');
    if(!uid) res.status(401).send({message: 'Your are not a register user'});
    else callback(uid);
  } catch(err) {
    res.status(401).send({err, token: req.header('x-auth-token')});
  }
}

export const authAdmin = async (req: any, res: any, callback: () => any) => {
  try{
    const { email } = await _admin.auth().verifyIdToken(req.header('x-auth-token') || 'string');
    if(!email) return res.status(401).send({message: 'Admin required', isAdmin: false});

    const admins = await adminRef.get();
    const result = admins.data();

    if(result ? result[email || ''] : false) callback();
    else res.status(401).send({message: 'Admin required', isAdmin: false});
  } catch(err) {
    res.status(401).send(err);
  }
}
