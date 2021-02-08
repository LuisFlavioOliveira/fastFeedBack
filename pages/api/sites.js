/* eslint-disable import/no-unresolved */
import { getUserSites } from '@/lib/db-admin';
// import { auth } from '@/lib/fireabse-admin';
import { logger, formatObjectKeys } from '@/utils/logger';
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
    const headers = formatObjectKeys(req.headers);

    logger.error(
      {
        request: {
          headers,
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error }));
  }
};
