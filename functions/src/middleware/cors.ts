export const corsHandler = (req: any, res: any, callback: () => any) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    res.set('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else callback()

};
