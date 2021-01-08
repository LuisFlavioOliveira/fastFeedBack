/* eslint-disable import/no-unresolved */
import { getUserSites } from '@/lib/db-admin';
// import { auth } from '@/lib/fireabse-admin';
import { auth } from '../../lib/firebase-admin';

export default async (req, res) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const sites = await getUserSites(uid);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ sites }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }
};
