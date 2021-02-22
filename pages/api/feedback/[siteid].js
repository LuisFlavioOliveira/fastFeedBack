/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
import { getAllFeedback, getSite } from '@/lib/db-admin';

export default async (req, res) => {
  const siteId = req.query.siteid;
  const { feedback, error } = await getAllFeedback(siteId);

  const { site } = await getSite(siteId);
  if (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ feedback, site }));
};
