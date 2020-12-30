/* eslint-disable import/no-unresolved */
import db from '@/lib/firebase-admin';

export default async (req, res) => {
  const sitesRef = db.collection('sites');
  const snapshot = await sitesRef.get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ sites }));
};
