/* eslint-disable import/no-unresolved */
import { getUserFeedback } from '@/lib/db-admin';
import { auth } from '../../lib/firebase-admin';

export default async (req, res) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const feedback = await getUserFeedback(uid);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ feedback }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }
};
