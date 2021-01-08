/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext, createContext } from 'react';
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

  const handleUser = (rawUser) => {
    if (rawUser) {
      // eslint-disable-next-line no-shadow
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);
      return user;
    }
    setUser(false);
    return false;
  };

  const signinWithGithub = () =>
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.ya,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
});
