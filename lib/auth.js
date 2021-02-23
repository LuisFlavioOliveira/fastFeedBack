/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import firebase from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      // eslint-disable-next-line no-shadow
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      Cookies.set('fast-feedback-auth', true, {
        expires: 1,
      });
      setLoading(false);
      return user;
    }
    setUser(false);
    Cookies.remove('fast-feedback-auth');
    setLoading(false);
    return false;
  };

  const signinWithGithub = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
        router.push('/sites');
      });
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
        router.push('/sites');
      });
  };
  const signout = () => {
    router.push('/');
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
//   return decodedToken.claims.stripeRole;
// };

const formatUser = async (user) => {
  const { token, claims } = await user.getIdTokenResult();

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    stripeRole: claims.stripeRole || 'free',
  };
};
