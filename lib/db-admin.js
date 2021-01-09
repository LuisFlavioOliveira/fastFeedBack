import { useSlider } from '@chakra-ui/react';
import { firestore } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firestore
      .collection('feedback')
      .orderBy('createdAt', 'desc')
      .where('siteId', '==', siteId)
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      });
    });
    return { feedback };
  } catch (error) {
    return { error };
  }
}
export async function getAllSites() {
  const snapshot = await firestore.collection('sites').get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    });
  });

  return { sites };
}

export async function getUserSites(userId) {
  const sitesRef = firestore
    .collection('sites')
    .where('authorId', '==', userId)
    .orderBy('createdAt', 'desc');
  const snapshot = await sitesRef.get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    });
  });

  return sites;
}

export async function getUserFeedback(uid) {
  const sitesRef = firestore
    .collection('feedback')
    .where('authorId', '==', uid);
  // .orderBy('createdAt', 'desc');
  const snapshot = await sitesRef.get();
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    });
  });

  return feedback;
}
