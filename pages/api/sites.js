/* eslint-disable import/no-unresolved */
import { getAllSites } from '@/lib/db-admin';
import db from '@/lib/firebase-admin';

export default async (req, res) => {
  const sites = await getAllSites();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ sites }));
};
