/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  const siteId = req.query.siteid;
  const feedback = await getAllFeedback(siteId);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ feedback }));
};
