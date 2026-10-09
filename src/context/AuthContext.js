import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

/** Turn Firebase error codes into sentences people can act on. */
export function authMessage(error) {
  const code = error?.code || '';
  if (code.includes('invalid-email')) return 'That email address doesn’t look right.';
  if (code.includes('email-already-in-use')) return 'There’s already an account with that email. Sign in instead.';
  if (code.includes('weak-password')) return 'Use a password with at least 6 characters.';
  if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential'))
    return 'The email or password is incorrect.';
  if (code.includes('too-many-requests')) return 'Too many attempts. Wait a minute, then try again.';
  if (code.includes('network')) return 'Can’t reach the server. Check your connection.';
  return 'Something went wrong. Try again.';
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // true until Firebase reports the saved session

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  async function signUp(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, 'users', email), { savedShows: [] }, { merge: true });
    } catch {
      /* the account exists; My List falls back to this browser if the database is unavailable */
    }
    return cred;
  }

  const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logOut = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, checking, signUp, logIn, logOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
