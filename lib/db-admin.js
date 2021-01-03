import firebase from './firebase-admin';

export async function getAllFeedback(siteId) {
  const snapshot = await firebase
    .collection('feedback')
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

  return feedback;
}

export async function getAllSites() {
  const sitesRef = firebase.collection('sites');
  const snapshot = await sitesRef.get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites;
}
