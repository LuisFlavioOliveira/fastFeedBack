/* eslint-disable import/no-unresolved */
import { getAllSites } from '@/lib/db-admin';

export default async (req, res) => {
  const { sites, error } = await getAllSites();

  if (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ sites }));
};
